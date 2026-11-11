'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Phone,
  AlertCircle,
} from 'lucide-react';
import { nl } from '@/src/content/nl';
import { company, getPhoneHref } from '@/src/config/company';

function QuoteRequestWizardInner() {
  const searchParams = useSearchParams();
  const dienstParam = searchParams.get('dienst') || '';
  const datumParam = searchParams.get('datum') || '';
  const locatieParam = searchParams.get('locatie') || '';

  const initialSlug =
    dienstParam && nl.services.some((s) => s.slug === dienstParam)
      ? dienstParam
      : nl.services[0].slug;

  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Step 1: Selected Services
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([initialSlug]);

  // Step 2: Project Details
  const [locatie, setLocatie] = useState(locatieParam);
  const [datum, setDatum] = useState(datumParam);
  const [begintijd, setBegintijd] = useState('07:00');
  const [eindtijd, setEindtijd] = useState('16:00');
  const [meerdaags, setMeerdaags] = useState(false);
  const [einddatum, setEinddatum] = useState('');
  const [aantalRegelaars, setAantalRegelaars] = useState('2');
  const [soortWerkzaamheden, setSoortWerkzaamheden] = useState('');
  const [opmerkingen, setOpmerkingen] = useState('');

  // Step 3: Contact Details
  const [naam, setNaam] = useState('');
  const [organisatie, setOrganisatie] = useState('');
  const [email, setEmail] = useState('');
  const [telefoon, setTelefoon] = useState('');
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const toggleService = (slug: string) => {
    setSelectedSlugs((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const validateStep1 = () => {
    if (selectedSlugs.length === 0) {
      setErrors({ diensten: 'Selecteer minimaal één dienst om door te gaan.' });
      return false;
    }
    setErrors({});
    return true;
  };

  const validateStep2 = () => {
    const next: Record<string, string> = {};
    if (!locatie.trim()) {
      next.locatie = 'Vul de projectlocatie, postcode of plaats in.';
    }
    if (!datum) {
      next.datum = 'Kies de gewenste startdatum.';
    }
    if (!begintijd) {
      next.begintijd = 'Vul de begintijd in.';
    }
    if (!eindtijd) {
      next.eindtijd = 'Vul de eindtijd in.';
    }
    if (meerdaags && !einddatum) {
      next.einddatum = 'Kies de einddatum voor meerdaagse inzet.';
    }
    if (!soortWerkzaamheden.trim()) {
      next.soortWerkzaamheden = 'Omschrijf kort het soort werkzaamheden.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const validateStep3 = () => {
    const next: Record<string, string> = {};
    if (!naam.trim() || naam.trim().length < 2) {
      next.naam = 'Vul uw naam in.';
    }
    if (!organisatie.trim()) {
      next.organisatie = 'Vul uw bedrijfs- of organisatienaam in.';
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = 'Vul een geldig zakelijk e-mailadres in.';
    }
    if (!telefoon.trim() || telefoon.replace(/\D/g, '').length < 8) {
      next.telefoon = 'Vul een geldig telefoonnummer in.';
    }
    if (!privacyAccepted) {
      next.privacy = 'Ga akkoord met de privacyverklaring om uw aanvraag te versturen.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!validateStep3()) return;

    const payload = {
      type: 'quote_request',
      timestamp: new Date().toISOString(),
      data: {
        diensten: selectedSlugs,
        project: {
          locatie: locatie.trim(),
          startdatum: datum,
          begintijd,
          eindtijd,
          meerdaags,
          einddatum: meerdaags ? einddatum : undefined,
          aantalVerkeersregelaars: Number(aantalRegelaars) || 0,
          soortWerkzaamheden: soortWerkzaamheden.trim(),
          opmerkingen: opmerkingen.trim() || undefined,
        },
        contact: {
          naam: naam.trim(),
          organisatie: organisatie.trim(),
          email: email.trim(),
          telefoon: telefoon.trim(),
          privacyAccepted,
        },
      },
    };

    try {
      // Structured handler ready to post to an API endpoint later
      console.info('[Atlas Holland API Ready] Offerte aanvraag:', payload);
      setSubmitted(true);
    } catch {
      setSubmitError(
        'Er is een fout opgetreden bij het versturen. Bel onze 24/7 planning of probeer het opnieuw.'
      );
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      {/* Left 8 Columns: 3-Step Wizard */}
      <div className="lg:col-span-8">
        {/* Mono Progress Row: 01 DIENST — 02 PROJECT — 03 CONTACT */}
        <div
          aria-label="Stappen offerteaanvraag"
          className="flex flex-wrap items-center gap-3 sm:gap-5 pb-6 mb-8 border-b border-[var(--line)]"
        >
          {nl.offertePage.stepsHeader.map((label, idx) => {
            const stepNum = (idx + 1) as 1 | 2 | 3;
            const isCurrent = !submitted && step === stepNum;
            const isCompleted = submitted || step > stepNum;
            return (
              <React.Fragment key={label}>
                {idx > 0 && (
                  <span
                    className="font-mono-label text-[var(--steel)]"
                    aria-hidden="true"
                  >
                    —
                  </span>
                )}
                <button
                  type="button"
                  disabled={submitted || stepNum > step}
                  onClick={() => {
                    if (!submitted && stepNum < step) {
                      setStep(stepNum);
                    }
                  }}
                  className={`font-mono-label px-3 py-1.5 rounded-[2px] border transition-colors ${
                    isCurrent
                      ? 'border-[var(--signal)] bg-[var(--signal)] text-[var(--asphalt)] font-semibold'
                      : isCompleted
                      ? 'border-[var(--asphalt)] bg-white text-[var(--asphalt)] cursor-pointer'
                      : 'border-[var(--line)] text-[var(--steel)] cursor-default'
                  }`}
                >
                  {label}
                </button>
              </React.Fragment>
            );
          })}
        </div>

        {submitted ? (
          <div
            role="status"
            className="bg-white border border-[var(--line)] rounded-[6px] p-8 md:p-12 space-y-6"
          >
            <div className="inline-flex items-center gap-2 font-mono-label text-[var(--asphalt)] border border-[var(--asphalt)] px-3 py-1 rounded-[2px] bg-[var(--paper)]">
              <CheckCircle2 size={16} className="text-[var(--ok)]" />
              <span>AANVRAAG GEREGISTREERD</span>
            </div>

            <h2 className="font-display-expanded text-display-h2 text-[var(--asphalt)]">
              {nl.offertePage.successTitle}
            </h2>

            <p className="text-base md:text-lg text-[var(--steel)] leading-relaxed max-w-2xl">
              {nl.offertePage.successText}
            </p>

            <div className="p-5 bg-[var(--paper)] border border-[var(--line)] rounded-[2px] space-y-2">
              <p className="font-mono-label text-[var(--steel)]">
                SAMENVATTING AANVRAAG
              </p>
              <p className="text-sm font-medium text-[var(--asphalt)]">
                Diensten:{' '}
                {selectedSlugs
                  .map((s) => nl.services.find((srv) => srv.slug === s)?.title || s)
                  .join(', ')}
              </p>
              <p className="text-sm text-[var(--steel)]">
                Locatie: {locatie} · Startdatum: {datum} ({begintijd} – {eindtijd})
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setStep(1);
                }}
                className="inline-flex items-center h-12 px-6 border border-[var(--asphalt)] text-[var(--asphalt)] font-medium text-sm rounded-[2px] hover:bg-[var(--asphalt)] hover:text-[var(--paper)] transition-colors cursor-pointer"
              >
                Nieuwe aanvraag starten
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            {/* STEP 1: Services as Bordered Selectable Tiles (orange border + check when selected) */}
            {step === 1 && (
              <div className="space-y-8">
                <div>
                  <h2 className="font-display-expanded text-2xl md:text-3xl text-[var(--asphalt)]">
                    01 / WELKE DIENST(EN) HEEFT U NODIG?
                  </h2>
                  <p className="text-sm md:text-base text-[var(--steel)] mt-2">
                    U kunt één of meerdere diensten combineren voor uw project.
                  </p>
                  {errors.diensten && (
                    <p className="mt-3 text-xs font-mono text-[var(--signal-ink)]">
                      {errors.diensten}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {nl.services.map((service) => {
                    const isSelected = selectedSlugs.includes(service.slug);
                    return (
                      <button
                        key={service.slug}
                        type="button"
                        onClick={() => toggleService(service.slug)}
                        aria-pressed={isSelected}
                        className={`text-left p-5 rounded-[2px] border-2 transition-colors cursor-pointer flex items-start justify-between gap-4 ${
                          isSelected
                            ? 'border-[var(--signal)] bg-white'
                            : 'border-[var(--line)] bg-white/70 hover:border-[var(--asphalt)]/40 hover:bg-white'
                        }`}
                      >
                        <div>
                          <span className="font-mono-label text-[var(--steel)] block mb-1">
                            {service.number} · {service.groupLabel}
                          </span>
                          <p className="text-base font-semibold text-[var(--asphalt)]">
                            {service.title}
                          </p>
                          <p className="text-xs text-[var(--steel)] mt-1 line-clamp-2">
                            {service.shortDescription}
                          </p>
                        </div>

                        <span
                          className={`mt-0.5 w-6 h-6 rounded-[2px] border flex items-center justify-center shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-[var(--signal)] border-[var(--signal)] text-[var(--asphalt)]'
                              : 'border-[var(--line)] bg-[var(--paper)] text-transparent'
                          }`}
                        >
                          <Check size={15} strokeWidth={2.25} />
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="group inline-flex items-center justify-center h-[52px] px-8 bg-[var(--signal)] hover:bg-[var(--signal-hover)] text-[var(--asphalt)] font-semibold text-[15px] rounded-[2px] transition-colors cursor-pointer"
                  >
                    <span>Verder naar projectgegevens</span>
                    <ArrowRight
                      size={18}
                      strokeWidth={1.5}
                      className="ml-2 transition-transform duration-150 group-hover:translate-x-1"
                    />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Project Details */}
            {step === 2 && (
              <div className="bg-white border border-[var(--line)] rounded-[6px] p-6 md:p-10 space-y-6">
                <div>
                  <h2 className="font-display-expanded text-2xl md:text-3xl text-[var(--asphalt)]">
                    02 / PROJECTGEGEVENS & PLANNING
                  </h2>
                  <p className="text-sm text-[var(--steel)] mt-1">
                    Geef aan waar en wanneer de inzet plaatsvindt.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Locatie */}
                  <div>
                    <label
                      htmlFor="quote-locatie"
                      className="font-mono-label text-[var(--asphalt)] block mb-2"
                    >
                      PROJECTLOCATIE (ADRES OF POSTCODE) *
                    </label>
                    <input
                      id="quote-locatie"
                      type="text"
                      required
                      value={locatie}
                      onChange={(e) => setLocatie(e.target.value)}
                      placeholder="Bijv. Atoomweg Utrecht of N201"
                      className="w-full h-[56px] px-4 bg-white border border-[var(--line)] rounded-[2px] text-[15px] text-[var(--asphalt)]"
                    />
                    {errors.locatie && (
                      <p className="mt-1.5 text-xs font-mono text-[var(--signal-ink)]">
                        {errors.locatie}
                      </p>
                    )}
                  </div>

                  {/* Aantal verkeersregelaars */}
                  <div>
                    <label
                      htmlFor="quote-aantal"
                      className="font-mono-label text-[var(--asphalt)] block mb-2"
                    >
                      GEWENST AANTAL VERKEERSREGELAARS
                    </label>
                    <input
                      id="quote-aantal"
                      type="number"
                      min={1}
                      max={100}
                      value={aantalRegelaars}
                      onChange={(e) => setAantalRegelaars(e.target.value)}
                      className="w-full h-[56px] px-4 bg-white border border-[var(--line)] rounded-[2px] text-[15px] text-[var(--asphalt)]"
                    />
                  </div>
                </div>

                {/* Datum, Begintijd, Eindtijd */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <label
                      htmlFor="quote-datum"
                      className="font-mono-label text-[var(--asphalt)] block mb-2"
                    >
                      STARTDATUM *
                    </label>
                    <input
                      id="quote-datum"
                      type="date"
                      required
                      value={datum}
                      onChange={(e) => setDatum(e.target.value)}
                      className="w-full h-[56px] px-4 bg-white border border-[var(--line)] rounded-[2px] text-[15px] text-[var(--asphalt)]"
                    />
                    {errors.datum && (
                      <p className="mt-1.5 text-xs font-mono text-[var(--signal-ink)]">
                        {errors.datum}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="quote-begintijd"
                      className="font-mono-label text-[var(--asphalt)] block mb-2"
                    >
                      BEGINTIJD *
                    </label>
                    <input
                      id="quote-begintijd"
                      type="time"
                      required
                      value={begintijd}
                      onChange={(e) => setBegintijd(e.target.value)}
                      className="w-full h-[56px] px-4 bg-white border border-[var(--line)] rounded-[2px] text-[15px] text-[var(--asphalt)]"
                    />
                    {errors.begintijd && (
                      <p className="mt-1.5 text-xs font-mono text-[var(--signal-ink)]">
                        {errors.begintijd}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="quote-eindtijd"
                      className="font-mono-label text-[var(--asphalt)] block mb-2"
                    >
                      EINDTIJD *
                    </label>
                    <input
                      id="quote-eindtijd"
                      type="time"
                      required
                      value={eindtijd}
                      onChange={(e) => setEindtijd(e.target.value)}
                      className="w-full h-[56px] px-4 bg-white border border-[var(--line)] rounded-[2px] text-[15px] text-[var(--asphalt)]"
                    />
                    {errors.eindtijd && (
                      <p className="mt-1.5 text-xs font-mono text-[var(--signal-ink)]">
                        {errors.eindtijd}
                      </p>
                    )}
                  </div>
                </div>

                {/* Meerdaags Toggle + Einddatum */}
                <div className="p-4 bg-[var(--paper)] border border-[var(--line)] rounded-[2px] space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={meerdaags}
                      onChange={(e) => setMeerdaags(e.target.checked)}
                      className="w-5 h-5 accent-[var(--signal)] rounded-[2px]"
                    />
                    <span className="text-sm font-semibold text-[var(--asphalt)]">
                      Betreft dit een meerdaagse of langdurige inzet?
                    </span>
                  </label>

                  {meerdaags && (
                    <div className="max-w-xs pt-2">
                      <label
                        htmlFor="quote-einddatum"
                        className="font-mono-label text-[var(--asphalt)] block mb-2"
                      >
                        GEWENSTE EINDDATUM *
                      </label>
                      <input
                        id="quote-einddatum"
                        type="date"
                        value={einddatum}
                        onChange={(e) => setEinddatum(e.target.value)}
                        className="w-full h-[56px] px-4 bg-white border border-[var(--line)] rounded-[2px] text-[15px] text-[var(--asphalt)]"
                      />
                      {errors.einddatum && (
                        <p className="mt-1.5 text-xs font-mono text-[var(--signal-ink)]">
                          {errors.einddatum}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Soort werkzaamheden */}
                <div>
                  <label
                    htmlFor="quote-werkzaamheden"
                    className="font-mono-label text-[var(--asphalt)] block mb-2"
                  >
                    SOORT WERKZAAMHEDEN *
                  </label>
                  <input
                    id="quote-werkzaamheden"
                    type="text"
                    required
                    value={soortWerkzaamheden}
                    onChange={(e) => setSoortWerkzaamheden(e.target.value)}
                    placeholder="Bijv. asfaltonderhoud, kraanopstelling, kabelwerkzaamheden, evenement..."
                    className="w-full h-[56px] px-4 bg-white border border-[var(--line)] rounded-[2px] text-[15px] text-[var(--asphalt)]"
                  />
                  {errors.soortWerkzaamheden && (
                    <p className="mt-1.5 text-xs font-mono text-[var(--signal-ink)]">
                      {errors.soortWerkzaamheden}
                    </p>
                  )}
                </div>

                {/* Opmerkingen */}
                <div>
                  <label
                    htmlFor="quote-opmerkingen"
                    className="font-mono-label text-[var(--steel)] block mb-2"
                  >
                    AANVULLENDE OPMERKINGEN (OPTIONEEL)
                  </label>
                  <textarea
                    id="quote-opmerkingen"
                    rows={3}
                    value={opmerkingen}
                    onChange={(e) => setOpmerkingen(e.target.value)}
                    placeholder="Eventuele bijzonderheden over vergunningen, tekeningen of fasering..."
                    className="w-full p-4 bg-white border border-[var(--line)] rounded-[2px] text-[15px] text-[var(--asphalt)]"
                  />
                </div>

                <div className="pt-4 flex flex-wrap items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex items-center h-[52px] px-6 border border-[var(--line)] hover:border-[var(--asphalt)] text-[var(--asphalt)] font-medium text-[15px] rounded-[2px] transition-colors cursor-pointer"
                  >
                    <ArrowLeft size={18} strokeWidth={1.5} className="mr-2" />
                    <span>Vorige stap</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="group inline-flex items-center justify-center h-[52px] px-8 bg-[var(--signal)] hover:bg-[var(--signal-hover)] text-[var(--asphalt)] font-semibold text-[15px] rounded-[2px] transition-colors cursor-pointer"
                  >
                    <span>Verder naar contactgegevens</span>
                    <ArrowRight
                      size={18}
                      strokeWidth={1.5}
                      className="ml-2 transition-transform duration-150 group-hover:translate-x-1"
                    />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Contact Details */}
            {step === 3 && (
              <div className="bg-white border border-[var(--line)] rounded-[6px] p-6 md:p-10 space-y-6">
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

                <div>
                  <h2 className="font-display-expanded text-2xl md:text-3xl text-[var(--asphalt)]">
                    03 / UW CONTACTGEGEVENS
                  </h2>
                  <p className="text-sm text-[var(--steel)] mt-1">
                    Waar mogen wij het voorstel en de capaciteitsbevestiging naartoe sturen?
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="quote-naam"
                      className="font-mono-label text-[var(--asphalt)] block mb-2"
                    >
                      NAAM CONTACTPERSOON *
                    </label>
                    <input
                      id="quote-naam"
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
                      htmlFor="quote-organisatie"
                      className="font-mono-label text-[var(--asphalt)] block mb-2"
                    >
                      ORGANISATIE / BEDRIJF *
                    </label>
                    <input
                      id="quote-organisatie"
                      type="text"
                      required
                      value={organisatie}
                      onChange={(e) => setOrganisatie(e.target.value)}
                      placeholder="Naam aannemer, gemeente of bedrijf"
                      className="w-full h-[56px] px-4 bg-white border border-[var(--line)] rounded-[2px] text-[15px] text-[var(--asphalt)]"
                    />
                    {errors.organisatie && (
                      <p className="mt-1.5 text-xs font-mono text-[var(--signal-ink)]">
                        {errors.organisatie}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="quote-email"
                      className="font-mono-label text-[var(--asphalt)] block mb-2"
                    >
                      ZAKELIJK E-MAILADRES *
                    </label>
                    <input
                      id="quote-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="naam@bedrijf.nl"
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
                      htmlFor="quote-telefoon"
                      className="font-mono-label text-[var(--asphalt)] block mb-2"
                    >
                      TELEFOONNUMMER *
                    </label>
                    <input
                      id="quote-telefoon"
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

                <div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={privacyAccepted}
                      onChange={(e) => setPrivacyAccepted(e.target.checked)}
                      className="mt-1 w-5 h-5 accent-[var(--signal)] rounded-[2px]"
                    />
                    <span className="text-sm text-[var(--steel)]">
                      Ik ga akkoord met de verwerking van mijn gegevens conform de{' '}
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

                <div className="pt-4 flex flex-wrap items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="inline-flex items-center h-[52px] px-6 border border-[var(--line)] hover:border-[var(--asphalt)] text-[var(--asphalt)] font-medium text-[15px] rounded-[2px] transition-colors cursor-pointer"
                  >
                    <ArrowLeft size={18} strokeWidth={1.5} className="mr-2" />
                    <span>Vorige stap</span>
                  </button>

                  <button
                    type="submit"
                    className="group inline-flex items-center justify-center h-[52px] px-8 bg-[var(--signal)] hover:bg-[var(--signal-hover)] text-[var(--asphalt)] font-semibold text-[15px] rounded-[2px] transition-colors cursor-pointer"
                  >
                    <span>Offerteaanvraag versturen</span>
                    <ArrowRight
                      size={18}
                      strokeWidth={1.5}
                      className="ml-2 transition-transform duration-150 group-hover:translate-x-1"
                    />
                  </button>
                </div>
              </div>
            )}
          </form>
        )}
      </div>

      {/* Right 4 Columns: Sticky Side Panel ("Reactie binnen 24 uur" + Spoed-telefoon with barrier tape on top) */}
      <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
        {/* Card 1: Reactie binnen 24 uur */}
        <div className="bg-white border border-[var(--line)] rounded-[6px] p-6 md:p-8 space-y-4">
          <div className="inline-flex items-center gap-2 font-mono-label text-[var(--asphalt)]">
            <span className="w-2 h-2 rounded-full bg-[var(--ok)]" aria-hidden="true" />
            <span>{nl.offertePage.sidePanel.responseBadge}</span>
          </div>
          <h3 className="text-xl font-semibold text-[var(--asphalt)]">
            {nl.offertePage.sidePanel.responseTitle}
          </h3>
          <p className="text-sm text-[var(--steel)] leading-relaxed">
            {nl.offertePage.sidePanel.responseText}
          </p>
        </div>

        {/* Card 2: Urgent Spoed Bar with Signature Barrier Tape on Top Edge */}
        <div className="bg-[var(--asphalt)] text-[var(--paper)] rounded-[6px] border border-[var(--line-dark)] overflow-hidden">
          <div className="barrier-tape" aria-hidden="true" />
          <div className="p-6 md:p-8 space-y-4">
            <span className="font-mono-label text-[var(--signal)] block">
              {nl.offertePage.sidePanel.spoedBadge}
            </span>
            <h3 className="font-display-expanded text-2xl text-[var(--paper)]">
              {nl.offertePage.sidePanel.spoedTitle}
            </h3>
            <p className="text-sm text-[var(--steel-light)] leading-relaxed">
              {nl.offertePage.sidePanel.spoedText}
            </p>
            <div className="pt-2">
              <a
                href={getPhoneHref(company.phoneRaw)}
                className="w-full h-[52px] px-5 bg-[var(--signal)] hover:bg-[var(--signal-hover)] text-[var(--asphalt)] font-mono text-sm font-semibold rounded-[2px] flex items-center justify-center gap-2.5 transition-colors"
              >
                <Phone size={17} strokeWidth={1.75} />
                <span>24/7: {company.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Card 3: Job Seeker Link */}
        <div className="p-5 bg-white border border-[var(--line)] rounded-[6px] flex items-center justify-between gap-4">
          <div>
            <span className="font-mono-label text-[var(--steel)] block">
              ZELF VERKEERSREGELAAR WORDEN?
            </span>
            <Link
              href="/werken-bij"
              className="text-sm font-semibold text-[var(--asphalt)] hover:text-[var(--signal-ink)] underline underline-offset-4"
            >
              Bekijk vacatures & gratis opleiding →
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
}

export function QuoteRequestWizard() {
  return (
    <Suspense
      fallback={
        <div className="py-12 font-mono-label text-[var(--steel)]">
          FORMULIER LADEN...
        </div>
      }
    >
      <QuoteRequestWizardInner />
    </Suspense>
  );
}
