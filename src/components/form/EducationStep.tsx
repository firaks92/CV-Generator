'use client';

import { useState } from 'react';
import { useCVStore } from '@/store/cvStore';
import { ArrowLeft, Plus, Trash2, GraduationCap, Sparkles, Loader2 } from 'lucide-react';
import { DegreeType } from '@/types';
import { DEGREE_LABELS } from '@/lib/utils';
import { generateAISummaryAndAnalysis } from '@/lib/gemini';

export function EducationStep() {
  const {
    cv,
    addEducation,
    updateEducation,
    removeEducation,
    prevStep,
    setAIContent,
    setIsGeneratingAI,
    isGeneratingAI,
    setGenerationError,
  } = useCVStore();

  const handleAddNew = () => {
    addEducation({
      institution: 'Учебное заведение',
      degree: 'bachelor',
      fieldOfStudy: 'Специальность / Факультет',
      startYear: 2015,
      endYear: 2019,
    });
  };

  const handleGenerateAI = async () => {
    setIsGeneratingAI(true);
    setGenerationError(null);

    try {
      const data = await generateAISummaryAndAnalysis(cv);
      setAIContent(data);
    } catch (err: any) {
      console.error(err);
      setGenerationError(err?.message || 'Не удалось сформировать описание. Попробуйте снова.');
    } finally {
      setIsGeneratingAI(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-app-text-secondary">
            Образование ({cv.education.length})
          </h3>
          <p className="text-[11px] text-app-text-muted">
            Высшее, специальное образование или сертификаты
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddNew}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-app-accent text-white text-xs font-medium hover:opacity-90 shadow-subtle transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Добавить образование</span>
        </button>
      </div>

      {cv.education.length === 0 ? (
        <div className="p-6 rounded-md bg-app-surface border border-dashed border-app-border text-center">
          <GraduationCap className="w-7 h-7 text-app-text-muted mx-auto mb-2 opacity-60" />
          <p className="text-xs text-app-text-muted mb-3">Записи об образовании пока отсутствуют.</p>
          <button
            type="button"
            onClick={handleAddNew}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-app-border text-xs text-app-text hover:bg-app-elevated"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Добавить ВУЗ / Колледж</span>
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {cv.education.map((edu) => (
            <div
              key={edu.id}
              className="p-3 sm:p-4 rounded-md border border-app-border bg-app-surface shadow-subtle space-y-3 relative group"
            >
              <button
                type="button"
                onClick={() => removeEducation(edu.id)}
                className="absolute right-3 top-3 text-app-text-muted hover:text-app-red transition-colors p-1"
                title="Удалить"
                aria-label="Удалить образование"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-app-text-secondary mb-1">
                  Учебное заведение
                </label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                  placeholder="МГУ им. М.В. Ломоносова"
                  className="w-full px-3 py-2 rounded bg-app-input border border-app-border text-sm text-app-text focus:outline-none focus:border-app-accent"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold uppercase text-app-text-secondary mb-1">
                    Степень / Квалификация
                  </label>
                  <select
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, { degree: e.target.value as DegreeType })}
                    className="w-full px-2.5 py-2 rounded bg-app-input border border-app-border text-xs text-app-text focus:outline-none focus:border-app-accent"
                  >
                    {Object.entries(DEGREE_LABELS).map(([k, label]) => (
                      <option key={k} value={k}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase text-app-text-secondary mb-1">
                    Специальность
                  </label>
                  <input
                    type="text"
                    value={edu.fieldOfStudy}
                    onChange={(e) => updateEducation(edu.id, { fieldOfStudy: e.target.value })}
                    placeholder="Информатика и вычислительная техника"
                    className="w-full px-3 py-2 rounded bg-app-input border border-app-border text-xs text-app-text focus:outline-none focus:border-app-accent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold uppercase text-app-text-secondary mb-1">
                    Год начала
                  </label>
                  <input
                    type="number"
                    min={1950}
                    max={2030}
                    value={edu.startYear || ''}
                    onChange={(e) =>
                      updateEducation(edu.id, { startYear: parseInt(e.target.value, 10) || 2015 })
                    }
                    className="w-full px-3 py-1.5 rounded bg-app-input border border-app-border text-xs text-app-text focus:outline-none focus:border-app-accent"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase text-app-text-secondary mb-1">
                    Год окончания
                  </label>
                  <input
                    type="number"
                    min={1950}
                    max={2035}
                    value={edu.endYear || ''}
                    onChange={(e) =>
                      updateEducation(edu.id, { endYear: parseInt(e.target.value, 10) || 2019 })
                    }
                    className="w-full px-3 py-1.5 rounded bg-app-input border border-app-border text-xs text-app-text focus:outline-none focus:border-app-accent"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Main AI Generation CTA Button */}
      <div className="pt-4 border-t border-app-border">
        <button
          type="button"
          onClick={handleGenerateAI}
          disabled={isGeneratingAI}
          className="w-full py-3.5 px-4 rounded-md bg-gradient-to-r from-brand-primary via-app-accent to-brand-primary text-white font-semibold text-sm shadow-elevated hover:opacity-95 active:scale-[0.99] disabled:opacity-60 transition-all flex items-center justify-center gap-2"
        >
          {isGeneratingAI ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>ИИ анализирует резюме и формулирует описание...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span>Собрать резюме и запустить ИИ-анализ</span>
            </>
          )}
        </button>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={prevStep}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-md border border-app-border text-app-text hover:bg-app-elevated font-medium text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Назад</span>
        </button>
      </div>
    </div>
  );
}
