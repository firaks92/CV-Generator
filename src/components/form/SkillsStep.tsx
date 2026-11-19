'use client';

import { useState } from 'react';
import { useCVStore } from '@/store/cvStore';
import { ArrowLeft, ArrowRight, Plus, X } from 'lucide-react';
import { SkillCategory } from '@/types';

const POPULAR_SKILLS = [
  'TypeScript', 'React', 'Next.js', 'Node.js', 'Python', 'SQL',
  'PostgreSQL', 'Docker', 'Git', 'REST API', 'GraphQL', 'Figma',
  'Tailwind CSS', 'Redux', 'CI/CD', 'Agile / Scrum', 'Управление командой'
];

export function SkillsStep() {
  const { cv, addSkill, removeSkill, nextStep, prevStep } = useCVStore();
  const [skillInput, setSkillInput] = useState('');
  const [category, setCategory] = useState<SkillCategory>('technical');
  const [level, setLevel] = useState<number>(4);

  const handleAddSkill = (nameToAdd?: string) => {
    const name = (nameToAdd || skillInput).trim();
    if (!name) return;

    // Check duplicate
    if (cv.skills.some((s) => s.name.toLowerCase() === name.toLowerCase())) {
      setSkillInput('');
      return;
    }

    addSkill({
      name,
      category,
      proficiencyLevel: level,
    });
    setSkillInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <div className="space-y-4">
      {/* Input row */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-app-text-secondary mb-1.5">
          Добавить ключевой навык / технологию
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Например: TypeScript, Docker, Оптимизация..."
            className="flex-1 px-3 py-2.5 rounded-md bg-app-input border border-app-border text-app-text placeholder:text-app-text-muted text-sm focus:outline-none focus:border-app-accent focus:ring-1 focus:ring-app-accent transition-colors font-mono"
          />

          <button
            type="button"
            onClick={() => handleAddSkill()}
            disabled={!skillInput.trim()}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-md bg-app-accent text-white font-medium text-sm hover:opacity-90 disabled:opacity-50 transition-all shadow-subtle"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Добавить</span>
          </button>
        </div>
      </div>

      {/* Categories & Level controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-md bg-app-surface border border-app-border">
        <div>
          <label className="block text-[11px] font-medium text-app-text-secondary mb-1">
            Категория навыка:
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as SkillCategory)}
            className="w-full px-2.5 py-1.5 rounded bg-app-input border border-app-border text-app-text text-xs focus:outline-none focus:border-app-accent"
          >
            <option value="technical">Технический (Hard Skill)</option>
            <option value="soft">Личностный (Soft Skill)</option>
            <option value="tool">Инструмент / ПО (Tool)</option>
            <option value="language">Иностранный язык</option>
            <option value="other">Другое</option>
          </select>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-[11px] font-medium text-app-text-secondary">
              Уровень владения (для шкалы):
            </label>
            <span className="text-xs font-mono font-semibold text-app-accent">
              {level} / 5
            </span>
          </div>
          <input
            type="range"
            min={1}
            max={5}
            step={1}
            value={level}
            onChange={(e) => setLevel(parseInt(e.target.value, 10))}
            className="w-full accent-app-accent h-1.5 bg-app-input rounded-lg cursor-pointer"
          />
        </div>
      </div>

      {/* Selected tags */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-app-text-secondary">
            Выбранные навыки ({cv.skills.length}):
          </span>
          {cv.skills.length === 0 && (
            <span className="text-xs text-app-amber">Добавьте хотя бы 1 навык</span>
          )}
        </div>

        {cv.skills.length > 0 ? (
          <div className="flex flex-wrap gap-2 p-3 rounded-md bg-app-input border border-app-border min-h-[70px]">
            {cv.skills.map((skill) => (
              <span
                key={skill.id}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-brand-primary/25 border border-app-accent/30 text-app-text text-xs font-mono shadow-sm group"
              >
                <span>{skill.name}</span>
                <span className="text-[10px] text-app-text-muted">({skill.proficiencyLevel || 4}/5)</span>
                <button
                  type="button"
                  onClick={() => removeSkill(skill.id)}
                  className="text-app-text-muted hover:text-app-red transition-colors ml-0.5"
                  title="Удалить навык"
                  aria-label={`Удалить ${skill.name}`}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
        ) : (
          <div className="p-4 rounded-md bg-app-input border border-dashed border-app-border text-center text-xs text-app-text-muted">
            Пока не добавлено ни одного навыка. Введите текст выше или выберите из быстрых подсказок ниже.
          </div>
        )}
      </div>

      {/* Quick suggestions */}
      <div>
        <span className="block text-[11px] font-medium text-app-text-muted mb-1.5">
          Быстрые варианты (кликните, чтобы добавить):
        </span>
        <div className="flex flex-wrap gap-1.5">
          {POPULAR_SKILLS.filter(
            (p) => !cv.skills.some((s) => s.name.toLowerCase() === p.toLowerCase())
          ).map((suggested) => (
            <button
              key={suggested}
              type="button"
              onClick={() => handleAddSkill(suggested)}
              className="text-xs px-2.5 py-1 rounded border border-app-border bg-app-surface hover:bg-app-elevated text-app-text-secondary hover:text-app-text transition-colors"
            >
              + {suggested}
            </button>
          ))}
        </div>
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
          type="button"
          onClick={nextStep}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-app-accent text-white font-medium text-sm hover:opacity-90 active:scale-[0.98] transition-all shadow-subtle"
        >
          <span>Далее: Места работы</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
