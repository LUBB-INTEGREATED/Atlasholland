'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { nl } from '@/src/content/nl';
import { company } from '@/src/config/company';

export function ContactForm() {
  const [naam, setNaam] = useState('');
  const [email, setEmail] = useState('');
  const [telefoon, setTelefoon] = useState('');
  const [bedrijf, setBedrijf] = useState('');
  const [bericht, setBericht] = useState('');
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = () => {
    const next: Record<string, string> = {};
    if (!naam.trim() || naam.trim().length < 2) {
      next.naam = 'Vul uw naam in.';
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = 'Vul een geldig e-mailadres in.';
    }
    if (!bericht.trim() || bericht.trim().length < 5) {
      next.bericht = 'Vul uw bericht of vraag in.';
    }
    if (!privacyAccepted) {
      next.privacy = 'Ga akkoord met de privacyverklaring om uw bericht te versturen.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!validate()) return;

    const payload = {
      type: 'contact_message',
      timestamp: new Date().toISOString(),
      data: {
        naam: naam.trim(),
        email: email.trim(),
        telefoon: telefoon.trim() || undefined,
        bedrijf: bedrijf.trim() || undefined,
        bericht: bericht.trim(),
        privacyAccepted,
      },
    };

    try {
      console.info('[Atlas Holland API Ready] Contactbericht:', payload);
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
        className="bg-white border border-[var(--line)] rounded-[6px] p-8 md:p-10 space-y-6"
      >
        <div className="inline-flex items-center gap-2 font-mono-label text-[var(--asphalt)] border border-[var(--asphalt)] px-3 py-1 rounded-[2px] bg-[var(--paper)]">
          <CheckCircle2 size={16} className="text-[var(--ok)]" />
          <span>BERICHT VERZONDEN</span>
        </div>
        <h3 className="font-display-expanded text-2xl md:text-3xl text-[var(--asphalt)]">
          BEDANKT VOOR UW BERICHT
        </h3>
        <p className="text-base text-[var(--steel)] leading-relaxed">
          {nl.contactPage.formSuccess}
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setNaam('');
            setEmail('');
            setTelefoon('');
            setBedrijf('');
            setBericht('');
            setPrivacyAccepted(false);
          }}
          className="inline-flex items-center h-12 px-5 border border-[var(--asphalt)] text-[var(--asphalt)] font-medium text-sm rounded-[2px] hover:bg-[var(--asphalt)] hover:text-[var(--paper)] transition-colors cursor-pointer"
        >
          Nieuw bericht versturen
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white border border-[var(--line)] rounded-[6px] p-6 md:p-10 space-y-6"
    >
      {submitError && (
        <div
          role="alert"
          className="p-4 bg-[var(--paper)] border border-[var(--signal-ink)] rounded-[2px] flex items-start gap-3 text-sm text-[var(--asphalt)]"
        >
          <AlertCircle
            size={18}
            className="text-[var(--signal-ink)] shrink-0 mt-0.5"
          />
          <span>{submitError}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="contact-naam"
            className="font-mono-label text-[var(--asphalt)] block mb-2"
          >
            NAAM *
          </label>
          <input
            id="contact-naam"
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

        <div>
          <label
            htmlFor="contact-email"
            className="font-mono-label text-[var(--asphalt)] block mb-2"
          >
            E-MAILADRES *
          </label>
          <input
            id="contact-email"
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
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="contact-telefoon"
            className="font-mono-label text-[var(--steel)] block mb-2"
          >
            TELEFOONNUMMER
          </label>
          <input
            id="contact-telefoon"
            type="tel"
            value={telefoon}
            onChange={(e) => setTelefoon(e.target.value)}
            placeholder="06 — 12 34 56 78"
            className="w-full h-[56px] px-4 bg-white border border-[var(--line)] rounded-[2px] text-[15px] text-[var(--asphalt)]"
          />
        </div>

        <div>
          <label
            htmlFor="contact-bedrijf"
            className="font-mono-label text-[var(--steel)] block mb-2"
          >
            BEDRIJF / ORGANISATIE
          </label>
          <input
            id="contact-bedrijf"
            type="text"
            value={bedrijf}
            onChange={(e) => setBedrijf(e.target.value)}
            placeholder="Naam organisatie"
            className="w-full h-[56px] px-4 bg-white border border-[var(--line)] rounded-[2px] text-[15px] text-[var(--asphalt)]"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-bericht"
          className="font-mono-label text-[var(--asphalt)] block mb-2"
        >
          BERICHT *
        </label>
        <textarea
          id="contact-bericht"
          rows={5}
          required
          value={bericht}
          onChange={(e) => setBericht(e.target.value)}
          placeholder="Waarmee kunnen wij u helpen?"
          className="w-full p-4 bg-white border border-[var(--line)] rounded-[2px] text-[15px] text-[var(--asphalt)]"
        />
        {errors.bericht && (
          <p className="mt-1.5 text-xs font-mono text-[var(--signal-ink)]">
            {errors.bericht}
          </p>
        )}
      </div>

      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={privacyAccepted}
            onChange={(e) => setPrivacyAccepted(e.target.checked)}
            className="mt-1 w-5 h-5 accent-[var(--signal)] rounded-[2px]"
          />
          <span className="text-sm text-[var(--steel)]">
            Ik ga akkoord met de{' '}
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
        <span>Bericht versturen</span>
        <ArrowRight
          size={18}
          strokeWidth={1.5}
          className="ml-2 transition-transform duration-150 group-hover:translate-x-1"
        />
      </button>
    </form>
  );
}
