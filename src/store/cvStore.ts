import { create } from 'zustand';
import {
  CV,
  PersonalInfo,
  ExperienceSummary,
  Skill,
  WorkExperience,
  Education,
  AIGeneratedContent,
  CoverLetter,
  RecommendationLetter,
  TemplateId,
  PaletteId,
  PaletteColors,
  PDFFormat,
} from '@/types';
import { INITIAL_CV_STATE } from '@/constants/sample-data';
import { PALETTES } from '@/constants/palettes';

interface CVStore {
  cv: CV;
  currentStep: number;
  previewFormat: PDFFormat;
  isGeneratingAI: boolean;
  isGeneratingLetter: boolean;
  generationError: string | null;
  activeModal: null | 'cover-letter' | 'recommendation' | 'custom-palette';

  // Personal Info
  updatePersonalInfo: (data: Partial<PersonalInfo>) => void;

  // Experience
  updateExperience: (data: Partial<ExperienceSummary>) => void;

  // Skills
  addSkill: (skill: Omit<Skill, 'id'>) => void;
  removeSkill: (id: string) => void;
  updateSkill: (id: string, skill: Partial<Skill>) => void;

  // Work History
  addWorkHistory: (entry: Omit<WorkExperience, 'id'>) => void;
  updateWorkHistory: (id: string, entry: Partial<WorkExperience>) => void;
  removeWorkHistory: (id: string) => void;

  // Education
  addEducation: (entry: Omit<Education, 'id'>) => void;
  updateEducation: (id: string, entry: Partial<Education>) => void;
  removeEducation: (id: string) => void;

  // Steps & Preview
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setPreviewFormat: (format: PDFFormat) => void;

  // Template & Palette
  setTemplate: (templateId: TemplateId) => void;
  setPalette: (paletteId: PaletteId) => void;
  setCustomColors: (colors: PaletteColors) => void;

  // AI & Letters
  setAIContent: (content: AIGeneratedContent) => void;
  updateAISummary: (summary: string) => void;
  setCoverLetter: (letter: CoverLetter) => void;
  setRecommendation: (recommendation: RecommendationLetter) => void;
  setIsGeneratingAI: (val: boolean) => void;
  setIsGeneratingLetter: (val: boolean) => void;
  setGenerationError: (err: string | null) => void;
  setActiveModal: (modal: null | 'cover-letter' | 'recommendation' | 'custom-palette') => void;

  // Reset / Preset
  loadSampleData: () => void;
  clearData: () => void;
}

