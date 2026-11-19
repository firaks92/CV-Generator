'use client';

import { CV, PaletteColors, PDFFormat } from '@/types';
import { formatMonthYear, DEGREE_LABELS } from '@/lib/utils';

interface TemplateProps {
  cv: CV;
  colors: PaletteColors;
  format: PDFFormat;
}

export function CompactTemplate({ cv, colors, format }: TemplateProps) {
  const isMobile = format === 'mobile';
  const { personalInfo, experience, skills, workHistory, education, aiGenerated } = cv;

  return (
    <div
      className="w-full text-left font-body p-5 sm:p-6 min-h-[850px] leading-tight text-xs"
      style={{
        backgroundColor: colors.background,
        color: colors.text,
      }}
    >
      {/* Compact Top Header */}
      <div className="border-b pb-2.5 mb-3" style={{ borderColor: colors.primary }}>
        <div className="flex flex-wrap items-baseline justify-between gap-1">
          <div>
            <h1
              className="text-xl sm:text-2xl font-bold font-heading tracking-tight inline"
              style={{ color: colors.primary }}
            >
              {personalInfo.fullName || 'Имя Фамилия'}
            </h1>
            {personalInfo.jobTitle && (
              <span className="ml-2 font-medium text-xs uppercase" style={{ color: colors.accent }}>
                / {personalInfo.jobTitle}
              </span>
            )}
          </div>

          <div
            className="flex flex-wrap items-center gap-x-2 text-[11px] font-mono"
            style={{ color: colors.textSecondary }}
          >
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.email && <span>· {personalInfo.email}</span>}
            {personalInfo.address && <span>· {personalInfo.address}</span>}
          </div>
        </div>

        {/* Short Summary (2-3 lines max) */}
        {(aiGenerated?.summary || experience.text) && (
          <p className="mt-2 text-[11px] leading-relaxed line-clamp-3" style={{ color: colors.textSecondary }}>
            {aiGenerated?.summary || experience.text}
          </p>
        )}
      </div>

      {/* Grid: 2 columns on desktop (60% work, 40% skills/edu) */}
      <div className={isMobile ? 'space-y-4' : 'grid grid-cols-12 gap-4'}>
        {/* Work Experience */}
        <div className={isMobile ? 'space-y-3' : 'col-span-7 space-y-3'}>
          <h2
            className="text-[11px] font-bold uppercase tracking-wider pb-1 border-b font-heading"
            style={{ color: colors.primary, borderColor: `${colors.primary}30` }}
          >
            Опыт работы
          </h2>

          <div className="space-y-3">
            {workHistory.map((work) => (
              <div key={work.id} className="space-y-0.5">
                <div className="flex items-baseline justify-between">
                  <span className="font-bold text-xs" style={{ color: colors.text }}>
                    {work.position}
                  </span>
                  <span className="text-[10px] font-mono" style={{ color: colors.textSecondary }}>
                    {formatMonthYear(work.startDate)} —{' '}
                    {work.isCurrent ? 'н.в.' : formatMonthYear(work.endDate)}
                  </span>
                </div>

                <p className="font-medium text-[11px]" style={{ color: colors.accent }}>
                  {work.company}
                </p>

                {work.description && (
                  <p className="text-[11px] leading-normal" style={{ color: colors.textSecondary }}>
                    {work.description}
                  </p>
                )}

                {work.achievements && work.achievements.length > 0 && (
                  <ul className="list-disc list-inside text-[10px] space-y-0.5 pt-0.5">
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

        {/* Right side: Skills + Education + Strengths */}
        <div className={isMobile ? 'space-y-3 pt-3 border-t' : 'col-span-5 space-y-3'}>
          {/* Skills */}
          {skills.length > 0 && (
            <div className="space-y-1.5">
              <h2
                className="text-[11px] font-bold uppercase tracking-wider pb-1 border-b font-heading"
                style={{ color: colors.primary, borderColor: `${colors.primary}30` }}
              >
                Навыки и технологии
              </h2>

              <div className="flex flex-wrap gap-1">
                {skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="px-1.5 py-0.5 rounded text-[10px] font-mono border"
                    style={{
                      backgroundColor: `${colors.primary}10`,
                      borderColor: `${colors.primary}25`,
                      color: colors.primary,
                    }}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Strengths */}
          {aiGenerated?.analysis?.strengths && (
            <div className="space-y-1.5">
              <h2
                className="text-[11px] font-bold uppercase tracking-wider pb-1 border-b font-heading"
                style={{ color: colors.primary, borderColor: `${colors.primary}30` }}
              >
                Сильные стороны
              </h2>

              <div className="space-y-1">
                {aiGenerated.analysis.strengths.map((str, idx) => (
                  <div key={idx} className="text-[10px]">
                    <span className="font-semibold text-emerald-700">✓ {str.title}:</span>{' '}
                    <span style={{ color: colors.textSecondary }}>{str.description}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className="space-y-1.5">
              <h2
                className="text-[11px] font-bold uppercase tracking-wider pb-1 border-b font-heading"
                style={{ color: colors.primary, borderColor: `${colors.primary}30` }}
              >
                Образование
              </h2>

              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id} className="text-[10px]">
                    <p className="font-semibold" style={{ color: colors.text }}>
                      {edu.institution}
                    </p>
                    <p style={{ color: colors.textSecondary }}>
                      {DEGREE_LABELS[edu.degree]} · {edu.fieldOfStudy} ({edu.startYear}-{edu.endYear || 'н.в.'})
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
