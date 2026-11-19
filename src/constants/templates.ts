import { Template, TemplateId } from '@/types';

export const TEMPLATES: Record<TemplateId, Template> = {
  classic: {
    id: 'classic',
    name: 'Classic',
    description: 'Традиционный двухколоночный макет с боковой панелью',
    badge: 'Корпоративный',
    layout: 'two-column',
  },
  modern: {
    id: 'modern',
    name: 'Modern',
    description: 'Минималистичный одноколоночный макет с акцентом на контент',
    badge: 'Минимализм',
    layout: 'single-column',
  },
  creative: {
    id: 'creative',
    name: 'Creative',
    description: 'С акцентной шапкой, круглым фото и прогресс-барами навыков',
    badge: 'Креативный',
    layout: 'single-column',
  },
  compact: {
    id: 'compact',
    name: 'Compact',
    description: 'Максимальная плотность информации на одной странице',
    badge: 'Инженерный',
    layout: 'compact',
  },
  executive: {
    id: 'executive',
    name: 'Executive',
    description: 'Премиальный макет для руководителей и ведущих экспертов',
    badge: 'C-Level',
    layout: 'executive',
  },
};
