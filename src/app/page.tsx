'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { WizardStepper } from '@/components/form/WizardStepper';
import { PersonalInfoStep } from '@/components/form/PersonalInfoStep';
import { ExperienceStep } from '@/components/form/ExperienceStep';
import { SkillsStep } from '@/components/form/SkillsStep';
import { WorkHistoryStep } from '@/components/form/WorkHistoryStep';
import { EducationStep } from '@/components/form/EducationStep';
import { AIResultsPanel } from '@/components/ai/AIResultsPanel';
import { CVPreview } from '@/components/preview/CVPreview';
import { ExportPanel } from '@/components/export/ExportPanel';
import { CoverLetterModal } from '@/components/ai/CoverLetterModal';
import { RecommendationModal } from '@/components/ai/RecommendationModal';
import { CustomPaletteModal } from '@/components/preview/CustomPaletteModal';
import { useCVStore } from '@/store/cvStore';
import { FileEdit, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function HomePage() {
  const { currentStep } = useCVStore();
  const [mobileTab, setMobileTab] = useState<'form' | 'preview'>('form');

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <PersonalInfoStep />;
      case 1:
        return <ExperienceStep />;
      case 2:
        return <SkillsStep />;
      case 3:
        return <WorkHistoryStep />;
      case 4:
        return <EducationStep />;
      default:
        return <PersonalInfoStep />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-app-base text-app-text">
      {/* Top Header */}
      <Header />

      {/* Main Split Layout Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 pb-20 lg:pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Panel: Form & AI Analysis (6 cols on lg = 50%) */}
          <div
            className={cn(
              'lg:col-span-6 space-y-4 transition-all',
              mobileTab === 'preview' ? 'hidden lg:block' : 'block'
            )}
          >
            {/* Wizard Navigation */}
            <WizardStepper />

            {/* Form Step Card */}
            <div className="p-4 sm:p-6 rounded-lg bg-app-surface border border-app-border shadow-subtle">
              {renderCurrentStep()}
            </div>

            {/* AI Results & Growth Areas (appears whenever generated) */}
            <AIResultsPanel />
          </div>

          {/* Right Panel: Template, Palette, Live Preview & Export (6 cols on lg = 50%) */}
          <div
            className={cn(
              'lg:col-span-6 space-y-4 transition-all',
              mobileTab === 'form' ? 'hidden lg:block' : 'block'
            )}
          >
            {/* Live Document Preview with Selector */}
            <CVPreview />

            {/* Export & Document Generation Actions */}
            <ExportPanel />
          </div>
        </div>
      </main>

      {/* Mobile Floating Bottom Bar for Fast Switching */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-app-surface border-t border-app-border p-2 flex items-center justify-around shadow-elevated">
        <button
          type="button"
          onClick={() => setMobileTab('form')}
          className={cn(
            'flex-1 py-2 px-3 rounded-md flex items-center justify-center gap-1.5 text-xs font-semibold transition-colors',
            mobileTab === 'form'
              ? 'bg-app-accent text-white shadow-sm'
              : 'text-app-text-muted hover:text-app-text'
          )}
        >
          <FileEdit className="w-4 h-4" />
          <span>Форма резюме</span>
        </button>

        <button
          type="button"
          onClick={() => setMobileTab('preview')}
          className={cn(
            'flex-1 py-2 px-3 rounded-md flex items-center justify-center gap-1.5 text-xs font-semibold transition-colors',
            mobileTab === 'preview'
              ? 'bg-app-accent text-white shadow-sm'
              : 'text-app-text-muted hover:text-app-text'
          )}
        >
          <Eye className="w-4 h-4" />
          <span>Превью и Скачать</span>
        </button>
      </div>

      {/* Modals */}
      <CoverLetterModal />
      <RecommendationModal />
      <CustomPaletteModal />
    </div>
  );
}
