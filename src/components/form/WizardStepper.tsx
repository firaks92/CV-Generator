'use client';

import { useCVStore } from '@/store/cvStore';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export const STEPS = [
  { id: 0, label: 'Данные', fullLabel: 'Личные данные' },
  { id: 1, label: 'Опыт', fullLabel: 'Общий опыт' },
  { id: 2, label: 'Навыки', fullLabel: 'Навыки и стек' },
  { id: 3, label: 'Работа', fullLabel: 'Места работы' },
  { id: 4, label: 'Учёба', fullLabel: 'Образование' },
];

export function WizardStepper() {
  const { currentStep, setStep } = useCVStore();

  return (
    <div className="w-full bg-app-surface border border-app-border rounded-lg p-3.5 sm:p-4 mb-4 shadow-subtle">
      {/* Top Step Counter & Title */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-app-border/60">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-brand-primary/40 text-app-accent border border-app-accent/30">
            Шаг {currentStep + 1} из 5
          </span>
          <h2 className="text-sm font-bold font-heading text-app-text">
            {STEPS[currentStep].fullLabel}
          </h2>
        </div>
        <span className="text-[11px] text-app-text-muted hidden sm:inline">
          Кликните на шаг для быстрого перехода
        </span>
      </div>

      {/* Stepper Circles & Lines */}
      <div className="flex items-center justify-between relative px-2 sm:px-4">
        {STEPS.map((step, idx) => {
          const isDone = currentStep > step.id;
          const isCurrent = currentStep === step.id;
          const isPending = currentStep < step.id;

          return (
            <div key={step.id} className="flex-1 flex flex-col items-center relative">
              {/* Connector line between steps (positioned behind circles) */}
              {idx > 0 && (
                <div
                  className={cn(
                    'absolute top-4 -left-1/2 w-full h-[2px] -z-0 transition-all duration-300',
                    isDone || isCurrent ? 'bg-app-accent' : 'bg-app-border'
                  )}
                  style={{ transform: 'translateY(-50%)' }}
                />
              )}

              {/* Step Circle Button */}
              <button
                type="button"
                onClick={() => setStep(step.id)}
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all relative z-10 focus:outline-none focus:ring-2 focus:ring-app-accent shadow-sm',
                  isDone && 'bg-app-accent text-white hover:opacity-90',
                  isCurrent &&
                    'bg-brand-primary text-white border-2 border-app-accent ring-4 ring-app-accent/20 scale-110',
                  isPending &&
                    'bg-app-elevated border-2 border-app-border text-app-text-secondary hover:border-app-accent hover:text-app-text'
                )}
                aria-current={isCurrent ? 'step' : undefined}
                aria-label={`Шаг ${step.id + 1}: ${step.fullLabel}`}
              >
                {isDone ? <Check className="w-4 h-4 stroke-[2.5]" /> : step.id + 1}
              </button>

              {/* Step Label (always visible!) */}
              <span
                className={cn(
                  'text-[11px] sm:text-xs font-medium mt-2 transition-colors text-center select-none',
                  isCurrent
                    ? 'text-app-accent font-bold'
                    : isDone
                    ? 'text-app-text font-medium'
                    : 'text-app-text-secondary'
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
