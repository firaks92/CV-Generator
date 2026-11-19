'use client';

import { useCVStore } from '@/store/cvStore';
import { PALETTES } from '@/constants/palettes';
import { PaletteId } from '@/types';
import { cn } from '@/lib/utils';
import { Palette, Sliders } from 'lucide-react';

export function PaletteSelector() {
  const { cv, setPalette, setActiveModal } = useCVStore();

  const handleSelectPalette = (id: PaletteId) => {
    setPalette(id);
    if (id === 'custom') {
      setActiveModal('custom-palette');
    }
  };

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-app-accent" />
          <span className="text-xs font-semibold uppercase tracking-wider text-app-text-secondary">
            Цветовая палитра:
          </span>
        </div>

        {cv.paletteId === 'custom' && (
          <button
            type="button"
            onClick={() => setActiveModal('custom-palette')}
            className="text-[11px] text-app-accent hover:underline flex items-center gap-1 font-medium"
          >
            <Sliders className="w-3 h-3" />
            <span>Настроить цвета</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-1.5 sm:gap-2">
        {Object.values(PALETTES).map((pal) => {
          const isActive = cv.paletteId === pal.id;
          const displayColors =
            pal.id === 'custom' && cv.customColors ? cv.customColors : pal.colors;

          return (
            <button
              key={pal.id}
              type="button"
              onClick={() => handleSelectPalette(pal.id)}
              className={cn(
                'p-2 rounded-md border text-center transition-all flex flex-col items-center justify-between gap-1 shadow-subtle group min-h-[58px]',
                isActive
                  ? 'bg-brand-primary/25 border-app-accent ring-2 ring-app-accent/30 shadow-md'
                  : 'bg-app-surface border-app-border hover:border-app-border-focus hover:bg-app-elevated'
              )}
            >
              {/* Dual Color Swatch Circles */}
              <div className="flex items-center -space-x-1 my-0.5">
                <span
                  className="w-4 h-4 rounded-full border border-white/30 shadow-sm"
                  style={{ backgroundColor: displayColors.primary }}
                />
                <span
                  className="w-4 h-4 rounded-full border border-white/30 shadow-sm"
                  style={{ backgroundColor: displayColors.accent }}
                />
              </div>

              {/* Name */}
              <span
                className={cn(
                  'text-[10px] sm:text-[11px] font-medium leading-tight text-center break-words w-full',
                  isActive
                    ? 'text-app-accent font-bold'
                    : 'text-app-text-secondary group-hover:text-app-text'
                )}
              >
                {pal.id === 'custom' ? 'Своя' : pal.name.replace(' ', '\n')}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
