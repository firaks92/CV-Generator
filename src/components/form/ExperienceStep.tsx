'use client';

import { useCVStore } from '@/store/cvStore';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

export function ExperienceStep() {
  const { cv, updateExperience, nextStep, prevStep } = useCVStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-app-text-secondary">
            Общее описание профессионального опыта
          </label>
          <span className="text-[11px] text-app-text-muted">
            {cv.experience.text.length} / 2000 симв.
          </span>
        </div>

        <textarea
          rows={6}
          maxLength={2000}
          value={cv.experience.text}
          onChange={(e) => updateExperience({ text: e.target.value })}
          placeholder="Опишите в свободной форме ваш ключевой опыт: сколько лет в отрасли, основные компетенции, стек, масштаб проектов, руководство людьми или архитектурные решения. ИИ использует этот текст для формулирования профессионального Summary и выявления сильных сторон..."
          className="w-full p-3 rounded-md bg-app-input border border-app-border text-app-text placeholder:text-app-text-muted text-sm leading-relaxed focus:outline-none focus:border-app-accent focus:ring-1 focus:ring-app-accent transition-colors resize-y min-h-[140px]"
        />
      </div>

      <div className="p-3 rounded-md bg-app-surface border border-app-border flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-app-accent flex-shrink-0 mt-0.5" />
        <p className="text-xs text-app-text-secondary leading-normal">
          <strong className="text-app-text font-semibold">Подсказка ИИ:</strong> Чем точнее вы упомянете ключевые сферы и технологии, тем лучше ИИ сформулирует лаконичное резюме и подсветит ваши преимущества перед работодателем.
        </p>
      </div>

      {/* Navigation */}
      <div className="pt-4 flex items-center justify-between">
        <button
          type="button"
          onClick={prevStep}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-md border border-app-border text-app-text hover:bg-app-elevated font-medium text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Назад</span>
        </button>

        <button
          type="submit"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-app-accent text-white font-medium text-sm hover:opacity-90 active:scale-[0.98] transition-all shadow-subtle"
        >
          <span>Далее: Навыки</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}
