'use client';

import { useState } from 'react';
import { useCVStore } from '@/store/cvStore';
import { X, Sparkles, Download, Copy, Check, Loader2, Building, Briefcase } from 'lucide-react';
import { exportTextDocumentToPDF } from '@/lib/pdf-export';
import { transliterate } from '@/lib/utils';
import { generateAICoverLetter } from '@/lib/gemini';

export function CoverLetterModal() {
  const { cv, setCoverLetter, activeModal, setActiveModal, isGeneratingLetter, setIsGeneratingLetter } =
    useCVStore();

  const [company, setCompany] = useState(cv.coverLetter?.targetCompany || '');
  const [position, setPosition] = useState(
    cv.coverLetter?.targetPosition || cv.personalInfo.jobTitle || ''
  );
  const [letterContent, setLetterContent] = useState(cv.coverLetter?.content || '');
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (activeModal !== 'cover-letter') return null;

  const handleGenerate = async () => {
    setIsGeneratingLetter(true);
    setErrorMsg(null);

    try {
      const content = await generateAICoverLetter(cv, company, position);
      setLetterContent(content);
      setCoverLetter({
        id: `cl-${Date.now()}`,
        targetCompany: company,
        targetPosition: position,
        content,
        isEdited: false,
        generatedAt: new Date().toISOString(),
      });
    } catch (err: any) {
      setErrorMsg(err?.message || 'Не удалось сгенерировать письмо');
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

  const handleDownloadPDF = async () => {
    if (!letterContent) return;
    const author = cv.personalInfo.fullName || 'Кандидат';
    const cleanName = transliterate(author) || 'applicant';
    const fileName = `cover_letter_${cleanName}.pdf`;
    await exportTextDocumentToPDF(
      `Мотивационное письмо — ${author}`,
      letterContent,
      author,
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
              Мотивационное письмо (Cover Letter)
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

        {/* Target Job Info Form */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold uppercase text-app-text-secondary mb-1">
              Целевая компания
            </label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-app-text-muted" />
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Например: Яндекс, VK, Ozon..."
                className="w-full pl-9 pr-3 py-2 rounded bg-app-input border border-app-border text-xs sm:text-sm text-app-text focus:outline-none focus:border-app-accent"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-app-text-secondary mb-1">
              Целевая должность
            </label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-app-text-muted" />
              <input
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                placeholder="Senior Frontend Developer"
                className="w-full pl-9 pr-3 py-2 rounded bg-app-input border border-app-border text-xs sm:text-sm text-app-text focus:outline-none focus:border-app-accent"
              />
            </div>
          </div>
        </div>

        {/* Generate Trigger */}
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
                <span>ИИ формирует мотивационное письмо...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>
                  {letterContent ? 'Перегенерировать письмо' : 'Сгенерировать письмо на основе CV'}
                </span>
              </>
            )}
          </button>
        </div>

        {errorMsg && (
          <p className="text-xs text-app-red font-medium">{errorMsg}</p>
        )}

        {/* Generated Text & Editing */}
        <div className="flex-1 overflow-y-auto space-y-2">
          <label className="block text-xs font-semibold uppercase text-app-text-secondary">
            Текст письма (доступен для редактирования):
          </label>
          <textarea
            rows={10}
            value={letterContent}
            onChange={(e) => setLetterContent(e.target.value)}
            placeholder="Здесь появится готовое мотивационное письмо..."
            className="w-full p-3 rounded-md bg-app-input border border-app-border text-xs sm:text-sm text-app-text leading-relaxed font-body focus:outline-none focus:border-app-accent resize-y"
          />
        </div>

        {/* Footer Actions */}
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
            <span>Скачать письмо в PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
}
