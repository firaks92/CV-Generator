export type Locale = 'ru' | 'en';

export interface PersonalInfo {
  fullName: string;
  address?: string;
  birthYear: number;
  photoUrl?: string;
  phone?: string;
  email?: string;
  jobTitle?: string;
}

export interface ExperienceSummary {
  text: string;
}

export type SkillCategory = 'technical' | 'soft' | 'language' | 'tool' | 'other';

export interface Skill {
  id: string;
  name: string;
  proficiencyLevel?: number; // 1-5
  category?: SkillCategory;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string; // YYYY-MM
  endDate?: string | null; // YYYY-MM or null/empty for current
  isCurrent: boolean;
  description: string;
  achievements?: string[];
}

export type DegreeType =
  | 'secondary'
  | 'vocational'
  | 'bachelor'
  | 'master'
  | 'specialist'
  | 'phd'
  | 'doctorate'
  | 'other';

export interface Education {
  id: string;
  institution: string;
  degree: DegreeType;
  fieldOfStudy: string;
  startYear: number;
  endYear?: number | null;
  gpa?: string;
}

export interface AnalysisItem {
  title: string;
  description: string;
  relatedSkills?: string[];
  icon?: string;
}

export interface AIAnalysis {
  strengths: AnalysisItem[];
  weaknesses: AnalysisItem[]; // Зоны роста
  improvementTips: string[];
  overallScore: number;
}

export interface AIGeneratedContent {
  summary: string;
  analysis: AIAnalysis;
  generatedAt: string;
  modelVersion: string;
}

export interface CoverLetter {
  id: string;
  targetCompany: string;
  targetPosition: string;
  content: string;
  isEdited: boolean;
  generatedAt: string;
}

export interface RecommendationLetter {
  id: string;
  recommenderName: string;
  recommenderPosition: string;
  recommenderCompany: string;
  content: string;
  isEdited: boolean;
  generatedAt: string;
}

export type TemplateId = 'classic' | 'modern' | 'creative' | 'compact' | 'executive';

export type PaletteId =
  | 'ocean-blue'
  | 'forest-green'
  | 'ruby-red'
  | 'royal-purple'
  | 'monochrome'
  | 'sunset-orange'
  | 'custom';

export interface PaletteColors {
  primary: string;
  accent: string;
  background: string;
  text: string;
  textSecondary: string;
  border: string;
  surface: string;
}

export interface ColorPalette {
  id: PaletteId;
  name: string;
  colors: PaletteColors;
}

export interface Template {
  id: TemplateId;
  name: string;
  description: string;
  badge: string;
  layout: 'two-column' | 'single-column' | 'compact' | 'executive';
}

export type PDFFormat = 'desktop' | 'mobile';
export type DocumentType = 'cv' | 'cover-letter' | 'recommendation';

export interface CV {
  id: string;
  personalInfo: PersonalInfo;
  experience: ExperienceSummary;
  skills: Skill[];
  workHistory: WorkExperience[];
  education: Education[];
  templateId: TemplateId;
  paletteId: PaletteId;
  customColors?: PaletteColors;
  aiGenerated?: AIGeneratedContent;
  coverLetter?: CoverLetter;
  recommendation?: RecommendationLetter;
  createdAt: string;
  updatedAt: string;
  locale: Locale;
}
