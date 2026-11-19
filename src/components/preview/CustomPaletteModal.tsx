'use client';

import { useState } from 'react';
import { useCVStore } from '@/store/cvStore';
import { X, Check, Palette } from 'lucide-react';
import { PaletteColors } from '@/types';
import { PALETTES } from '@/constants/palettes';

export function CustomPaletteModal() {
  const { cv, setCustomColors, activeModal, setActiveModal } = useCVStore();

  const initialColors = cv.customColors || PALETTES.custom.colors;

  const [primary, setPrimary] = useState(initialColors.primary);
  const [accent, setAccent] = useState(initialColors.accent);
  const [background, setBackground] = useState(initialColors.background);
  const [text, setText] = useState(initialColors.text);

  if (activeModal !== 'custom-palette') return null;

  const handleApply = () => {
    const updated: PaletteColors = {
      primary,
      accent,
      background,
      text,
      textSecondary: '#4B5563',
      border: '#E5E7EB',
      surface: '#FFFFFF',
    };
    setCustomColors(updated);
    setActiveModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-app-surface border border-app-border rounded-lg shadow-elevated p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-app-border pb-3">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-app-accent" />
            <h3 className="font-heading font-bold text-base text-app-text">
              Настройка собственной палитры
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

        <div className="space-y-3">
          {/* Primary */}
          <div>
            <label className="block text-xs font-semibold uppercase text-app-text-secondary mb-1">
              Основной цвет (Заголовки / Акценты)
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={primary}
                onChange={(e) => setPrimary(e.target.value)}
                className="w-10 h-10 rounded border border-app-border cursor-pointer bg-transparent"
              />
              <input
                type="text"
                value={primary}
                onChange={(e) => setPrimary(e.target.value)}
                className="flex-1 px-3 py-2 rounded bg-app-input border border-app-border text-xs font-mono uppercase text-app-text focus:outline-none focus:border-app-accent"
              />
            </div>
          </div>

          {/* Accent */}
          <div>
            <label className="block text-xs font-semibold uppercase text-app-text-secondary mb-1">
              Дополнительный цвет (Иконки / Теги)
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={accent}
                onChange={(e) => setAccent(e.target.value)}
                className="w-10 h-10 rounded border border-app-border cursor-pointer bg-transparent"
              />
              <input
                type="text"
                value={accent}
                onChange={(e) => setAccent(e.target.value)}
                className="flex-1 px-3 py-2 rounded bg-app-input border border-app-border text-xs font-mono uppercase text-app-text focus:outline-none focus:border-app-accent"
              />
            </div>
          </div>

          {/* Background */}
          <div>
            <label className="block text-xs font-semibold uppercase text-app-text-secondary mb-1">
              Цвет фона страницы резюме
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={background}
                onChange={(e) => setBackground(e.target.value)}
                className="w-10 h-10 rounded border border-app-border cursor-pointer bg-transparent"
              />
              <input
                type="text"
                value={background}
                onChange={(e) => setBackground(e.target.value)}
                className="flex-1 px-3 py-2 rounded bg-app-input border border-app-border text-xs font-mono uppercase text-app-text focus:outline-none focus:border-app-accent"
              />
            </div>
          </div>

          {/* Text */}
          <div>
            <label className="block text-xs font-semibold uppercase text-app-text-secondary mb-1">
              Цвет основного текста
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-10 h-10 rounded border border-app-border cursor-pointer bg-transparent"
              />
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="flex-1 px-3 py-2 rounded bg-app-input border border-app-border text-xs font-mono uppercase text-app-text focus:outline-none focus:border-app-accent"
              />
            </div>
          </div>
        </div>

        {/* Live Swatch Preview */}
        <div
          className="p-3 rounded border text-xs flex items-center justify-between"
          style={{ backgroundColor: background, color: text, borderColor: primary }}
        >
          <span className="font-semibold" style={{ color: primary }}>
            Образец заголовка
          </span>
          <span
            className="px-2 py-0.5 rounded text-[10px] font-mono text-white"
            style={{ backgroundColor: accent }}
          >
            Тег
          </span>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 pt-2 border-t border-app-border">
          <button
            type="button"
            onClick={() => setActiveModal(null)}
            className="px-4 py-2 rounded border border-app-border text-xs font-medium text-app-text hover:bg-app-elevated"
          >
            Отмена
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-app-accent text-white text-xs font-medium hover:opacity-90 shadow-subtle"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Применить палитру</span>
          </button>
        </div>
      </div>
    </div>
  );
}
