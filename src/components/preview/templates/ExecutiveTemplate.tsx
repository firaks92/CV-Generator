'use client';

import { CV, PaletteColors, PDFFormat } from '@/types';
import { formatMonthYear, DEGREE_LABELS } from '@/lib/utils';
import { Award, Mail, Phone, MapPin } from 'lucide-react';

interface TemplateProps {
  cv: CV;
  colors: PaletteColors;
  format: PDFFormat;
}

export function ExecutiveTemplate({ cv, colors, format }: TemplateProps) {
  const isMobile = format === 'mobile';
  const { personalInfo, experience, skills, workHistory, education, aiGenerated } = cv;

  return (
    <div
      className="w-full text-left font-body p-6 sm:p-10 min-h-[900px] leading-relaxed"
      style={{
        backgroundColor: colors.background,
        color: colors.text,
      }}
    >
      {/* Executive Header */}
      <div className="pb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div className="space-y-1">
            <h1
              className="text-2xl sm:text-4xl font-bold font-heading tracking-widest uppercase"
              style={{ color: colors.primary }}
            >
              {personalInfo.fullName || 'Имя Фамилия'}
            </h1>
            {personalInfo.jobTitle && (
              <p
                className="text-sm sm:text-base font-semibold tracking-wider uppercase mt-1"
                style={{ color: colors.accent }}
              >
                {personalInfo.jobTitle}
              </p>
            )}

            <div
              className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs pt-2"
              style={{ color: colors.textSecondary }}
            >
              {personalInfo.phone && (
                <span className="inline-flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" style={{ color: colors.accent }} />
                  {personalInfo.phone}
                </span>
              )}
              {personalInfo.email && (
                <span className="inline-flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" style={{ color: colors.accent }} />
                  {personalInfo.email}
                </span>
              )}
              {personalInfo.address && (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" style={{ color: colors.accent }} />
                  {personalInfo.address}
                </span>
              )}
            </div>
          </div>

          {personalInfo.photoUrl && (
            <div
              className="w-24 h-32 rounded border-2 shadow-sm overflow-hidden flex-shrink-0"
              style={{ borderColor: colors.primary }}
            >
              <img
                src={personalInfo.photoUrl}
                alt={personalInfo.fullName}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        {/* Double Rule Line */}
        <div className="mt-5 space-y-1">
          <div className="w-full h-1" style={{ backgroundColor: colors.primary }} />
          <div className="w-full h-px" style={{ backgroundColor: colors.primary }} />
        </div>
      </div>

      <div className="space-y-6 pt-2">
        {/* Executive Summary */}
        {(aiGenerated?.summary || experience.text) && (
          <div className="space-y-2">
            <h2
              className="text-xs font-bold uppercase tracking-widest font-heading"
              style={{ color: colors.primary }}
            >
              Executive Summary
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed" style={{ color: colors.textSecondary }}>
              {aiGenerated?.summary || experience.text}
            </p>
          </div>
        )}

        {/* Key Leadership Achievements & Strengths */}
        {aiGenerated?.analysis?.strengths && (
          <div className="space-y-2">
            <h2
              className="text-xs font-bold uppercase tracking-widest font-heading flex items-center gap-2"
              style={{ color: colors.primary }}
            >
              <Award className="w-4 h-4" style={{ color: colors.accent }} />
              <span>Ключевые достижения и компетенции</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {aiGenerated.analysis.strengths.map((str, idx) => (
                <div
                  key={idx}
                  className="p-3 border-l-2 text-xs"
                  style={{
                    borderColor: colors.accent,
                    backgroundColor: `${colors.primary}08`,
                  }}
                >
                  <p className="font-bold" style={{ color: colors.text }}>
                    {str.title}
                  </p>
                  <p className="text-[11px] mt-0.5" style={{ color: colors.textSecondary }}>
                    {str.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Professional Experience */}
        {workHistory.length > 0 && (
          <div className="space-y-4">
            <h2
              className="text-xs font-bold uppercase tracking-widest font-heading"
              style={{ color: colors.primary }}
            >
              Профессиональный опыт
            </h2>

            <div className="space-y-4">
              {workHistory.map((work) => (
                <div key={work.id} className="space-y-1.5 pb-3 border-b border-dashed" style={{ borderColor: `${colors.primary}25` }}>
                  <div className="flex flex-wrap items-baseline justify-between gap-1">
                    <h3 className="text-sm font-bold tracking-tight" style={{ color: colors.text }}>
                      {work.position} · <span style={{ color: colors.accent }}>{work.company}</span>
                    </h3>
                    <span className="text-xs font-mono" style={{ color: colors.textSecondary }}>
                      {formatMonthYear(work.startDate)} —{' '}
                      {work.isCurrent ? 'По настоящее время' : formatMonthYear(work.endDate)}
                    </span>
                  </div>

                  {work.description && (
                    <p className="text-xs leading-relaxed" style={{ color: colors.textSecondary }}>
                      {work.description}
                    </p>
                  )}

                  {work.achievements && work.achievements.length > 0 && (
                    <ul className="list-disc list-inside text-xs space-y-0.5 pt-1">
                      {work.achievements.map((ach, aIdx) => (
                        <li key={aIdx} style={{ color: colors.textSecondary }}>
                          {ach}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Core Competencies (Skills) */}
        {skills.length > 0 && (
          <div className="space-y-2">
            <h2
              className="text-xs font-bold uppercase tracking-widest font-heading"
              style={{ color: colors.primary }}
            >
              Ключевые компетенции
            </h2>

            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className="px-3 py-1 rounded text-xs font-semibold border"
                  style={{
                    backgroundColor: `${colors.primary}10`,
                    borderColor: `${colors.primary}35`,
                    color: colors.primary,
                  }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Education & Credentials */}
        {education.length > 0 && (
          <div className="space-y-2">
            <h2
              className="text-xs font-bold uppercase tracking-widest font-heading"
              style={{ color: colors.primary }}
            >
              Образование и квалификация
            </h2>

            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id} className="text-xs flex flex-wrap justify-between items-baseline">
                  <div>
                    <span className="font-bold" style={{ color: colors.text }}>
                      {edu.institution}
                    </span>{' '}
                    — {DEGREE_LABELS[edu.degree]}, {edu.fieldOfStudy}
                  </div>
                  <span className="text-[11px] font-mono" style={{ color: colors.textSecondary }}>
                    {edu.startYear} — {edu.endYear || 'н.в.'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
