'use client';

import { useState } from 'react';
import { useCVStore } from '@/store/cvStore';
import { TemplateSelector } from './TemplateSelector';
import { PaletteSelector } from './PaletteSelector';
import { PALETTES } from '@/constants/palettes';
import { ClassicTemplate } from './templates/ClassicTemplate';
import { ModernTemplate } from './templates/ModernTemplate';
import { CreativeTemplate } from './templates/CreativeTemplate';
import { CompactTemplate } from './templates/CompactTemplate';
import { ExecutiveTemplate } from './templates/ExecutiveTemplate';
import { Monitor, Smartphone, Maximize2, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function CVPreview() {
  const { cv, previewFormat, setPreviewFormat } = useCVStore();
  const [isFullscreen, setIsFullscreen] = useState(false);

  const colors =
    cv.paletteId === 'custom' && cv.customColors
      ? cv.customColors
      : PALETTES[cv.paletteId]?.colors || PALETTES['ocean-blue'].colors;

  const renderTemplateComponent = (isFull: boolean = false) => {
    const props = {
      cv,
      colors,
      format: isFull ? 'desktop' as const : previewFormat,
    };

    switch (cv.templateId) {
      case 'modern':
        return <ModernTemplate {...props} />;
      case 'creative':
        return <CreativeTemplate {...props} />;
      case 'compact':
        return <CompactTemplate {...props} />;
      case 'executive':
        return <ExecutiveTemplate {...props} />;
      case 'classic':
      default:
        return <ClassicTemplate {...props} />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Template & Palette Selectors */}
      <div className="p-4 rounded-lg bg-app-surface border border-app-border space-y-4 shadow-subtle">
        <TemplateSelector />
        <div className="w-full h-px bg-app-border" />
        <PaletteSelector />
      </div>

      {/* Preview Container Card */}
      <div className="p-3 sm:p-4 rounded-lg bg-app-surface border border-app-border space-y-3 shadow-subtle">
        {/* Preview Toolbar */}
        <div className="flex items-center justify-between pb-2 border-b border-app-border">
          <span className="text-xs font-semibold uppercase tracking-wider text-app-text-secondary">
            Предпросмотр в реальном времени:
          </span>

          <div className="flex items-center gap-1.5">
            {/* Format toggle: Desktop / Mobile */}
            <div className="flex items-center bg-app-input rounded-md p-0.5 border border-app-border">
              <button
                type="button"
                onClick={() => setPreviewFormat('desktop')}
                className={cn(
                  'px-2 py-1 rounded text-xs font-medium flex items-center gap-1 transition-colors',
                  previewFormat === 'desktop'
                    ? 'bg-app-accent text-white shadow-sm'
                    : 'text-app-text-muted hover:text-app-text'
                )}
                title="ПК версия (A4)"
              >
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">ПК (A4)</span>
              </button>

              <button
                type="button"
                onClick={() => setPreviewFormat('mobile')}
                className={cn(
                  'px-2 py-1 rounded text-xs font-medium flex items-center gap-1 transition-colors',
                  previewFormat === 'mobile'
                    ? 'bg-app-accent text-white shadow-sm'
                    : 'text-app-text-muted hover:text-app-text'
                )}
                title="Мобильная версия"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Мобильная</span>
              </button>
            </div>

            {/* Fullscreen Modal trigger */}
            <button
              type="button"
              onClick={() => setIsFullscreen(true)}
              className="p-1.5 rounded-md border border-app-border bg-app-input text-app-text-muted hover:text-app-text hover:bg-app-elevated transition-colors"
              title="Открыть на весь экран"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Live Canvas Box (Document is strictly rendered on white background with crisp typography) */}
        <div className="w-full overflow-hidden flex justify-center bg-zinc-900/60 rounded border border-app-border p-2 sm:p-4">
          <div
            id="cv-render-canvas"
            className={cn(
              'bg-white text-zinc-900 transition-all shadow-elevated rounded-sm overflow-hidden select-text',
              previewFormat === 'mobile'
                ? 'w-full max-w-[380px] text-xs'
                : 'w-full max-w-[800px] text-sm'
            )}
          >
            {renderTemplateComponent(false)}
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black/80 backdrop-blur-md p-4 sm:p-6 overflow-y-auto animate-fade-in">
          <div className="w-full max-w-4xl mx-auto flex justify-between items-center pb-3 text-white">
            <span className="font-heading font-bold text-lg">
              Полноэкранный просмотр резюме (1:1)
            </span>
            <button
              type="button"
              onClick={() => setIsFullscreen(false)}
              className="p-2 rounded-md bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="w-full max-w-4xl mx-auto my-auto bg-white rounded-md shadow-2xl overflow-hidden text-zinc-900">
            {renderTemplateComponent(true)}
          </div>
        </div>
      )}
    </div>
  );
}
