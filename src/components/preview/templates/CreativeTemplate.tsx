'use client';

import { CV, PaletteColors, PDFFormat } from '@/types';
import { formatMonthYear, DEGREE_LABELS } from '@/lib/utils';
import { Mail, Phone, MapPin, Star } from 'lucide-react';

interface TemplateProps {
  cv: CV;
  colors: PaletteColors;
  format: PDFFormat;
}

export function CreativeTemplate({ cv, colors, format }: TemplateProps) {
  const isMobile = format === 'mobile';
  const { personalInfo, experience, skills, workHistory, education, aiGenerated } = cv;

  return (
    <div
      className="w-full text-left font-body min-h-[900px] leading-normal overflow-hidden"
      style={{
        backgroundColor: colors.background,
        color: colors.text,
      }}
    >
      {/* Top Graphic Accent Bar */}
      <div className="w-full h-3" style={{ backgroundColor: colors.accent }} />

      {/* Header Banner */}
      <div
        className="p-6 sm:p-8 border-b"
        style={{
          backgroundColor: `${colors.primary}0D`,
          borderColor: `${colors.primary}25`,
        }}
      >
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          {/* Circular Photo */}
          {personalInfo.photoUrl ? (
            <div
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-3 shadow-md flex-shrink-0"
              style={{ borderColor: colors.accent }}
            >
              <img
                src={personalInfo.photoUrl}
                alt={personalInfo.fullName}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center font-heading font-bold text-2xl text-white shadow-md flex-shrink-0"
              style={{ backgroundColor: colors.primary }}
            >
              {personalInfo.fullName ? personalInfo.fullName.charAt(0) : 'CV'}
            </div>
          )}

          <div className="flex-1 text-center sm:text-left space-y-1">
            <h1
              className="text-2xl sm:text-3xl font-bold font-heading tracking-tight"
              style={{ color: colors.primary }}
            >
              {personalInfo.fullName || 'Имя Фамилия'}
            </h1>
            {personalInfo.jobTitle && (
              <p className="text-sm sm:text-base font-semibold" style={{ color: colors.accent }}>
                {personalInfo.jobTitle}
              </p>
            )}

            {/* Contacts Row */}
            <div
              className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2 text-xs"
              style={{ color: colors.textSecondary }}
            >
              {personalInfo.phone && (
                <span className="inline-flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" style={{ color: colors.accent }} />
                  {personalInfo.phone}
                </span>
              )}
              {personalInfo.email && (
                <span className="inline-flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5" style={{ color: colors.accent }} />
                  {personalInfo.email}
                </span>
              )}
              {personalInfo.address && (
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" style={{ color: colors.accent }} />
                  {personalInfo.address}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className={isMobile ? 'p-5 space-y-6' : 'grid grid-cols-12 gap-6 p-6 sm:p-8'}>
        {/* Left Column (Main: 8 cols on desktop) */}
        <div className={isMobile ? 'space-y-6' : 'col-span-8 space-y-6'}>
          {/* Summary */}
          {(aiGenerated?.summary || experience.text) && (
            <div className="space-y-1.5">
              <h2
                className="text-xs font-semibold uppercase tracking-wider font-heading flex items-center gap-2"
                style={{ color: colors.primary }}
              >
                <span>О себе</span>
                <div className="flex-1 h-px" style={{ backgroundColor: `${colors.primary}30` }} />
              </h2>
              <p className="text-xs sm:text-sm leading-relaxed" style={{ color: colors.textSecondary }}>
                {aiGenerated?.summary || experience.text}
              </p>
            </div>
          )}

          {/* Work History */}
          {workHistory.length > 0 && (
            <div className="space-y-4">
              <h2
                className="text-xs font-semibold uppercase tracking-wider font-heading flex items-center gap-2"
                style={{ color: colors.primary }}
              >
                <span>Опыт работы</span>
                <div className="flex-1 h-px" style={{ backgroundColor: `${colors.primary}30` }} />
              </h2>

              <div className="space-y-4">
                {workHistory.map((work) => (
                  <div key={work.id} className="space-y-1 relative pl-4 border-l-2" style={{ borderColor: colors.accent }}>
                    <div className="flex flex-wrap items-baseline justify-between gap-1">
                      <h4 className="font-semibold text-sm" style={{ color: colors.text }}>
                        {work.position}
                      </h4>
                      <span className="text-[11px] font-mono" style={{ color: colors.textSecondary }}>
                        {formatMonthYear(work.startDate)} —{' '}
                        {work.isCurrent ? 'По наст. время' : formatMonthYear(work.endDate)}
                      </span>
                    </div>

                    <p className="text-xs font-medium" style={{ color: colors.accent }}>
                      {work.company}
                    </p>

                    {work.description && (
                      <p className="text-xs leading-relaxed" style={{ color: colors.textSecondary }}>
                        {work.description}
                      </p>
                    )}

                    {work.achievements && work.achievements.length > 0 && (
                      <div className="pt-1 space-y-1">
                        {work.achievements.map((ach, aIdx) => (
                          <div key={aIdx} className="flex items-start gap-1.5 text-xs">
                            <Star className="w-3.5 h-3.5 flex-shrink-0 text-amber-500 mt-0.5 fill-amber-500" />
                            <span style={{ color: colors.textSecondary }}>{ach}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column (Sidebar: 4 cols on desktop) */}
        <div className={isMobile ? 'space-y-6 pt-4 border-t' : 'col-span-4 space-y-6'}>
          {/* Skills with Progress Bars */}
          {skills.length > 0 && (
            <div className="space-y-3">
              <h2
                className="text-xs font-semibold uppercase tracking-wider font-heading flex items-center gap-2"
                style={{ color: colors.primary }}
              >
                <span>Навыки</span>
                <div className="flex-1 h-px" style={{ backgroundColor: `${colors.primary}30` }} />
              </h2>

              <div className="space-y-2.5">
                {skills.map((skill) => {
                  const level = skill.proficiencyLevel || 4;
                  const pct = Math.min(100, Math.max(20, (level / 5) * 100));

                  return (
                    <div key={skill.id} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-medium" style={{ color: colors.text }}>
                          {skill.name}
                        </span>
                        <span className="font-mono text-[10px]" style={{ color: colors.textSecondary }}>
                          {pct}%
                        </span>
                      </div>
                      <div
                        className="w-full h-1.5 rounded-full overflow-hidden"
                        style={{ backgroundColor: `${colors.primary}20` }}
                      >
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${pct}%`,
                            backgroundColor: colors.accent,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Strengths */}
          {aiGenerated?.analysis?.strengths && (
            <div className="space-y-2">
              <h2
                className="text-xs font-semibold uppercase tracking-wider font-heading flex items-center gap-2"
                style={{ color: colors.primary }}
              >
                <span>Сильные стороны</span>
                <div className="flex-1 h-px" style={{ backgroundColor: `${colors.primary}30` }} />
              </h2>

              <div className="space-y-1.5">
                {aiGenerated.analysis.strengths.map((str, idx) => (
                  <div key={idx} className="p-2 rounded border text-xs" style={{ borderColor: `${colors.primary}20` }}>
                    <p className="font-semibold text-emerald-700">✓ {str.title}</p>
                    <p className="text-[11px] mt-0.5" style={{ color: colors.textSecondary }}>
                      {str.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className="space-y-3">
              <h2
                className="text-xs font-semibold uppercase tracking-wider font-heading flex items-center gap-2"
                style={{ color: colors.primary }}
              >
                <span>Образование</span>
                <div className="flex-1 h-px" style={{ backgroundColor: `${colors.primary}30` }} />
              </h2>

              <div className="space-y-2.5">
                {education.map((edu) => (
                  <div key={edu.id} className="text-xs">
                    <p className="font-semibold" style={{ color: colors.text }}>
                      {edu.institution}
                    </p>
                    <p style={{ color: colors.textSecondary }}>
                      {DEGREE_LABELS[edu.degree]} · {edu.fieldOfStudy}
                    </p>
                    <p className="text-[11px] font-mono" style={{ color: colors.textSecondary }}>
                      {edu.startYear} — {edu.endYear || 'н.в.'}
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
