'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { CourseItem, nl } from '@/src/content/nl';
import { company, getPhoneHref } from '@/src/config/company';
import { SectionIndex } from './SignatureElements';

export function OpleidingenInteractive({ courses }: { courses: CourseItem[] }) {
  const [selectedCourseSlug, setSelectedCourseSlug] = useState(
    courses[0]?.slug || 'brl-9101'
  );
  const [naam, setNaam] = useState('');
  const [email, setEmail] = useState('');
  const [telefoon, setTelefoon] = useState('');
  const [bedrijf, setBedrijf] = useState('');
  const [toelichting, setToelichting] = useState('');
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSelectCourse = (slug: string) => {
    setSelectedCourseSlug(slug);
    setSubmitted(false);
    const formEl = document.getElementById('aanmelden');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!selectedCourseSlug) {
      nextErrors.opleiding = 'Kies een opleiding.';
    }
    if (!naam.trim() || naam.trim().length < 2) {
      nextErrors.naam = 'Vul uw volledige naam in.';
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Vul een geldig e-mailadres in.';
    }
    if (!telefoon.trim() || telefoon.replace(/\D/g, '').length < 8) {
      nextErrors.telefoon = 'Vul een geldig telefoonnummer in.';
    }
    if (!privacyAccepted) {
      nextErrors.privacy = 'Ga akkoord met de privacyverklaring om door te gaan.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!validate()) return;

    const payload = {
      type: 'course_enrollment',
      timestamp: new Date().toISOString(),
      data: {
        opleiding: selectedCourseSlug,
        naam: naam.trim(),
        email: email.trim(),
        telefoon: telefoon.trim(),
        bedrijf: bedrijf.trim() || undefined,
        toelichting: toelichting.trim() || undefined,
        privacyAccepted,
      },
    };

    try {
      // Structured handler ready to POST to an API endpoint later
      console.info('[Atlas Holland API Ready] Opleiding aanmelding:', payload);
      setSubmitted(true);
    } catch {
      setSubmitError(
        'Er is een fout opgetreden bij het versturen. Probeer het opnieuw of bel direct met onze planning.'
      );
    }
  };

  return (
    <div>
      {/* 01 — Course Rows */}
      <section className="py-[clamp(80px,10vw,140px)] bg-[var(--paper)] border-b border-[var(--line)]">
        <div className="mx-auto max-w-[1360px] px-4 md:px-6">
          <SectionIndex
            code={nl.opleidingenPage.coursesIndex}
            note={nl.opleidingenPage.coursesNote}
          />

          <h2 className="font-display-expanded text-display-h2 text-[var(--asphalt)] mb-12 max-w-4xl">
            {nl.opleidingenPage.coursesHeadline}
          </h2>

          <div className="border-t border-[var(--line)]">
            {courses.map((course, idx) => {
              const isSelected = selectedCourseSlug === course.slug;
              return (
                <div
                  key={course.slug}
                  className={`border-b border-[var(--line)] py-7 md:py-8 px-4 -mx-4 transition-colors ${
                    isSelected ? 'bg-white' : 'hover:bg-white/70'
                  }`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start lg:items-center">
                    {/* Code & Index */}
                    <div className="lg:col-span-2 flex items-center gap-3">
                      <span className="font-mono-label text-[var(--steel)]">
                        0{idx + 1}
                      </span>
                      <span className="font-mono-label text-[var(--asphalt)] border border-[var(--asphalt)] px-2.5 py-1 rounded-[2px]">
                        {course.code}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div className="lg:col-span-5 space-y-2">
                      <h3 className="text-[1.375rem] font-semibold text-[var(--asphalt)]">
                        {course.title}
                      </h3>
                      <p className="text-sm md:text-base text-[var(--steel)] leading-relaxed">
                        {course.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1 text-xs font-mono text-[var(--steel)]">
                        {course.topics.map((topic, tIdx) => (
                          <React.Fragment key={topic}>
                            {tIdx > 0 && <span aria-hidden="true">·</span>}
                            <span>{topic}</span>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>

                    {/* Duration & Level */}
                    <div className="lg:col-span-3 space-y-1 lg:border-l lg:border-[var(--line)] lg:pl-6">
                      <span className="font-mono-label text-[var(--steel)] block">
                        DUUR & CERTIFICAAT
                      </span>
                      <p className="text-base font-semibold text-[var(--asphalt)]">
                        {course.duration}
                      </p>
                      <p className="text-xs text-[var(--steel)]">
                        {course.certification}
                      </p>
                    </div>

                    {/* Action: Inschrijven */}
                    <div className="lg:col-span-2 flex lg:justify-end">
                      <button
                        type="button"
                        onClick={() => handleSelectCourse(course.slug)}
                        className="group inline-flex items-center justify-center h-[48px] px-5 bg-[var(--signal)] hover:bg-[var(--signal-hover)] text-[var(--asphalt)] font-semibold text-sm rounded-[2px] transition-colors whitespace-nowrap cursor-pointer"
                      >
                        <span>Inschrijven</span>
                        <ArrowRight
                          size={16}
                          strokeWidth={1.5}
                          className="ml-2 transition-transform duration-150 group-hover:translate-x-1"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 02 — Enrolment Form (#aanmelden) */}
      <section
        id="aanmelden"
        className="py-[clamp(80px,10vw,140px)] bg-white border-b border-[var(--line)] scroll-mt-20"
      >
        <div className="mx-auto max-w-[1360px] px-4 md:px-6">
          <SectionIndex
            code={nl.opleidingenPage.form.index}
            note={nl.opleidingenPage.form.note}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left 5 Columns: Info + Recruitment Callout */}
            <div className="lg:col-span-5 space-y-6">
              <h2 className="font-display-expanded text-display-h2 text-[var(--asphalt)]">
                {nl.opleidingenPage.form.headline}
              </h2>
              <p className="text-base md:text-lg text-[var(--steel)] leading-relaxed">
                {nl.opleidingenPage.form.description}
              </p>

              <div className="p-6 bg-[var(--paper)] border border-[var(--line)] rounded-[6px] space-y-3">
                <span className="font-mono-label text-[var(--signal-ink)]">
                  GRATIS OPLEIDING BIJ DIENSTVERBAND
                </span>
                <h3 className="text-lg font-semibold text-[var(--asphalt)]">
                  Wil je als verkeersregelaar bij Atlas aan de slag?
                </h3>
                <p className="text-sm text-[var(--steel)] leading-relaxed">
                  Wanneer je bij Atlas Holland B.V. in dienst treedt, betalen en verzorgen wij jouw volledige opleiding tot beroepsverkeersregelaar en VCA.
                </p>
                <Link
                  href="/werken-bij#solliciteren"
                  className="inline-flex items-center text-sm font-semibold text-[var(--asphalt)] hover:text-[var(--signal-ink)] underline underline-offset-4 pt-1"
                >
                  <span>Ga naar het sollicitatieformulier →</span>
                </Link>
              </div>

              <div className="pt-4 border-t border-[var(--line)]">
                <span className="font-mono-label text-[var(--steel)] block">
                  IN-COMPANY OF GROEPSINSCHRIJVING?
                </span>
                <a
                  href={getPhoneHref(company.phoneRaw)}
                  className="mt-1 inline-block font-mono text-lg font-semibold text-[var(--asphalt)] hover:text-[var(--signal-ink)]"
                >
                  {company.phoneDisplay}
                </a>
              </div>
            </div>

            {/* Right 7 Columns: Validated Enrolment Form */}
            <div className="lg:col-span-7 bg-[var(--paper)] border border-[var(--line)] rounded-[6px] p-6 md:p-10">
              {submitted ? (
                <div
                  role="status"
                  className="py-8 space-y-6"
                >
                  <div className="inline-flex items-center gap-2 font-mono-label text-[var(--asphalt)] border border-[var(--asphalt)] px-3 py-1 rounded-[2px] bg-white">
                    <CheckCircle2 size={16} className="text-[var(--ok)]" />
                    <span>AANMELDING ONTVANGEN</span>
                  </div>
                  <h3 className="font-display-expanded text-2xl md:text-3xl text-[var(--asphalt)]">
                    BEDANKT VOOR UW INSCHRIJVING
                  </h3>
                  <p className="text-base text-[var(--steel)] leading-relaxed">
                    {nl.opleidingenPage.form.successMessage}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setNaam('');
                      setEmail('');
                      setTelefoon('');
                      setBedrijf('');
                      setToelichting('');
                      setPrivacyAccepted(false);
                    }}
                    className="inline-flex items-center h-12 px-5 border border-[var(--asphalt)] text-[var(--asphalt)] font-medium text-sm rounded-[2px] bg-white hover:bg-[var(--asphalt)] hover:text-[var(--paper)] transition-colors cursor-pointer"
                  >
                    Nog een deelnemer aanmelden
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  {submitError && (
                    <div
                      role="alert"
                      className="p-4 bg-white border border-[var(--signal-ink)] rounded-[2px] flex items-start gap-3 text-sm text-[var(--asphalt)]"
                    >
                      <AlertCircle
                        size={18}
                        className="text-[var(--signal-ink)] shrink-0 mt-0.5"
                      />
                      <span>{submitError}</span>
                    </div>
                  )}

                  {/* Opleiding Select */}
                  <div>
                    <label
                      htmlFor="enroll-course"
                      className="font-mono-label text-[var(--asphalt)] block mb-2"
                    >
                      OPLEIDING *
                    </label>
                    <select
                      id="enroll-course"
                      value={selectedCourseSlug}
                      onChange={(e) => setSelectedCourseSlug(e.target.value)}
                      className="w-full h-[56px] px-4 bg-white border border-[var(--line)] rounded-[2px] text-[15px] text-[var(--asphalt)] font-medium"
                    >
                      {courses.map((c) => (
                        <option key={c.slug} value={c.slug}>
                          {c.code} — {c.title} ({c.duration})
                        </option>
                      ))}
                    </select>
                    {errors.opleiding && (
                      <p className="mt-1.5 text-xs font-mono text-[var(--signal-ink)]">
                        {errors.opleiding}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Naam */}
                    <div>
                      <label
                        htmlFor="enroll-naam"
                        className="font-mono-label text-[var(--asphalt)] block mb-2"
                      >
                        VOLLEDIGE NAAM *
                      </label>
                      <input
                        id="enroll-naam"
                        type="text"
                        required
                        value={naam}
                        onChange={(e) => setNaam(e.target.value)}
                        placeholder="Voor- en achternaam"
                        className="w-full h-[56px] px-4 bg-white border border-[var(--line)] rounded-[2px] text-[15px] text-[var(--asphalt)]"
                      />
                      {errors.naam && (
                        <p className="mt-1.5 text-xs font-mono text-[var(--signal-ink)]">
                          {errors.naam}
                        </p>
                      )}
                    </div>

                    {/* Bedrijf (optioneel) */}
                    <div>
                      <label
                        htmlFor="enroll-bedrijf"
                        className="font-mono-label text-[var(--steel)] block mb-2"
                      >
                        BEDRIJF / ORGANISATIE (OPTIONEEL)
                      </label>
                      <input
                        id="enroll-bedrijf"
                        type="text"
                        value={bedrijf}
                        onChange={(e) => setBedrijf(e.target.value)}
                        placeholder="Naam organisatie"
                        className="w-full h-[56px] px-4 bg-white border border-[var(--line)] rounded-[2px] text-[15px] text-[var(--asphalt)]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* E-mail */}
                    <div>
                      <label
                        htmlFor="enroll-email"
                        className="font-mono-label text-[var(--asphalt)] block mb-2"
                      >
                        E-MAILADRES *
                      </label>
                      <input
                        id="enroll-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="naam@organisatie.nl"
                        className="w-full h-[56px] px-4 bg-white border border-[var(--line)] rounded-[2px] text-[15px] text-[var(--asphalt)]"
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-xs font-mono text-[var(--signal-ink)]">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Telefoon */}
                    <div>
                      <label
                        htmlFor="enroll-telefoon"
                        className="font-mono-label text-[var(--asphalt)] block mb-2"
                      >
                        TELEFOONNUMMER *
                      </label>
                      <input
                        id="enroll-telefoon"
                        type="tel"
                        required
                        value={telefoon}
                        onChange={(e) => setTelefoon(e.target.value)}
                        placeholder="06 — 12 34 56 78"
                        className="w-full h-[56px] px-4 bg-white border border-[var(--line)] rounded-[2px] text-[15px] text-[var(--asphalt)]"
                      />
                      {errors.telefoon && (
                        <p className="mt-1.5 text-xs font-mono text-[var(--signal-ink)]">
                          {errors.telefoon}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Toelichting (optioneel) */}
                  <div>
                    <label
                      htmlFor="enroll-toelichting"
                      className="font-mono-label text-[var(--steel)] block mb-2"
                    >
                      TOELICHTING OF AANTAL DEELNEMERS (OPTIONEEL)
                    </label>
                    <textarea
                      id="enroll-toelichting"
                      rows={3}
                      value={toelichting}
                      onChange={(e) => setToelichting(e.target.value)}
                      placeholder="Bijv. voorkeursweek, herinstructie of in-company aanvraag voor meerdere medewerkers"
                      className="w-full p-4 bg-white border border-[var(--line)] rounded-[2px] text-[15px] text-[var(--asphalt)]"
                    />
                  </div>

                  {/* Privacy Checkbox */}
                  <div>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={privacyAccepted}
                        onChange={(e) => setPrivacyAccepted(e.target.checked)}
                        className="mt-1 w-5 h-5 accent-[var(--signal)] rounded-[2px]"
                      />
                      <span className="text-sm text-[var(--steel)]">
                        Ik ga akkoord met de verwerking van mijn gegevens volgens de{' '}
                        <Link
                          href="/privacy"
                          className="text-[var(--asphalt)] underline underline-offset-4"
                        >
                          privacyverklaring
                        </Link>{' '}
                        van {company.name} *
                      </span>
                    </label>
                    {errors.privacy && (
                      <p className="mt-1.5 text-xs font-mono text-[var(--signal-ink)]">
                        {errors.privacy}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="group w-full sm:w-auto inline-flex items-center justify-center h-[52px] px-8 bg-[var(--signal)] hover:bg-[var(--signal-hover)] text-[var(--asphalt)] font-semibold text-[15px] rounded-[2px] transition-colors cursor-pointer"
                  >
                    <span>{nl.opleidingenPage.form.submitLabel}</span>
                    <ArrowRight
                      size={18}
                      strokeWidth={1.5}
                      className="ml-2 transition-transform duration-150 group-hover:translate-x-1"
                    />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
