'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { nl, TargetAudienceTab } from '@/src/content/nl';
import { company, getPhoneHref } from '@/src/config/company';

export function HeroQuickRequestBar() {
  const router = useRouter();
  const [dienst, setDienst] = useState(nl.services[0].slug);
  const [datum, setDatum] = useState('');
  const [postcode, setPostcode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (dienst) params.set('dienst', dienst);
    if (datum) params.set('datum', datum);
    if (postcode.trim()) params.set('locatie', postcode.trim());
    router.push(`/offerte-aanvragen?${params.toString()}`);
  };

  return (
    <div className="w-full border-t border-[var(--line)] bg-[var(--cream)]/60 backdrop-blur-sm">
      <div className="mx-auto max-w-[1360px] px-4 md:px-6 py-3.5 lg:py-4">
        <form
          onSubmit={handleSubmit}
          aria-label="Snel verkeersregelaars of offerte aanvragen"
          className="grid grid-cols-1 md:grid-cols-12 gap-3 lg:gap-4 items-end"
        >
          {/* Dienst */}
          <div className="md:col-span-3">
            <label
              htmlFor="quick-dienst"
              className="font-mono-label text-[var(--blue)] block mb-1 font-semibold"
            >
              {nl.home.hero.quickRequest.serviceLabel}
            </label>
            <select
              id="quick-dienst"
              value={dienst}
              onChange={(e) => setDienst(e.target.value)}
              className="w-full h-[50px] px-3.5 bg-white border border-[var(--line)] rounded-[2px] text-[15px] text-[var(--asphalt)] font-medium focus:outline-none focus:border-[var(--signal)] focus:ring-1 focus:ring-[var(--signal)]"
            >
              {nl.services.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.number} — {s.title}
                </option>
              ))}
            </select>
          </div>

          {/* Datum */}
          <div className="md:col-span-2">
            <label
              htmlFor="quick-datum"
              className="font-mono-label text-[var(--blue)] block mb-1 font-semibold"
            >
              {nl.home.hero.quickRequest.dateLabel}
            </label>
            <input
              id="quick-datum"
              type="date"
              value={datum}
              onChange={(e) => setDatum(e.target.value)}
              className="w-full h-[50px] px-3 bg-white border border-[var(--line)] rounded-[2px] text-[15px] text-[var(--asphalt)] font-medium focus:outline-none focus:border-[var(--signal)] focus:ring-1 focus:ring-[var(--signal)]"
            />
          </div>

          {/* Postcode */}
          <div className="md:col-span-3">
            <label
              htmlFor="quick-postcode"
              className="font-mono-label text-[var(--blue)] block mb-1 font-semibold"
            >
              {nl.home.hero.quickRequest.postalCodeLabel}
            </label>
            <input
              id="quick-postcode"
              type="text"
              placeholder={nl.home.hero.quickRequest.postalCodePlaceholder}
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              className="w-full h-[50px] px-3.5 bg-white border border-[var(--line)] rounded-[2px] text-[15px] text-[var(--asphalt)] placeholder:text-[var(--steel)]/60 focus:outline-none focus:border-[var(--signal)] focus:ring-1 focus:ring-[var(--signal)]"
            />
          </div>

          {/* Submit + Far Right: Green Dot + "Planning nu bereikbaar" */}
          <div className="md:col-span-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <button
              type="submit"
              className="group h-[50px] px-6 bg-[var(--signal)] hover:bg-[var(--signal-hover)] text-[var(--asphalt)] font-semibold text-[15px] rounded-[2px] inline-flex items-center justify-center transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>{nl.home.hero.quickRequest.submitLabel}</span>
              <ArrowRight
                size={18}
                strokeWidth={1.5}
                className="ml-2 transition-transform duration-150 group-hover:translate-x-1"
              />
            </button>

            <div className="flex items-center gap-2 sm:justify-end py-1">
              <span
                className="w-2 h-2 rounded-full bg-[var(--ok)] shrink-0"
                aria-hidden="true"
              />
              <span className="font-mono-label text-[var(--asphalt)] whitespace-nowrap">
                {nl.home.hero.quickRequest.onlineStatus}
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export function AudienceTabsSection({ tabs }: { tabs: TargetAudienceTab[] }) {
  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id || 'gemeenten');
  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowRight') {
      const next = tabs[(index + 1) % tabs.length];
      setActiveTabId(next.id);
    } else if (e.key === 'ArrowLeft') {
      const prev = tabs[(index - 1 + tabs.length) % tabs.length];
      setActiveTabId(prev.id);
    }
  };

  return (
    <div>
      {/* Accessible Tab Bar */}
      <div
        role="tablist"
        aria-label="Opdrachtgevers categorieën"
        className="flex flex-wrap border-b border-[var(--line)] mb-10 gap-2 sm:gap-6"
      >
        {tabs.map((tab, idx) => {
          const isSelected = tab.id === activeTab.id;
          return (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              role="tab"
              type="button"
              aria-selected={isSelected}
              aria-controls={`panel-${tab.id}`}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => setActiveTabId(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={`pb-4 px-1 text-base md:text-lg font-semibold transition-colors whitespace-nowrap shrink-0 border-b-2 -mb-px cursor-pointer ${
                isSelected
                  ? 'border-[var(--signal)] text-[var(--asphalt)]'
                  : 'border-transparent text-[var(--steel)] hover:text-[var(--asphalt)]'
              }`}
            >
              <span className="font-mono-label text-[var(--steel)] mr-2">
                0{idx + 1}
              </span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Tab Panel: Large Photo Left (6 cols), Text + 3 Check Items + CTA Right (6 cols) */}
      <div
        id={`panel-${activeTab.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeTab.id}`}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch"
      >
        <div className="lg:col-span-6 overflow-hidden rounded-[6px] border border-[var(--line)] bg-[var(--asphalt)] aspect-[4/3] lg:aspect-auto min-h-[320px]">
          {/* TODO: replace with real Atlas photo */}
          <img
            src={activeTab.image}
            alt={activeTab.imageAlt}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-103"
          />
        </div>

        <div className="lg:col-span-6 flex flex-col justify-between py-2">
          <div>
            <p className="font-mono-label text-[var(--steel)] mb-3">
              {activeTab.code}
            </p>
            <h3 className="font-display-expanded text-[clamp(1.75rem,3vw,2.65rem)] text-[var(--asphalt)] mb-5">
              {activeTab.headline}
            </h3>
            <p className="text-base md:text-lg text-[var(--steel)] leading-relaxed mb-8">
              {activeTab.description}
            </p>

            <ul className="space-y-3.5 border-t border-[var(--line)] pt-6">
              {activeTab.checkItems.map((item) => (
                <li key={item} className="flex items-start gap-3.5">
                  <span className="mt-1 w-5 h-5 rounded-[2px] border border-[var(--asphalt)] flex items-center justify-center shrink-0 text-[var(--asphalt)]">
                    <Check size={13} strokeWidth={2} />
                  </span>
                  <span className="text-[15px] md:text-base font-medium text-[var(--asphalt)]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-8 mt-8 border-t border-[var(--line)] flex flex-wrap items-center gap-4">
            <Link
              href={activeTab.ctaHref}
              className="group inline-flex items-center h-[52px] px-6 bg-[var(--signal)] hover:bg-[var(--signal-hover)] text-[var(--asphalt)] font-semibold text-[15px] rounded-[2px] transition-colors whitespace-nowrap"
            >
              <span>{activeTab.ctaLabel}</span>
              <ArrowRight
                size={18}
                strokeWidth={1.5}
                className="ml-2 transition-transform duration-150 group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="/diensten"
              className="inline-flex items-center h-[52px] px-5 border border-[var(--line)] hover:border-[var(--asphalt)] text-[var(--asphalt)] font-medium text-[15px] rounded-[2px] transition-colors whitespace-nowrap bg-white"
            >
              <span>Alle diensten bekijken</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export function NetherlandsCoverageSection() {
  const [selectedRegion, setSelectedRegion] = useState(company.regions[0]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
      {/* Left 5 Columns: Hairline SVG Outline of the Netherlands with Orange Dots on Regions */}
      <div className="lg:col-span-5 bg-white border border-[var(--line)] rounded-[6px] p-6 md:p-8 relative">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--line)]">
          <span className="font-mono-label text-[var(--steel)]">
            DEKKINGSKAART — NL
          </span>
          <span className="font-mono-label text-[var(--signal-ink)]">
            12 PROVINCIES · 24/7
          </span>
        </div>

        <div className="relative aspect-[4/5] w-full max-w-[380px] mx-auto">
          <svg
            viewBox="0 0 100 115"
            fill="none"
            aria-label="Kaart van Nederland met regionale steunpunten van Atlas Holland B.V."
            className="w-full h-full"
          >
            {/* Technical Coordinate Grid Lines */}
            <g stroke="var(--line)" strokeWidth="0.3">
              <line x1="0" y1="25" x2="100" y2="25" />
              <line x1="0" y1="50" x2="100" y2="50" />
              <line x1="0" y1="75" x2="100" y2="75" />
              <line x1="0" y1="100" x2="100" y2="100" />
              <line x1="25" y1="0" x2="25" y2="115" />
              <line x1="50" y1="0" x2="50" y2="115" />
              <line x1="75" y1="0" x2="75" y2="115" />
            </g>

            {/* Stylized Architectural Hairline Outline of the Netherlands */}
            <path
              d="M58,12 L78,10 L86,18 L84,32 L78,36 L82,48 L76,58 L72,62 L70,76 L68,94 L60,96 L58,84 L48,79 L32,76 L20,72 L24,62 L32,54 L36,42 L40,26 L48,24 L46,36 L54,38 L58,26 Z"
              fill="var(--cream)"
              stroke="var(--asphalt)"
              strokeWidth="0.9"
            />
            {/* Wadden Islands Hairline */}
            <path
              d="M38,20 L42,17 M46,15 L52,13 M56,11 L63,10 M67,9 L73,9"
              stroke="var(--asphalt)"
              strokeWidth="0.9"
              strokeLinecap="round"
            />

            {/* Connecting Infrastructure Lines */}
            <g stroke="var(--steel)" strokeWidth="0.4" strokeDasharray="2 2" opacity="0.45">
              {company.regions.map((reg) => (
                <line
                  key={`line-${reg.id}`}
                  x1={company.regions[0].x}
                  y1={company.regions[0].y}
                  x2={reg.x}
                  y2={reg.y}
                />
              ))}
            </g>

            {/* Region Signal Nodes */}
            {company.regions.map((region) => {
              const isSelected = selectedRegion.id === region.id;
              return (
                <g
                  key={region.id}
                  onClick={() => setSelectedRegion(region)}
                  className="cursor-pointer"
                >
                  {isSelected && (
                    <circle
                      cx={region.x}
                      cy={region.y}
                      r="5"
                      fill="none"
                      stroke="var(--signal)"
                      strokeWidth="0.7"
                    />
                  )}
                  <circle
                    cx={region.x}
                    cy={region.y}
                    r={isSelected ? '2.6' : '2'}
                    fill="var(--signal)"
                  />
                </g>
              );
            })}
          </svg>
        </div>

        {/* Active Region Readout */}
        <div className="mt-4 pt-4 border-t border-[var(--line)] flex items-center justify-between gap-4">
          <div>
            <span className="font-mono-label text-[var(--steel)] block">
              ACTIEVE REGIO
            </span>
            <span className="text-sm font-semibold text-[var(--asphalt)]">
              {selectedRegion.name} ({selectedRegion.city})
            </span>
          </div>
          <span className="font-mono-label text-[var(--asphalt)] border border-[var(--line)] px-2.5 py-1 rounded-[2px] bg-[var(--paper)] shrink-0">
            SPOED: {selectedRegion.responseMinutes}
          </span>
        </div>
      </div>

      {/* Right 7 Columns: Text, Region Selector List, and 24/7 Number */}
      <div className="lg:col-span-7 space-y-8">
        <div>
          <h2 className="font-display-expanded text-display-h2 text-[var(--asphalt)] text-balance">
            {nl.home.sections.coverage.headline}
          </h2>
          <p className="mt-4 text-lg text-[var(--steel)] max-w-2xl">
            {nl.home.sections.coverage.description}
          </p>
        </div>

        {/* Region Buttons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {company.regions.map((reg) => {
            const active = selectedRegion.id === reg.id;
            return (
              <button
                key={reg.id}
                type="button"
                onClick={() => setSelectedRegion(reg)}
                className={`text-left p-3.5 rounded-[2px] border transition-colors cursor-pointer flex items-center justify-between ${
                  active
                    ? 'bg-white border-[var(--asphalt)] text-[var(--asphalt)]'
                    : 'bg-transparent border-[var(--line)] text-[var(--steel)] hover:border-[var(--asphalt)]/40 hover:text-[var(--asphalt)]'
                }`}
              >
                <div>
                  <p className="text-sm font-semibold text-[var(--asphalt)]">
                    {reg.name}
                  </p>
                  <p className="font-mono text-xs text-[var(--steel)] mt-0.5">
                    {reg.city}
                  </p>
                </div>
                <span className="font-mono-label text-[var(--steel)]">
                  {reg.responseMinutes}
                </span>
              </button>
            );
          })}
        </div>

        {/* 24/7 Direct Dispatch Bar */}
        <div className="p-6 bg-white border border-[var(--line)] rounded-[6px] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <p className="font-mono-label text-[var(--steel)]">
              {nl.home.sections.coverage.emergencyLabel}
            </p>
            <a
              href={getPhoneHref(company.phoneRaw)}
              className="mt-1 inline-block font-display-expanded text-2xl md:text-3xl text-[var(--asphalt)] hover:text-[var(--signal-ink)] transition-colors"
            >
              {company.phoneDisplay}
            </a>
          </div>

          <Link
            href="/offerte-aanvragen"
            className="group inline-flex items-center justify-center h-[52px] px-6 bg-[var(--signal)] hover:bg-[var(--signal-hover)] text-[var(--asphalt)] font-semibold text-[15px] rounded-[2px] transition-colors whitespace-nowrap shrink-0"
          >
            <span>{nl.home.sections.coverage.ctaLabel}</span>
            <ArrowRight
              size={18}
              strokeWidth={1.5}
              className="ml-2 transition-transform duration-150 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export function ClientsAndTestimonialsSection() {
  const [index, setIndex] = useState(0);
  const hasLogos = company.clientLogos && company.clientLogos.length > 0;
  const hasTestimonials = company.testimonials && company.testimonials.length > 0;

  // Rule: "The logo row and testimonials section hide when their lists are empty (ship them empty)."
  if (!hasLogos && !hasTestimonials) {
    return null;
  }

  const currentQuote = hasTestimonials ? company.testimonials[index] : null;

  return (
    <section className="py-20 md:py-32 border-b border-[var(--line)] bg-[var(--paper)]">
      <div className="mx-auto max-w-[1360px] px-4 md:px-6">
        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono-label text-[var(--asphalt)]">
            {nl.home.sections.testimonials.index}
          </span>
          <div className="h-px flex-1 bg-[var(--line)]" />
          <span className="font-mono-label text-[var(--steel)]">
            {nl.home.sections.testimonials.note}
          </span>
        </div>

        {hasLogos && (
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6 py-8 border-t border-b border-[var(--line)] mb-12">
            {company.clientLogos.map((logo) => (
              <div
                key={logo.name}
                className="flex items-center justify-center grayscale opacity-75 hover:opacity-100 transition-opacity"
              >
                <span className="font-mono-label text-[var(--steel)]">
                  {logo.name}
                </span>
              </div>
            ))}
          </div>
        )}

        {currentQuote && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-9">
              <blockquote className="text-2xl md:text-4xl font-semibold text-[var(--asphalt)] leading-tight">
                “{currentQuote.quote}”
              </blockquote>
              <div className="mt-6 font-mono-label text-[var(--steel)]">
                {currentQuote.author} — {currentQuote.role},{' '}
                {currentQuote.organisation}
              </div>
            </div>
            {company.testimonials.length > 1 && (
              <div className="lg:col-span-3 flex items-center lg:justify-end gap-3">
                <button
                  type="button"
                  aria-label="Vorige referentie"
                  onClick={() =>
                    setIndex(
                      (prev) =>
                        (prev - 1 + company.testimonials.length) %
                        company.testimonials.length
                    )
                  }
                  className="w-12 h-12 border border-[var(--line)] rounded-[2px] flex items-center justify-center hover:border-[var(--asphalt)]"
                >
                  <ArrowLeft size={18} strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  aria-label="Volgende referentie"
                  onClick={() =>
                    setIndex((prev) => (prev + 1) % company.testimonials.length)
                  }
                  className="w-12 h-12 border border-[var(--line)] rounded-[2px] flex items-center justify-center hover:border-[var(--asphalt)]"
                >
                  <ArrowRight size={18} strokeWidth={1.5} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
