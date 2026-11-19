'use client';

import { useState } from 'react';
import { useCVStore } from '@/store/cvStore';
import { X, Sparkles, Download, Copy, Check, Loader2, User, Briefcase, Building } from 'lucide-react';
import { exportTextDocumentToPDF } from '@/lib/pdf-export';
import { transliterate } from '@/lib/utils';

export function RecommendationModal() {
  const {
    cv,
    setRecommendation,
    activeModal,
    setActiveModal,
    isGeneratingLetter,
    setIsGeneratingLetter,
  } = useCVStore();

  const [recommenderName, setRecommenderName] = useState(
    cv.recommendation?.recommenderName || 'Петров Алексей Дмитриевич'
  );
  const [recommenderPosition, setRecommenderPosition] = useState(
    cv.recommendation?.recommenderPosition || 'Технический директор (CTO)'
  );
  const [recommenderCompany, setRecommenderCompany] = useState(
    cv.recommendation?.recommenderCompany || cv.workHistory[0]?.company || 'ООО «Технологии»'
  );
  const [letterContent, setLetterContent] = useState(cv.recommendation?.content || '');
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (activeModal !== 'recommendation') return null;

  const handleGenerate = async () => {
    setIsGeneratingLetter(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/cv/recommendation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cv,
          recommenderName,
          recommenderPosition,
          recommenderCompany,
        }),
      });

      if (!res.ok) throw new Error('Ошибка генерации рекомендательного письма');

      const data = await res.json();
      setLetterContent(data.content);
      setRecommendation({
        id: data.id,
        recommenderName,
        recommenderPosition,
        recommenderCompany,
        content: data.content,
        isEdited: false,
        generatedAt: data.generatedAt,
      });
    } catch (err: any) {
      setErrorMsg(err?.message || 'Не удалось составить рекомендацию');
    } finally {
      setIsGeneratingLetter(false);
    }
  };

  const handleCopy = () => {
    if (!letterContent) return;
    navigator.clipboard.writeText(letterContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPDF = () => {
    if (!letterContent) return;
    const author = cv.personalInfo.fullName || 'Кандидат';
    const cleanName = transliterate(author) || 'applicant';
    const fileName = `recommendation_${cleanName}.pdf`;
    exportTextDocumentToPDF(
      `Рекомендательное письмо на ${author}`,
      letterContent,
      recommenderName,
      fileName
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-app-surface border border-app-border rounded-lg shadow-elevated p-5 sm:p-6 space-y-4 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-app-border pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-app-accent" />
            <h3 className="font-heading font-bold text-base sm:text-lg text-app-text">
              Рекомендательное письмо
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setActiveModal(null)}
            className="p-1 rounded-md text-app-text-muted hover:text-app-text hover:bg-app-elevated transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Recommender Info Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <div>
            <label className="block text-[11px] font-semibold uppercase text-app-text-secondary mb-1">
              Имя рекомендателя
            </label>
            <div className="relative">
              <User className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-app-text-muted" />
              <input
                type="text"
                value={recommenderName}
                onChange={(e) => setRecommenderName(e.target.value)}
                placeholder="Петров А.Д."
                className="w-full pl-8 pr-2.5 py-1.5 rounded bg-app-input border border-app-border text-xs text-app-text focus:outline-none focus:border-app-accent"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase text-app-text-secondary mb-1">
              Должность
            </label>
            <div className="relative">
              <Briefcase className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-app-text-muted" />
              <input
                type="text"
                value={recommenderPosition}
                onChange={(e) => setRecommenderPosition(e.target.value)}
                placeholder="Технический директор"
                className="w-full pl-8 pr-2.5 py-1.5 rounded bg-app-input border border-app-border text-xs text-app-text focus:outline-none focus:border-app-accent"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase text-app-text-secondary mb-1">
              Компания
            </label>
            <div className="relative">
              <Building className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-app-text-muted" />
              <input
                type="text"
                value={recommenderCompany}
                onChange={(e) => setRecommenderCompany(e.target.value)}
                placeholder="ООО Яндекс"
                className="w-full pl-8 pr-2.5 py-1.5 rounded bg-app-input border border-app-border text-xs text-app-text focus:outline-none focus:border-app-accent"
              />
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <div>
          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGeneratingLetter}
            className="w-full py-2.5 px-4 rounded-md bg-app-accent text-white font-medium text-xs sm:text-sm hover:opacity-90 active:scale-[0.99] disabled:opacity-60 transition-all flex items-center justify-center gap-2 shadow-subtle"
          >
            {isGeneratingLetter ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>ИИ составляет официальную рекомендацию...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>
                  {letterContent ? 'Перегенерировать рекомендацию' : 'Составить рекомендацию на основе опыта'}
                </span>
              </>
            )}
          </button>
        </div>

        {errorMsg && (
          <p className="text-xs text-app-red font-medium">{errorMsg}</p>
        )}

        {/* Editable recommendation content */}
        <div className="flex-1 overflow-y-auto space-y-2">
          <label className="block text-xs font-semibold uppercase text-app-text-secondary">
            Текст рекомендации (доступен для редактирования):
          </label>
          <textarea
            rows={10}
            value={letterContent}
            onChange={(e) => setLetterContent(e.target.value)}
            placeholder="Здесь появится готовое рекомендательное письмо..."
            className="w-full p-3 rounded-md bg-app-input border border-app-border text-xs sm:text-sm text-app-text leading-relaxed font-body focus:outline-none focus:border-app-accent resize-y"
          />
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between pt-2 border-t border-app-border">
          <button
            type="button"
            onClick={handleCopy}
            disabled={!letterContent}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-app-border text-xs font-medium text-app-text hover:bg-app-elevated disabled:opacity-50 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-app-green" />
                <span>Скопировано!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Скопировать текст</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleDownloadPDF}
            disabled={!letterContent}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-app-surface border border-app-accent text-app-accent hover:bg-app-accent hover:text-white text-xs sm:text-sm font-medium transition-all shadow-subtle disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>Скачать в PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
}
