'use client';

import { useState } from 'react';
import { useCVStore } from '@/store/cvStore';
import { ArrowLeft, ArrowRight, Plus, Trash2, ChevronDown, ChevronUp, Briefcase } from 'lucide-react';

export function WorkHistoryStep() {
  const { cv, addWorkHistory, updateWorkHistory, removeWorkHistory, nextStep, prevStep } = useCVStore();
  const [expandedId, setExpandedId] = useState<string | null>(
    cv.workHistory[0]?.id || null
  );

  const handleAddNew = () => {
    const newEntry = {
      company: 'Новая компания',
      position: 'Должность',
      startDate: '2022-01',
      endDate: null,
      isCurrent: true,
      description: 'Обязанности и ключевые зоны ответственности...',
      achievements: ['Достижение 1'],
    };
    addWorkHistory(newEntry);
  };

  const handleAddAchievement = (id: string, achievements: string[] = []) => {
    updateWorkHistory(id, {
      achievements: [...achievements, 'Новое измеримое достижение...'],
    });
  };

  const handleUpdateAchievement = (
    id: string,
    index: number,
    value: string,
    achievements: string[] = []
  ) => {
    const updated = [...achievements];
    updated[index] = value;
    updateWorkHistory(id, { achievements: updated });
  };

  const handleRemoveAchievement = (
    id: string,
    index: number,
    achievements: string[] = []
  ) => {
    const updated = achievements.filter((_, i) => i !== index);
    updateWorkHistory(id, { achievements: updated });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-app-text-secondary">
            Опыт работы ({cv.workHistory.length})
          </h3>
          <p className="text-[11px] text-app-text-muted">
            Перечислите места работы в хронологическом порядке
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddNew}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-app-accent text-white text-xs font-medium hover:opacity-90 shadow-subtle transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Добавить место работы</span>
        </button>
      </div>

      {cv.workHistory.length === 0 ? (
        <div className="p-8 rounded-md bg-app-surface border border-dashed border-app-border text-center">
          <Briefcase className="w-8 h-8 text-app-text-muted mx-auto mb-2 opacity-60" />
          <p className="text-sm text-app-text font-medium mb-1">Пока ничего не добавлено</p>
          <p className="text-xs text-app-text-muted mb-4">
            Добавьте ваши текущие или прошлые места работы, чтобы составить конкурентное резюме.
          </p>
          <button
            type="button"
            onClick={handleAddNew}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-app-accent text-white text-xs font-medium"
          >
            <Plus className="w-4 h-4" />
            <span>Добавить первое место работы</span>
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {cv.workHistory.map((work) => {
            const isExpanded = expandedId === work.id;

            return (
              <div
                key={work.id}
                className="rounded-md border border-app-border bg-app-surface overflow-hidden shadow-subtle transition-all"
              >
                {/* Header / Accordion trigger */}
                <div
                  className="flex items-center justify-between p-3 cursor-pointer hover:bg-app-elevated/40 border-l-4 border-l-app-accent transition-colors"
                  onClick={() => setExpandedId(isExpanded ? null : work.id)}
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <span className="font-semibold text-sm text-app-text truncate">
                      {work.company || 'Без названия'}
                    </span>
                    <span className="text-xs text-app-text-secondary truncate">
                      · {work.position || 'Должность не указана'}
                    </span>
                    <span className="text-[11px] text-app-text-muted hidden sm:inline">
                      ({work.startDate} — {work.isCurrent ? 'По наст. время' : work.endDate || 'н.в.'})
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeWorkHistory(work.id);
                      }}
                      className="p-1 text-app-text-muted hover:text-app-red transition-colors"
                      title="Удалить запись"
                      aria-label="Удалить место работы"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-app-text-muted" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-app-text-muted" />
                    )}
                  </div>
                </div>

                {/* Expanded Form Fields */}
                {isExpanded && (
                  <div className="p-3 sm:p-4 border-t border-app-border bg-app-surface/60 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold uppercase text-app-text-secondary mb-1">
                          Компания
                        </label>
                        <input
                          type="text"
                          value={work.company}
                          onChange={(e) => updateWorkHistory(work.id, { company: e.target.value })}
                          className="w-full px-3 py-2 rounded bg-app-input border border-app-border text-sm text-app-text focus:outline-none focus:border-app-accent"
                          placeholder="ПАО Сбербанк"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold uppercase text-app-text-secondary mb-1">
                          Должность
                        </label>
                        <input
                          type="text"
                          value={work.position}
                          onChange={(e) => updateWorkHistory(work.id, { position: e.target.value })}
                          className="w-full px-3 py-2 rounded bg-app-input border border-app-border text-sm text-app-text focus:outline-none focus:border-app-accent"
                          placeholder="Lead Frontend Engineer"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold uppercase text-app-text-secondary mb-1">
                          Дата начала
                        </label>
                        <input
                          type="month"
                          value={work.startDate}
                          onChange={(e) => updateWorkHistory(work.id, { startDate: e.target.value })}
                          className="w-full px-3 py-1.5 rounded bg-app-input border border-app-border text-xs text-app-text focus:outline-none focus:border-app-accent"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold uppercase text-app-text-secondary mb-1">
                          Дата окончания
                        </label>
                        <input
                          type="month"
                          disabled={work.isCurrent}
                          value={work.endDate || ''}
                          onChange={(e) => updateWorkHistory(work.id, { endDate: e.target.value })}
                          className="w-full px-3 py-1.5 rounded bg-app-input border border-app-border text-xs text-app-text focus:outline-none focus:border-app-accent disabled:opacity-40"
                        />
                      </div>

                      <div className="flex items-end pb-2">
                        <label className="inline-flex items-center gap-2 cursor-pointer text-xs text-app-text">
                          <input
                            type="checkbox"
                            checked={work.isCurrent}
                            onChange={(e) =>
                              updateWorkHistory(work.id, {
                                isCurrent: e.target.checked,
                                endDate: e.target.checked ? null : work.endDate,
                              })
                            }
                            className="w-4 h-4 rounded text-app-accent border-app-border focus:ring-app-accent"
                          />
                          <span>По настоящее время</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold uppercase text-app-text-secondary mb-1">
                        Описание обязанностей и задач
                      </label>
                      <textarea
                        rows={3}
                        value={work.description}
                        onChange={(e) => updateWorkHistory(work.id, { description: e.target.value })}
                        placeholder="Основные задачи, технологии, масштаб команды..."
                        className="w-full p-2.5 rounded bg-app-input border border-app-border text-sm text-app-text focus:outline-none focus:border-app-accent resize-y"
                      />
                    </div>

                    {/* Achievements List */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-[11px] font-semibold uppercase text-app-text-secondary">
                          Оцифрованные достижения (KPI / Результаты):
                        </label>
                        <button
                          type="button"
                          onClick={() => handleAddAchievement(work.id, work.achievements)}
                          className="text-[11px] text-app-accent hover:underline flex items-center gap-1"
                        >
                          + Добавить достижение
                        </button>
                      </div>

                      <div className="space-y-1.5">
                        {(work.achievements || []).map((ach, aIdx) => (
                          <div key={aIdx} className="flex items-center gap-2">
                            <span className="text-app-accent text-xs">★</span>
                            <input
                              type="text"
                              value={ach}
                              onChange={(e) =>
                                handleUpdateAchievement(work.id, aIdx, e.target.value, work.achievements)
                              }
                              placeholder="Например: Увеличил производительность на 30%"
                              className="flex-1 px-2.5 py-1.5 rounded bg-app-input border border-app-border text-xs text-app-text focus:outline-none focus:border-app-accent"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveAchievement(work.id, aIdx, work.achievements)}
                              className="text-app-text-muted hover:text-app-red transition-colors p-1"
                              title="Удалить"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

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
          <span>Далее: Образование</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
