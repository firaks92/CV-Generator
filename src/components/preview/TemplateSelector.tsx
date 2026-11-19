'use client';

import { useCVStore } from '@/store/cvStore';
import { TEMPLATES } from '@/constants/templates';
import { TemplateId } from '@/types';
import { cn } from '@/lib/utils';
import { Layout } from 'lucide-react';

export function TemplateSelector() {
  const { cv, setTemplate } = useCVStore();

  const renderMiniThumbnail = (id: TemplateId, isActive: boolean) => {
    switch (id) {
      case 'classic':
        return (
          <div className="w-full h-14 bg-white rounded-[3px] border border-zinc-200 overflow-hidden flex p-1 gap-1">
            <div className="w-[32%] h-full bg-blue-50/80 rounded-[2px] p-0.5 space-y-0.5">
              <div className="w-2.5 h-3 bg-blue-300 rounded-[1px]" />
              <div className="w-full h-0.5 bg-zinc-300 rounded-[1px]" />
              <div className="w-3/4 h-0.5 bg-zinc-300 rounded-[1px]" />
            </div>
            <div className="w-[68%] h-full p-0.5 space-y-0.5">
              <div className="w-3/4 h-1 bg-zinc-700 rounded-[1px]" />
              <div className="w-1/2 h-0.5 bg-blue-400 rounded-[1px]" />
              <div className="w-full h-0.5 bg-zinc-200 rounded-[1px]" />
              <div className="w-full h-0.5 bg-zinc-200 rounded-[1px]" />
              <div className="w-2/3 h-0.5 bg-zinc-200 rounded-[1px]" />
            </div>
          </div>
        );

      case 'modern':
        return (
          <div className="w-full h-14 bg-white rounded-[3px] border border-zinc-200 overflow-hidden p-1.5 flex flex-col items-center space-y-1">
            <div className="w-3 h-3 rounded-full bg-zinc-400 mb-0.5" />
            <div className="w-3/4 h-1 bg-zinc-800 rounded-[1px]" />
            <div className="w-1/2 h-0.5 bg-zinc-400 rounded-[1px]" />
            <div className="w-full h-px bg-zinc-200 my-0.5" />
            <div className="w-full h-0.5 bg-zinc-200 rounded-[1px]" />
            <div className="w-5/6 h-0.5 bg-zinc-200 rounded-[1px]" />
          </div>
        );

      case 'creative':
        return (
          <div className="w-full h-14 bg-white rounded-[3px] border border-zinc-200 overflow-hidden flex flex-col">
            <div className="w-full h-1.5 bg-blue-500" />
            <div className="p-1 flex-1 flex flex-col space-y-1">
              <div className="flex items-center gap-1">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-600 flex-shrink-0" />
                <div className="w-3/4 h-1 bg-zinc-700 rounded-[1px]" />
              </div>
              <div className="w-full h-0.5 bg-zinc-200 rounded-[1px]" />
              <div className="flex items-center gap-1">
                <div className="w-1/3 h-0.5 bg-zinc-400" />
                <div className="w-2/3 h-0.5 bg-blue-400 rounded-full" />
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1/3 h-0.5 bg-zinc-400" />
                <div className="w-1/2 h-0.5 bg-blue-400 rounded-full" />
              </div>
            </div>
          </div>
        );

      case 'compact':
        return (
          <div className="w-full h-14 bg-white rounded-[3px] border border-zinc-200 overflow-hidden p-1 flex flex-col space-y-0.5">
            <div className="flex justify-between items-center border-b border-zinc-300 pb-0.5">
              <div className="w-1/2 h-1 bg-zinc-800 rounded-[1px]" />
              <div className="w-1/3 h-0.5 bg-zinc-400 rounded-[1px]" />
            </div>
            <div className="grid grid-cols-2 gap-1 pt-0.5">
              <div className="space-y-0.5">
                <div className="w-full h-0.5 bg-zinc-300" />
                <div className="w-full h-0.5 bg-zinc-200" />
                <div className="w-3/4 h-0.5 bg-zinc-200" />
              </div>
              <div className="space-y-0.5">
                <div className="w-full h-0.5 bg-zinc-300" />
                <div className="w-full h-0.5 bg-zinc-200" />
                <div className="w-2/3 h-0.5 bg-zinc-200" />
              </div>
            </div>
          </div>
        );

      case 'executive':
        return (
          <div className="w-full h-14 bg-white rounded-[3px] border border-zinc-200 overflow-hidden p-1 flex flex-col space-y-1">
            <div className="w-full flex justify-between items-start">
              <div className="space-y-0.5 flex-1">
                <div className="w-3/4 h-1 bg-zinc-900 rounded-[1px]" />
                <div className="w-1/2 h-0.5 bg-zinc-500 rounded-[1px]" />
              </div>
              <div className="w-2 h-2.5 bg-zinc-300 border border-zinc-400 rounded-[1px]" />
            </div>
            <div className="w-full space-y-[1px]">
              <div className="w-full h-[1px] bg-zinc-800" />
              <div className="w-full h-[0.5px] bg-zinc-400" />
            </div>
            <div className="w-full h-0.5 bg-zinc-200" />
            <div className="w-4/5 h-0.5 bg-zinc-200" />
          </div>
        );
    }
  };

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layout className="w-4 h-4 text-app-accent" />
          <span className="text-xs font-semibold uppercase tracking-wider text-app-text-secondary">
            Шаблон оформления:
          </span>
        </div>
        <span className="text-[11px] text-app-accent font-medium">
          {TEMPLATES[cv.templateId]?.name} · {TEMPLATES[cv.templateId]?.badge}
        </span>
      </div>

      <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-5 gap-2">
        {Object.values(TEMPLATES).map((tmpl) => {
          const isActive = cv.templateId === tmpl.id;

          return (
            <button
              key={tmpl.id}
              type="button"
              onClick={() => setTemplate(tmpl.id)}
              className={cn(
                'p-2 rounded-md border text-center transition-all flex flex-col items-center justify-between group shadow-subtle',
                isActive
                  ? 'bg-brand-primary/25 border-app-accent ring-2 ring-app-accent/30 shadow-md'
                  : 'bg-app-surface border-app-border hover:border-app-border-focus hover:bg-app-elevated'
              )}
            >
              {/* Visual Thumbnail */}
              <div className="w-full mb-2 transition-transform group-hover:scale-[1.02]">
                {renderMiniThumbnail(tmpl.id, isActive)}
              </div>

              {/* Title & Badge vertically stacked */}
              <div className="w-full text-center">
                <span
                  className={cn(
                    'block text-xs font-bold font-heading truncate',
                    isActive ? 'text-app-accent' : 'text-app-text'
                  )}
                >
                  {tmpl.name}
                </span>
                <span className="block text-[10px] text-app-text-muted font-medium truncate mt-0.5">
                  {tmpl.badge}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
