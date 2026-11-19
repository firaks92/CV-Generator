'use client';

import { ThemeToggle } from './ThemeToggle';
import { useCVStore } from '@/store/cvStore';
import { FileText, RefreshCw, Trash2 } from 'lucide-react';

export function Header() {
  const { loadSampleData, clearData } = useCVStore();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-app-border bg-app-surface/90 backdrop-blur-md px-4 sm:px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-brand-primary border border-brand-light flex items-center justify-center text-white shadow-subtle">
            <FileText className="w-5 h-5 text-app-accent" />
          </div>
          <div>
            <h1 className="font-heading font-bold text-lg text-app-text tracking-tight leading-tight">
              CV Generator
            </h1>
            <p className="font-body text-xs text-app-text-muted hidden sm:block">
              Конструктор резюме нового поколения с ИИ
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={loadSampleData}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md border border-app-border bg-app-surface text-app-text hover:bg-app-elevated transition-colors"
            title="Заполнить форму демонстрационными данными"
          >
            <RefreshCw className="w-3.5 h-3.5 text-app-accent" />
            <span className="hidden sm:inline">Пример резюме</span>
          </button>

          <button
            type="button"
            onClick={clearData}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md border border-app-border/70 text-app-text-muted hover:text-app-red hover:border-app-red/40 hover:bg-app-red/10 transition-colors"
            title="Очистить все поля"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Очистить</span>
          </button>

          <div className="w-px h-5 bg-app-border my-auto" />

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
