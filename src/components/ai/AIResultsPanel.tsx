'use client';

import { useState } from 'react';
import { useCVStore } from '@/store/cvStore';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Edit3,
  Check,
  X,
  RefreshCw,
  Loader2,
} from 'lucide-react';

export function AIResultsPanel() {
  const {
    cv,
    updateAISummary,
    isGeneratingAI,
    generationError,
    setIsGeneratingAI,
    setAIContent,
    setGenerationError,
  } = useCVStore();

  const [isEditingSummary, setIsEditingSummary] = useState(false);
  const [editedText, setEditedText] = useState('');

  if (isGeneratingAI) {
    return (
      <div className="p-6 rounded-lg bg-app-surface border border-app-border text-center space-y-3 shadow-subtle animate-pulse">
        <div className="flex items-center justify-center gap-2 text-app-accent font-semibold text-sm">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>ИИ формирует профессиональный профиль кандидата...</span>
        </div>
        <p className="text-xs text-app-text-muted max-w-md mx-auto">
          Анализируем компетенции, структурируем достижения и выявляем конкурентные преимущества
        </p>
      </div>
    );
  }

  if (generationError) {
    return (
      <div className="p-4 rounded-lg bg-app-amber/10 border border-app-amber/30 text-app-text space-y-2">
        <div className="flex items-center gap-2 text-app-amber font-semibold text-sm">
          <AlertTriangle className="w-4 h-4" />
          <span>Обратите внимание</span>
        </div>
        <p className="text-xs text-app-text-secondary">{generationError}</p>
      </div>
    );
  }

  if (!cv.aiGenerated) {
    return null;
  }

  const { summary, analysis } = cv.aiGenerated;

  const handleStartEdit = () => {
    setEditedText(summary);
    setIsEditingSummary(true);
  };

  const handleSaveEdit = () => {
    updateAISummary(editedText);
    setIsEditingSummary(false);
  };

  const handleCancelEdit = () => {
    setIsEditingSummary(false);
  };

  const handleRegenerate = async () => {
    setIsGeneratingAI(true);
    setGenerationError(null);
    try {
      const res = await fetch('/api/cv/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cv),
      });
      if (!res.ok) throw new Error('Ошибка генерации');
      const data = await res.json();
      setAIContent(data);
    } catch (err: any) {
      setGenerationError(err?.message || 'Не удалось перегенерировать');
    } finally {
      setIsGeneratingAI(false);
    }
  };

  return (
    <div className="space-y-4 my-4 animate-fade-in">
      {/* 1. Summary Card */}
      <div className="p-4 rounded-lg bg-app-surface border border-app-border shadow-subtle space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-app-accent" />
            <h4 className="font-heading font-bold text-sm text-app-text">
              Профессиональное описание (Summary от ИИ)
            </h4>
          </div>

          {!isEditingSummary && (
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleStartEdit}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded border border-app-border text-app-text-secondary hover:text-app-text hover:bg-app-elevated transition-colors"
                title="Редактировать текст вручную"
              >
                <Edit3 className="w-3 h-3" />
                <span>Редактировать</span>
              </button>

              <button
                type="button"
                onClick={handleRegenerate}
                className="p-1 text-app-text-muted hover:text-app-accent transition-colors"
                title="Перегенерировать описание"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {isEditingSummary ? (
          <div className="space-y-2 pt-1">
            <textarea
              rows={4}
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className="w-full p-2.5 rounded bg-app-input border border-app-border text-sm text-app-text focus:outline-none focus:border-app-accent leading-relaxed"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={handleCancelEdit}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded text-xs border border-app-border text-app-text hover:bg-app-elevated"
              >
                <X className="w-3.5 h-3.5" />
                <span>Отмена</span>
              </button>
              <button
                type="button"
                onClick={handleSaveEdit}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded text-xs bg-app-accent text-white font-medium hover:opacity-90 shadow-sm"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Сохранить</span>
              </button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-app-text-secondary leading-relaxed font-body">
            {summary}
          </p>
        )}
      </div>

      {/* 2. Strengths Card (Сильные стороны) */}
      <div className="p-4 rounded-lg bg-app-surface border border-app-border shadow-subtle space-y-3 delay-100 animate-fade-in">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-app-green" />
            <h4 className="font-heading font-bold text-sm text-app-text">
              Сильные стороны кандидата ({analysis.strengths.length})
            </h4>
          </div>
          <span className="text-[11px] font-mono font-medium text-app-green bg-app-green/10 px-2 py-0.5 rounded border border-app-green/20">
            Отображаются в резюме
          </span>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {analysis.strengths.map((str, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded bg-app-input/60 border border-app-border/80 flex items-start gap-2.5"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-app-green mt-2 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-app-text">{str.title}</p>
                <p className="text-xs text-app-text-secondary leading-relaxed">
                  {str.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Growth Areas (Зоны роста / Слабые стороны) */}
      <div className="p-4 rounded-lg bg-app-surface border border-app-border shadow-subtle space-y-3 delay-200 animate-fade-in">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-app-amber" />
            <h4 className="font-heading font-bold text-sm text-app-text">
              Зоны потенциального роста ({analysis.weaknesses.length})
            </h4>
          </div>
          <span className="text-[11px] text-app-text-muted italic">
            Только для вас (не попадают в PDF)
          </span>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {analysis.weaknesses.map((w, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded bg-app-input/60 border border-app-amber/20 flex items-start gap-2.5"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-app-amber mt-2 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-app-text">{w.title}</p>
                <p className="text-xs text-app-text-secondary leading-relaxed">
                  {w.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Actionable Tips */}
      {analysis.improvementTips.length > 0 && (
        <div className="p-4 rounded-lg bg-app-surface border border-app-border shadow-subtle space-y-2 delay-300 animate-fade-in">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-app-accent" />
            <h4 className="font-heading font-bold text-sm text-app-text">
              Рекомендации карьерного консультанта
            </h4>
          </div>

          <ul className="space-y-1.5 text-xs text-app-text-secondary">
            {analysis.improvementTips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-app-accent font-bold">›</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
