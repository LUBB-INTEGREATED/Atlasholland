'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, AlertCircle, Upload } from 'lucide-react';
import { nl } from '@/src/content/nl';
import { company } from '@/src/config/company';

interface JobApplicationFormProps {
  defaultVacancySlug?: string;
}

const EXPERIENCE_OPTIONS = [
  'Ervaren en gecertificeerd',
  'Ervaring zonder geldig certificaat',
  'Nog geen ervaring',
] as const;

const AVAILABILITY_OPTIONS = ['Fulltime', 'Parttime', 'Flexibel'] as const;

const LICENSE_OPTIONS = ['Geen', 'B', 'C'] as const;

export function JobApplicationForm({
  defaultVacancySlug,
}: JobApplicationFormProps) {
  const [vacancySlug, setVacancySlug] = useState(
    defaultVacancySlug || nl.werkenBijPage.vacancies[0]?.slug || ''
  );
  const [naam, setNaam] = useState('');
  const [email, setEmail] = useState('');
  const [telefoon, setTelefoon] = useState('');
  const [woonplaats, setWoonplaats] = useState('');
  const [ervaring, setErvaring] = useState<string>(EXPERIENCE_OPTIONS[2]);
  const [beschikbaarheid, setBeschikbaarheid] = useState<string>(
    AVAILABILITY_OPTIONS[0]
  );
  const [rijbewijs, setRijbewijs] = useState<string>('B');
  const [motivatie, setMotivatie] = useState('');
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (!file) {
      setCvFile(null);
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy.cv;
        return copy;
      });
      return;
    }

    const allowedExtensions = ['.pdf', '.doc', '.docx'];
    const lowerName = file.name.toLowerCase();
    const validExt = allowedExtensions.some((ext) => lowerName.endsWith(ext));
    const maxBytes = 5 * 1024 * 1024; // 5 MB

    if (!validExt) {
      setErrors((prev) => ({
        ...prev,
        cv: 'Kies een geldig bestandstype (PDF, DOC of DOCX).',
      }));
      setCvFile(null);
      return;
    }

    if (file.size > maxBytes) {
      setErrors((prev) => ({
        ...prev,
        cv: 'Het bestand is groter dan 5 MB. Kies een kleiner bestand.',
      }));
      setCvFile(null);
      return;
    }

    setErrors((prev) => {
      const copy = { ...prev };
      delete copy.cv;
      return copy;
    });
    setCvFile(file);
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!naam.trim() || naam.trim().length < 2) {
      nextErrors.naam = 'Vul je voor- en achternaam in.';
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Vul een geldig e-mailadres in.';
    }
    if (!telefoon.trim() || telefoon.replace(/\D/g, '').length < 8) {
      nextErrors.telefoon = 'Vul een geldig telefoonnummer in.';
    }
    if (!woonplaats.trim()) {
      nextErrors.woonplaats = 'Vul je woonplaats in.';
    }
    if (!privacyAccepted) {
      nextErrors.privacy = 'Ga akkoord met de privacyverklaring om te solliciteren.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!validate()) return;

    const payload = {
      type: 'job_application',
      timestamp: new Date().toISOString(),
      data: {
        vacature: vacancySlug,
        naam: naam.trim(),
        email: email.trim(),
        telefoon: telefoon.trim(),
        woonplaats: woonplaats.trim(),
        ervaring,
        beschikbaarheid,
        rijbewijs,
        motivatie: motivatie.trim() || undefined,
        cvFileName: cvFile ? cvFile.name : undefined,
        cvFileSize: cvFile ? cvFile.size : undefined,
        privacyAccepted,
      },
    };

    try {
      // Structured handler ready to post to an API endpoint later
      console.info('[Atlas Holland API Ready] Sollicitatie:', payload);
      setSubmitted(true);
    } catch {
      setSubmitError(
        'Er ging iets mis bij het versturen. Probeer het opnieuw of bel ons direct.'
      );
    }
  };

  if (submitted) {
    return (
      <div
        role="status"
        className="bg-[var(--paper)] border border-[var(--line)] rounded-[6px] p-8 md:p-10 space-y-6"
      >
        <div className="inline-flex items-center gap-2 font-mono-label text-[var(--asphalt)] border border-[var(--asphalt)] px-3 py-1 rounded-[2px] bg-white">
          <CheckCircle2 size={16} className="text-[var(--ok)]" />
          <span>SOLLICITATIE VERZONDEN</span>
        </div>
        <h3 className="font-display-expanded text-2xl md:text-3xl text-[var(--asphalt)]">
          BEDANKT VOOR JE SOLLICITATIE, {naam.split(' ')[0].toUpperCase()}!
        </h3>
        <p className="text-base text-[var(--steel)] leading-relaxed max-w-2xl">
          {nl.werkenBijPage.form.successMessage}
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setNaam('');
            setEmail('');
            setTelefoon('');
            setWoonplaats('');
            setMotivatie('');
            setCvFile(null);
            setPrivacyAccepted(false);
          }}
          className="inline-flex items-center h-12 px-5 border border-[var(--asphalt)] text-[var(--asphalt)] font-medium text-sm rounded-[2px] bg-white hover:bg-[var(--asphalt)] hover:text-[var(--paper)] transition-colors cursor-pointer"
        >
          Nieuwe sollicitatie invullen
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-[var(--paper)] border border-[var(--line)] rounded-[6px] p-6 md:p-10 space-y-6"
    >
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

      {/* Vacature Selectie */}
      <div>
        <label
          htmlFor="job-vacature"
          className="font-mono-label text-[var(--asphalt)] block mb-2"
        >
          FUNCTIE / VACATURE
        </label>
        <select
          id="job-vacature"
          value={vacancySlug}
          onChange={(e) => setVacancySlug(e.target.value)}
          className="w-full h-[56px] px-4 bg-white border border-[var(--line)] rounded-[2px] text-[15px] text-[var(--asphalt)] font-medium"
        >
          {nl.werkenBijPage.vacancies.map((v) => (
            <option key={v.slug} value={v.slug}>
              {v.code} — {v.title} ({v.region})
            </option>
          ))}
        </select>
      </div>

      {/* Naam & Woonplaats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="job-naam"
            className="font-mono-label text-[var(--asphalt)] block mb-2"
          >
            VOOR- EN ACHTERNAAM *
          </label>
          <input
            id="job-naam"
            type="text"
            required
            value={naam}
            onChange={(e) => setNaam(e.target.value)}
            placeholder="Jouw volledige naam"
            className="w-full h-[56px] px-4 bg-white border border-[var(--line)] rounded-[2px] text-[15px] text-[var(--asphalt)]"
          />
          {errors.naam && (
            <p className="mt-1.5 text-xs font-mono text-[var(--signal-ink)]">
              {errors.naam}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="job-woonplaats"
            className="font-mono-label text-[var(--asphalt)] block mb-2"
          >
            WOONPLAATS *
          </label>
          <input
            id="job-woonplaats"
            type="text"
            required
            value={woonplaats}
            onChange={(e) => setWoonplaats(e.target.value)}
            placeholder="Bijv. Utrecht, Rotterdam, Breda..."
            className="w-full h-[56px] px-4 bg-white border border-[var(--line)] rounded-[2px] text-[15px] text-[var(--asphalt)]"
          />
          {errors.woonplaats && (
            <p className="mt-1.5 text-xs font-mono text-[var(--signal-ink)]">
              {errors.woonplaats}
            </p>
          )}
        </div>
      </div>

      {/* E-mail & Telefoon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="job-email"
            className="font-mono-label text-[var(--asphalt)] block mb-2"
          >
            E-MAILADRES *
          </label>
          <input
            id="job-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jouwnaam@email.nl"
            className="w-full h-[56px] px-4 bg-white border border-[var(--line)] rounded-[2px] text-[15px] text-[var(--asphalt)]"
          />
          {errors.email && (
            <p className="mt-1.5 text-xs font-mono text-[var(--signal-ink)]">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="job-telefoon"
            className="font-mono-label text-[var(--asphalt)] block mb-2"
          >
            TELEFOONNUMMER *
          </label>
          <input
            id="job-telefoon"
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

      {/* Ervaring */}
      <div>
        <label
          htmlFor="job-ervaring"
          className="font-mono-label text-[var(--asphalt)] block mb-2"
        >
          ERVARING ALS VERKEERSREGELAAR *
        </label>
        <select
          id="job-ervaring"
          value={ervaring}
          onChange={(e) => setErvaring(e.target.value)}
          className="w-full h-[56px] px-4 bg-white border border-[var(--line)] rounded-[2px] text-[15px] text-[var(--asphalt)] font-medium"
        >
          {EXPERIENCE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Beschikbaarheid & Rijbewijs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <span className="font-mono-label text-[var(--asphalt)] block mb-2">
            BESCHIKBAARHEID *
          </span>
          <div className="grid grid-cols-3 gap-2">
            {AVAILABILITY_OPTIONS.map((opt) => {
              const active = beschikbaarheid === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setBeschikbaarheid(opt)}
                  className={`h-[52px] rounded-[2px] border text-sm font-medium transition-colors cursor-pointer ${
                    active
                      ? 'bg-[var(--asphalt)] text-[var(--paper)] border-[var(--asphalt)]'
                      : 'bg-white text-[var(--asphalt)] border-[var(--line)] hover:border-[var(--asphalt)]'
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <span className="font-mono-label text-[var(--asphalt)] block mb-2">
            RIJBEWIJS *
          </span>
          <div className="grid grid-cols-3 gap-2">
            {LICENSE_OPTIONS.map((opt) => {
              const active = rijbewijs === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setRijbewijs(opt)}
                  className={`h-[52px] rounded-[2px] border text-sm font-medium transition-colors cursor-pointer ${
                    active
                      ? 'bg-[var(--asphalt)] text-[var(--paper)] border-[var(--asphalt)]'
                      : 'bg-white text-[var(--asphalt)] border-[var(--line)] hover:border-[var(--asphalt)]'
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Motivatie */}
      <div>
        <label
          htmlFor="job-motivatie"
          className="font-mono-label text-[var(--steel)] block mb-2"
        >
          KORTE TOELICHTING OF MOTIVATIE (OPTIONEEL)
        </label>
        <textarea
          id="job-motivatie"
          rows={3}
          value={motivatie}
          onChange={(e) => setMotivatie(e.target.value)}
          placeholder="Vertel kort wanneer je kunt starten of op welke dagen je graag werkt..."
          className="w-full p-4 bg-white border border-[var(--line)] rounded-[2px] text-[15px] text-[var(--asphalt)]"
        />
      </div>

      {/* CV Upload (Optioneel, PDF/DOC <= 5 MB) */}
      <div>
        <label
          htmlFor="job-cv"
          className="font-mono-label text-[var(--steel)] block mb-2"
        >
          CV UPLOADEN (OPTIONEEL · PDF OF DOC · MAX. 5 MB)
        </label>
        <div className="relative">
          <input
            id="job-cv"
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={handleFileChange}
            className="w-full h-[56px] px-4 py-3 bg-white border border-[var(--line)] rounded-[2px] text-sm text-[var(--steel)] file:mr-4 file:py-1 file:px-3 file:rounded-[2px] file:border file:border-[var(--line)] file:bg-[var(--paper)] file:text-xs file:font-mono file:uppercase file:text-[var(--asphalt)] cursor-pointer"
          />
          {cvFile && (
            <p className="mt-1.5 text-xs font-mono text-[var(--asphalt)] flex items-center gap-1.5">
              <Upload size={13} />
              <span>
                Geselecteerd: {cvFile.name} (
                {(cvFile.size / (1024 * 1024)).toFixed(2)} MB)
              </span>
            </p>
          )}
          {errors.cv && (
            <p className="mt-1.5 text-xs font-mono text-[var(--signal-ink)]">
              {errors.cv}
            </p>
          )}
        </div>
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
            Ik ga akkoord met de verwerking van mijn sollicitatiegegevens volgens de{' '}
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
        <span>{nl.werkenBijPage.form.submitLabel}</span>
        <ArrowRight
          size={18}
          strokeWidth={1.5}
          className="ml-2 transition-transform duration-150 group-hover:translate-x-1"
        />
      </button>
    </form>
  );
}