export const useCVStore = create<CVStore>((set) => ({
  cv: INITIAL_CV_STATE,
  currentStep: 0,
  previewFormat: 'desktop',
  isGeneratingAI: false,
  isGeneratingLetter: false,
  generationError: null,
  activeModal: null,

  updatePersonalInfo: (data) =>
    set((state) => ({
      cv: {
        ...state.cv,
        personalInfo: { ...state.cv.personalInfo, ...data },
        updatedAt: new Date().toISOString(),
      },
    })),

  updateExperience: (data) =>
    set((state) => ({
      cv: {
        ...state.cv,
        experience: { ...state.cv.experience, ...data },
        updatedAt: new Date().toISOString(),
      },
    })),

  addSkill: (skill) =>
    set((state) => ({
      cv: {
        ...state.cv,
        skills: [...state.cv.skills, { ...skill, id: `sk-${Date.now()}` }],
        updatedAt: new Date().toISOString(),
      },
    })),

  removeSkill: (id) =>
    set((state) => ({
      cv: {
        ...state.cv,
        skills: state.cv.skills.filter((s) => s.id !== id),
        updatedAt: new Date().toISOString(),
      },
    })),

  updateSkill: (id, skill) =>
    set((state) => ({
      cv: {
        ...state.cv,
        skills: state.cv.skills.map((s) => (s.id === id ? { ...s, ...skill } : s)),
        updatedAt: new Date().toISOString(),
      },
    })),

  addWorkHistory: (entry) =>
    set((state) => ({
      cv: {
        ...state.cv,
        workHistory: [
          { ...entry, id: `wh-${Date.now()}` },
          ...state.cv.workHistory,
        ],
        updatedAt: new Date().toISOString(),
      },
    })),

  updateWorkHistory: (id, entry) =>
    set((state) => ({
      cv: {
        ...state.cv,
        workHistory: state.cv.workHistory.map((w) =>
          w.id === id ? { ...w, ...entry } : w
        ),
        updatedAt: new Date().toISOString(),
      },
    })),

  removeWorkHistory: (id) =>
    set((state) => ({
      cv: {
        ...state.cv,
        workHistory: state.cv.workHistory.filter((w) => w.id !== id),
        updatedAt: new Date().toISOString(),
      },
    })),

  addEducation: (entry) =>
    set((state) => ({
      cv: {
        ...state.cv,
        education: [
          ...state.cv.education,
          { ...entry, id: `edu-${Date.now()}` },
        ],
        updatedAt: new Date().toISOString(),
      },
    })),

  updateEducation: (id, entry) =>
    set((state) => ({
      cv: {
        ...state.cv,
        education: state.cv.education.map((e) =>
          e.id === id ? { ...e, ...entry } : e
        ),
        updatedAt: new Date().toISOString(),
      },
    })),

  removeEducation: (id) =>
    set((state) => ({
      cv: {
        ...state.cv,
        education: state.cv.education.filter((e) => e.id !== id),
        updatedAt: new Date().toISOString(),
      },
    })),

  setStep: (step) => set({ currentStep: Math.max(0, Math.min(4, step)) }),
  nextStep: () =>
    set((state) => ({ currentStep: Math.min(4, state.currentStep + 1) })),
  prevStep: () =>
    set((state) => ({ currentStep: Math.max(0, state.currentStep - 1) })),

  setPreviewFormat: (format) => set({ previewFormat: format }),

  setTemplate: (templateId) =>
    set((state) => ({
      cv: { ...state.cv, templateId, updatedAt: new Date().toISOString() },
    })),

  setPalette: (paletteId) =>
    set((state) => ({
      cv: { ...state.cv, paletteId, updatedAt: new Date().toISOString() },
    })),

  setCustomColors: (colors) =>
    set((state) => ({
      cv: {
        ...state.cv,
        paletteId: 'custom',
        customColors: colors,
        updatedAt: new Date().toISOString(),
      },
    })),

  setAIContent: (content) =>
    set((state) => ({
      cv: { ...state.cv, aiGenerated: content, updatedAt: new Date().toISOString() },
      isGeneratingAI: false,
      generationError: null,
    })),

  updateAISummary: (summary) =>
    set((state) => {
      if (!state.cv.aiGenerated) return state;
      return {
        cv: {
          ...state.cv,
          aiGenerated: {
            ...state.cv.aiGenerated,
            summary,
          },
          updatedAt: new Date().toISOString(),
        },
      };
    }),

  setCoverLetter: (coverLetter) =>
    set((state) => ({
      cv: { ...state.cv, coverLetter, updatedAt: new Date().toISOString() },
      isGeneratingLetter: false,
      generationError: null,
    })),

  setRecommendation: (recommendation) =>
    set((state) => ({
      cv: { ...state.cv, recommendation, updatedAt: new Date().toISOString() },
      isGeneratingLetter: false,
      generationError: null,
    })),

  setIsGeneratingAI: (isGeneratingAI) => set({ isGeneratingAI }),
  setIsGeneratingLetter: (isGeneratingLetter) => set({ isGeneratingLetter }),
  setGenerationError: (generationError) => set({ generationError }),
  setActiveModal: (activeModal) => set({ activeModal }),

  loadSampleData: () => set({ cv: INITIAL_CV_STATE, currentStep: 0 }),
  clearData: () =>
    set({
      cv: {
        ...INITIAL_CV_STATE,
        personalInfo: {
          fullName: '',
          jobTitle: '',
          birthYear: 2000,
          address: '',
          email: '',
          phone: '',
          photoUrl: '',
        },
        experience: { text: '' },
        skills: [],
        workHistory: [],
        education: [],
        aiGenerated: undefined,
        coverLetter: undefined,
        recommendation: undefined,
      },
      currentStep: 0,
    }),
}));
