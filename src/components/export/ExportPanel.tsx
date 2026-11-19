'use client';

import { useState } from 'react';
import { useCVStore } from '@/store/cvStore';
import { exportElementToPDF, exportTextDocumentToPDF } from '@/lib/pdf-export';
import { Download, Monitor, Smartphone, Mail, FileCheck, Loader2 } from 'lucide-react';
import { transliterate } from '@/lib/utils';

export function ExportPanel() {
  const { cv, setActiveModal, previewFormat, setPreviewFormat } = useCVStore();
  const [downloadingFormat, setDownloadingFormat] = useState<'desktop' | 'mobile' | null>(null);

  const handleDownloadCV = async (format: 'desktop' | 'mobile') => {
    setDownloadingFormat(format);
    const prevFormat = previewFormat;

    try {
      if (prevFormat !== format) {
        setPreviewFormat(format);
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      await exportElementToPDF({
        elementId: 'cv-render-canvas',
        fullName: cv.personalInfo.fullName,
        format,
        documentType: 'cv',
      });
    } catch (err) {
      console.error('PDF export error:', err);
    } finally {
      if (prevFormat !== format) {
        setPreviewFormat(prevFormat);
      }
      setDownloadingFormat(null);
    }
  };

  const handleDownloadCoverLetter = async () => {
    if (!cv.coverLetter?.content) return;
    const author = cv.personalInfo.fullName || 'Кандидат';
    const cleanName = transliterate(author) || 'applicant';
    await exportTextDocumentToPDF(
      `Мотивационное письмо — ${cv.coverLetter.targetPosition || author}`,
      cv.coverLetter.content,
      author,
      `cover_letter_${cleanName}.pdf`
    );
  };

  const handleDownloadRecommendation = async () => {
    if (!cv.recommendation?.content) return;
    const author = cv.personalInfo.fullName || 'Кандидат';
    const cleanName = transliterate(author) || 'applicant';
    await exportTextDocumentToPDF(
      `Рекомендательное письмо на ${author}`,
      cv.recommendation.content,
      cv.recommendation.recommenderName || 'Рекомендатель',
      `recommendation_${cleanName}.pdf`
    );
  };

  return (
    <div className="p-4 rounded-lg bg-app-surface border border-app-border shadow-subtle space-y-4">
      <div>
        <h3 className="font-heading font-bold text-sm text-app-text">
          Экспорт и дополнительные документы
        </h3>
        <p className="text-[11px] text-app-text-muted">
          Скачайте готовое резюме в оптимизированном формате для ПК или смартфонов
        </p>
      </div>

      {/* Main CV Download Buttons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <button
          type="button"
          onClick={() => handleDownloadCV('desktop')}
          disabled={downloadingFormat !== null}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-md bg-app-accent text-white font-semibold text-xs sm:text-sm hover:opacity-90 active:scale-[0.98] transition-all shadow-subtle disabled:opacity-50"
        >
          {downloadingFormat === 'desktop' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Формирую PDF A4...</span>
            </>
          ) : (
            <>
              <Monitor className="w-4 h-4" />
              <span>Скачать Резюме (ПК / A4)</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => handleDownloadCV('mobile')}
          disabled={downloadingFormat !== null}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-md border border-app-accent text-app-accent bg-app-surface hover:bg-app-accent hover:text-white font-semibold text-xs sm:text-sm active:scale-[0.98] transition-all shadow-subtle disabled:opacity-50"
        >
          {downloadingFormat === 'mobile' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Формирую Mobile PDF...</span>
            </>
          ) : (
            <>
              <Smartphone className="w-4 h-4" />
              <span>Скачать Резюме (Мобильная)</span>
            </>
          )}
        </button>
      </div>

      {/* Additional Documents Buttons */}
      <div className="pt-2 border-t border-app-border">
        <span className="block text-[11px] font-semibold uppercase tracking-wider text-app-text-secondary mb-2">
          Сопроводительные документы:
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setActiveModal('cover-letter')}
            className="flex items-center justify-between p-2.5 rounded-md border border-app-border bg-app-input hover:bg-app-elevated text-left text-xs transition-colors group"
          >
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-app-accent" />
              <div>
                <p className="font-semibold text-app-text">Мотивационное письмо</p>
                <p className="text-[10px] text-app-text-muted">
                  {cv.coverLetter ? 'Сформировано (нажмите для ред.)' : 'Сгенерировать с ИИ'}
                </p>
              </div>
            </div>
            {cv.coverLetter && (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownloadCoverLetter();
                }}
                className="p-1 rounded text-app-accent hover:bg-app-accent/10"
                title="Скачать PDF"
              >
                <Download className="w-3.5 h-3.5" />
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveModal('recommendation')}
            className="flex items-center justify-between p-2.5 rounded-md border border-app-border bg-app-input hover:bg-app-elevated text-left text-xs transition-colors group"
          >
            <div className="flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-app-accent" />
              <div>
                <p className="font-semibold text-app-text">Рекомендательное письмо</p>
                <p className="text-[10px] text-app-text-muted">
                  {cv.recommendation ? 'Сформировано (нажмите для ред.)' : 'Сгенерировать с ИИ'}
                </p>
              </div>
            </div>
            {cv.recommendation && (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownloadRecommendation();
                }}
                className="p-1 rounded text-app-accent hover:bg-app-accent/10"
                title="Скачать PDF"
              >
                <Download className="w-3.5 h-3.5" />
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
