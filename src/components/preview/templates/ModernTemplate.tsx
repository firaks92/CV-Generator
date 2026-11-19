'use client';

import { CV, PaletteColors, PDFFormat } from '@/types';
import { formatMonthYear, DEGREE_LABELS } from '@/lib/utils';
import { CheckCircle2 } from 'lucide-react';

interface TemplateProps {
  cv: CV;
  colors: PaletteColors;
  format: PDFFormat;
}

export function ModernTemplate({ cv, colors, format }: TemplateProps) {
  const isMobile = format === 'mobile';
  const { personalInfo, experience, skills, workHistory, education, aiGenerated } = cv;

  return (
    <div
      className="w-full text-left font-body p-6 sm:p-8 min-h-[900px] leading-normal"
      style={{
        backgroundColor: colors.background,
        color: colors.text,
      }}
    >
      {/* Centered Modern Header */}
      <div className="text-center pb-6 border-b" style={{ borderColor: `${colors.primary}25` }}>
        {personalInfo.photoUrl && (
          <div className="mb-3 flex justify-center">
            <div
              className="w-20 h-20 rounded-full overflow-hidden border-2 shadow-sm"
              style={{ borderColor: colors.primary }}
            >
              <img
                src={personalInfo.photoUrl}
                alt={personalInfo.fullName}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        <h1
          className="text-2xl sm:text-3xl font-bold font-heading tracking-tight"
          style={{ color: colors.primary }}
        >
          {personalInfo.fullName || 'Имя Фамилия'}
        </h1>

        {personalInfo.jobTitle && (
          <p className="text-sm font-medium mt-1 uppercase tracking-wider" style={{ color: colors.accent }}>
            {personalInfo.jobTitle}
          </p>
        )}

        {/* Inline Contacts */}
        <div
          className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mt-2 text-xs"
          style={{ color: colors.textSecondary }}
        >
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.email && personalInfo.phone && <span>·</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {(personalInfo.email || personalInfo.phone) && personalInfo.address && <span>·</span>}
          {personalInfo.address && <span>{personalInfo.address}</span>}
          {personalInfo.birthYear > 0 && <span>· {personalInfo.birthYear} г.р.</span>}
        </div>
      </div>

      <div className="space-y-6 pt-6">
        {/* Professional Summary */}
        {(aiGenerated?.summary || experience.text) && (
          <div className="space-y-1.5">
            <h2
              className="text-xs font-semibold uppercase tracking-wider font-heading"
              style={{ color: colors.primary }}
            >
              О себе / Professional Summary
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed" style={{ color: colors.textSecondary }}>
              {aiGenerated?.summary || experience.text}
            </p>
          </div>
        )}

        {/* Strengths */}
        {aiGenerated?.analysis?.strengths && aiGenerated.analysis.strengths.length > 0 && (
          <div className="space-y-2">
            <h2
              className="text-xs font-semibold uppercase tracking-wider font-heading flex items-center gap-1.5"
              style={{ color: colors.primary }}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Ключевые компетенции и преимущества</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {aiGenerated.analysis.strengths.map((str, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded border text-xs"
                  style={{
                    backgroundColor: `${colors.primary}08`,
                    borderColor: `${colors.primary}20`,
                  }}
                >
                  <p className="font-semibold" style={{ color: colors.text }}>
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

        {/* Work History */}
        {workHistory.length > 0 && (
          <div className="space-y-4">
            <h2
              className="text-xs font-semibold uppercase tracking-wider font-heading"
              style={{ color: colors.primary }}
            >
              Опыт работы
            </h2>

            <div className="space-y-4">
              {workHistory.map((work) => (
                <div key={work.id} className="space-y-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-1">
                    <h3 className="font-semibold text-sm" style={{ color: colors.text }}>
                      {work.position} · <span style={{ color: colors.accent }}>{work.company}</span>
                    </h3>
                    <span className="text-[11px] font-mono" style={{ color: colors.textSecondary }}>
                      {formatMonthYear(work.startDate)} —{' '}
                      {work.isCurrent ? 'По наст. время' : formatMonthYear(work.endDate)}
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

        {/* Skills (Pill Chips) */}
        {skills.length > 0 && (
          <div className="space-y-2">
            <h2
              className="text-xs font-semibold uppercase tracking-wider font-heading"
              style={{ color: colors.primary }}
            >
              Навыки и технологии
            </h2>

            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className="px-2.5 py-1 rounded-full text-xs font-mono border"
                  style={{
                    backgroundColor: `${colors.primary}12`,
                    color: colors.primary,
                    borderColor: `${colors.primary}30`,
                  }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="space-y-2">
            <h2
              className="text-xs font-semibold uppercase tracking-wider font-heading"
              style={{ color: colors.primary }}
            >
              Образование
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="p-3 rounded border text-xs"
                  style={{
                    borderColor: `${colors.primary}20`,
                    backgroundColor: `${colors.primary}05`,
                  }}
                >
                  <p className="font-semibold" style={{ color: colors.text }}>
                    {edu.institution}
                  </p>
                  <p style={{ color: colors.textSecondary }}>
                    {DEGREE_LABELS[edu.degree]} · {edu.fieldOfStudy}
                  </p>
                  <p className="text-[11px] font-mono mt-0.5" style={{ color: colors.textSecondary }}>
                    {edu.startYear} — {edu.endYear || 'н.в.'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
