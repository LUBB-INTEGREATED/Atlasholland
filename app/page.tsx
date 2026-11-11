import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { company, getPhoneHref } from '@/src/config/company';
import { nl } from '@/src/content/nl';
import {
  LaneLineDivider,
  RevealBlock,
  RevealHeadlineLines,
  SectionIndex,
  VisibleGridLines,
} from '@/components/SignatureElements';
import { ServiceRowList } from '@/components/ServiceRowList';
import { StatBlockGrid } from '@/components/StatBlockGrid';
import {
  AudienceTabsSection,
  ClientsAndTestimonialsSection,
  HeroQuickRequestBar,
  NetherlandsCoverageSection,
} from '@/components/HomeInteractiveSections';

export default function HomePage() {
  const featuredServices = nl.services.filter((s) => s.featuredOnHome).slice(0, 6);
  const obtainedCertificates = company.certificates.filter((c) => c.obtained);
  const tickerItems = [...nl.home.ticker, ...nl.home.ticker];

  return (
    <div>
      {/* 1. HERO (Light): --paper, fits cleanly in first viewport with Header, Left 7 cols, Right 5 cols with Logo Arc Mask bleeding off right edge, Bottom Quick Request Strip */}
      <section className="relative bg-[var(--paper)] lg:min-h-[min(calc(100svh-80px),840px)] flex flex-col justify-between overflow-hidden border-b border-[var(--line)]">
        <VisibleGridLines dark={false} />

        {/* Main Hero Split: Left 7 Columns Typography & CTAs, Right 5 Columns Tall Photo Cropped by Logo Arc Mask Bleeding Right */}
        <div className="relative z-10 mx-auto max-w-[1360px] w-full px-4 md:px-6 flex-1 flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center w-full py-8 md:py-10 lg:py-8">
            {/* Left 7 Columns */}
            <div className="lg:col-span-7 space-y-5 md:space-y-6">
              {/* Mono Label: ATLAS HOLLAND B.V. — VERKEERSVEILIGHEID */}
              <div className="flex items-center gap-3">
                <span className="inline-block w-5 h-[2px] bg-[var(--signal)]" aria-hidden="true" />
                <span className="font-mono-label text-[var(--steel)]">
                  {nl.home.hero.monoLabel}
                </span>
              </div>

              {/* Display XL Headline on 3 lines: VEILIG / VERKEER. / GOED GEREGELD. with only GEREGELD. in --signal */}
              <h1 className="font-display-expanded text-display-xl text-[var(--asphalt)]">
                <RevealHeadlineLines
                  lines={[
                    <span key="l1">{nl.home.hero.headlineLine1}</span>,
                    <span key="l2">{nl.home.hero.headlineLine2}</span>,
                    <span key="l3">
                      {nl.home.hero.headlineLine3Prefix}
                      <span className="text-[var(--signal)]">
                        {nl.home.hero.headlineLine3Signal}
                      </span>
                    </span>,
                  ]}
                />
              </h1>

              {/* Lead Copy */}
              <p className="text-base sm:text-lg md:text-[1.25rem] leading-[1.6] text-[var(--steel)] max-w-[56ch]">
                {nl.home.hero.lead}
              </p>

              {/* Buttons: "Verkeersregelaars aanvragen →" and "Bekijk diensten" */}
              <div className="flex flex-wrap items-center gap-3.5 pt-1">
                <Link
                  href="/offerte-aanvragen"
                  className="group inline-flex items-center justify-center h-[52px] px-7 bg-[var(--signal)] hover:bg-[var(--signal-hover)] text-[var(--asphalt)] font-semibold text-[15px] rounded-[2px] transition-colors whitespace-nowrap shrink-0"
                >
                  <span>{nl.home.hero.primaryCta}</span>
                  <ArrowRight
                    size={18}
                    strokeWidth={1.5}
                    className="ml-2.5 transition-transform duration-150 group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  href="/diensten"
                  className="inline-flex items-center justify-center h-[52px] px-6 bg-white border border-[var(--asphalt)] text-[var(--asphalt)] hover:bg-[var(--asphalt)] hover:text-[var(--paper)] font-medium text-[15px] rounded-[2px] transition-colors whitespace-nowrap shrink-0"
                >
                  <span>{nl.home.hero.secondaryCta}</span>
                </Link>
              </div>
            </div>

            {/* Right 5 Columns: Tall Real Photo of a Traffic Controller, Cropped by Logo Arc Mask & Bleeding Off Right Edge */}
            <div className="lg:col-span-5 relative flex items-center">
              <div className="relative w-full lg:w-[calc(100%+8vw)] lg:mr-[-8vw]">
                <svg
                  viewBox="0 0 640 640"
                  className="w-full h-auto max-h-[540px] lg:max-h-[580px] block overflow-visible"
                  role="img"
                  aria-label={nl.home.hero.heroImageAlt}
                >
                  <defs>
                    {/* Signature 3: The Logo's Curved Swoosh as an SVG Mask Cropping the Hero Photo */}
                    <clipPath id="atlas-hero-arc-clip">
                      <path d="M 145,16 C 295,-12 515,12 640,85 L 640,630 L 105,630 C 16,515 -14,325 36,165 C 62,85 98,38 145,16 Z" />
                    </clipPath>
                  </defs>

                  {/* Signature 3: Thin 1px Orange Arc Line Echoing the Logo Swoosh */}
                  <path
                    d="M 126,10 C 86,44 38,105 14,188 C -24,338 6,515 88,630"
                    fill="none"
                    stroke="#FF6A00"
                    strokeWidth="1.5"
                  />

                  {/* Masked High-Resolution Documentary Photo */}
                  <g clipPath="url(#atlas-hero-arc-clip)">
                    {/* TODO: replace with real Atlas photo */}
                    <image
                      href={nl.home.hero.heroImage}
                      width="640"
                      height="640"
                      preserveAspectRatio="xMidYMin slice"
                    />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip across the width: Quick Request */}
        <div className="relative z-20">
          <HeroQuickRequestBar />
        </div>
      </section>

      {/* 2. TICKER on --asphalt: slow uppercase marquee */}
      <div
        aria-label="Kernexpertises Atlas Holland B.V."
        className="bg-[var(--asphalt)] text-[var(--paper)] border-b border-[var(--line-dark)] py-3.5 overflow-hidden select-none"
      >
        <div className="animate-atlas-marquee flex items-center">
          {tickerItems.map((item, idx) => (
            <div key={`${item}-${idx}`} className="flex items-center shrink-0">
              <span className="font-mono-label text-[var(--paper)] px-6 tracking-[0.14em]">
                {item}
              </span>
              <span className="text-[var(--steel-light)]" aria-hidden="true">
                —
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. 01 — DIENSTEN: Left 4 columns sticky, Right 8 columns 6 service rows */}
      <section className="py-[clamp(80px,10vw,160px)] bg-[var(--paper)]">
        <div className="mx-auto max-w-[1360px] px-4 md:px-6">
          <SectionIndex
            code={nl.home.sections.services.index}
            note={nl.home.sections.services.note}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left 4 Columns Sticky */}
            <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
              <h2 className="font-display-expanded text-display-h2 text-[var(--asphalt)] text-balance">
                {nl.home.sections.services.headline}
              </h2>
              <p className="text-base md:text-lg text-[var(--steel)] leading-relaxed">
                {nl.home.sections.services.description}
              </p>
              <div className="pt-2 space-y-4">
                <Link
                  href="/diensten"
                  className="group inline-flex items-center font-semibold text-base text-[var(--asphalt)] hover:text-[var(--signal-ink)] border-b-2 border-[var(--asphalt)] hover:border-[var(--signal)] pb-1 transition-colors"
                >
                  <span>{nl.home.sections.services.allServicesLink}</span>
                  <ArrowRight
                    size={18}
                    strokeWidth={1.5}
                    className="ml-2 transition-transform duration-150 group-hover:translate-x-1"
                  />
                </Link>

                <div className="pt-4 border-t border-[var(--line)]">
                  <Link
                    href="/werken-bij"
                    className="font-mono-label text-[var(--steel)] hover:text-[var(--asphalt)] transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>{nl.home.sections.services.recruitCallout}</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right 8 Columns: 6 Service Rows */}
            <div className="lg:col-span-8">
              <RevealBlock>
                <ServiceRowList services={featuredServices} />
              </RevealBlock>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 02 — IN CIJFERS (Dark): 4 stat blocks with count-up, then full-bleed photo strip */}
      <section className="relative bg-[var(--asphalt)] text-[var(--paper)] pt-[clamp(80px,10vw,140px)] overflow-hidden">
        <VisibleGridLines dark={true} />

        <div className="relative z-10 mx-auto max-w-[1360px] px-4 md:px-6 pb-16 md:pb-24">
          <SectionIndex
            code={nl.home.sections.stats.index}
            note={nl.home.sections.stats.note}
            dark={true}
          />

          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="font-display-expanded text-display-h2 text-[var(--paper)]">
              {nl.home.sections.stats.headline}
            </h2>
            <Link
              href="/offerte-aanvragen"
              className="group inline-flex items-center h-[52px] px-6 bg-[var(--signal)] hover:bg-[var(--signal-hover)] text-[var(--asphalt)] font-semibold text-[15px] rounded-[2px] transition-colors whitespace-nowrap shrink-0"
            >
              <span>Direct capaciteit aanvragen</span>
              <ArrowRight
                size={18}
                strokeWidth={1.5}
                className="ml-2 transition-transform duration-150 group-hover:translate-x-1"
              />
            </Link>
          </div>

          <StatBlockGrid stats={company.stats} dark={true} />
        </div>

        {/* Full-Bleed Photo Strip */}
        <div className="relative w-full aspect-[21/8] min-h-[260px] max-h-[520px] border-t border-b border-[var(--line-dark)] overflow-hidden bg-[var(--asphalt-2)]">
          {/* TODO: replace with real Atlas photo */}
          <img
            src={nl.home.sections.stats.stripImage}
            alt={nl.home.sections.stats.stripImageAlt}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[var(--asphalt)] via-[var(--asphalt)]/60 to-transparent py-4 px-4 md:px-6">
            <div className="mx-auto max-w-[1360px] flex items-center justify-between">
              <span className="font-mono-label text-[var(--paper)]">
                {nl.home.sections.stats.stripCaption}
              </span>
              <span className="font-mono-label text-[var(--steel-light)] hidden sm:inline">
                NL · 24/7 OPERATIONEEL
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. 03 — WERKWIJZE: Three steps on one dashed lane line that draws on scroll */}
      <section className="py-[clamp(80px,10vw,160px)] bg-[var(--paper)]">
        <div className="mx-auto max-w-[1360px] px-4 md:px-6">
          <SectionIndex
            code={nl.home.sections.process.index}
            note={nl.home.sections.process.note}
          />

          <h2 className="font-display-expanded text-display-h2 text-[var(--asphalt)] mb-12 md:mb-16">
            {nl.home.sections.process.headline}
          </h2>

          {/* Signature 1: Dashed 2px Lane Line Timeline Connector that draws on scroll */}
          <div className="mb-8">
            <LaneLineDivider dark={false} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {nl.home.sections.process.steps.map((step, idx) => (
              <RevealBlock
                key={step.number}
                delay={idx * 0.06}
                className="pt-2 md:pr-6 border-t md:border-t-0 border-[var(--line)] first:border-t-0"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono-label px-2.5 py-1 border border-[var(--asphalt)] text-[var(--asphalt)] rounded-[2px]">
                    STAP {step.number}
                  </span>
                  <span className="font-mono-label text-[var(--steel)]">
                    {step.subtitle}
                  </span>
                </div>
                <h3 className="text-[1.375rem] font-semibold text-[var(--asphalt)] mb-3">
                  {step.title}
                </h3>
                <p className="text-base text-[var(--steel)] leading-relaxed">
                  {step.description}
                </p>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      <LaneLineDivider dark={false} />

      {/* 6. 04 — VOOR WIE: Tabs Gemeenten · Aannemers · Nutsbedrijven · Evenementen */}
      <section className="py-[clamp(80px,10vw,160px)] bg-[var(--paper)]">
        <div className="mx-auto max-w-[1360px] px-4 md:px-6">
          <SectionIndex
            code={nl.home.sections.audiences.index}
            note={nl.home.sections.audiences.note}
          />

          <div className="mb-10">
            <h2 className="font-display-expanded text-display-h2 text-[var(--asphalt)]">
              {nl.home.sections.audiences.headline}
            </h2>
          </div>

          <AudienceTabsSection tabs={nl.home.sections.audiences.tabs} />
        </div>
      </section>

      {/* 7. 05 — WAAROM ATLAS: Left large H2 statement, Right numbered list with hairlines */}
      <section className="py-[clamp(80px,10vw,160px)] bg-white border-t border-b border-[var(--line)]">
        <div className="mx-auto max-w-[1360px] px-4 md:px-6">
          <SectionIndex
            code={nl.home.sections.whyAtlas.index}
            note={nl.home.sections.whyAtlas.note}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left 6 Columns: Large H2 Statement */}
            <div className="lg:col-span-6 space-y-6">
              <h2 className="font-display-expanded text-display-h2 text-[var(--asphalt)] text-balance">
                {nl.home.sections.whyAtlas.headline}
              </h2>
              <p className="text-lg text-[var(--steel)] max-w-xl leading-relaxed">
                {nl.home.sections.whyAtlas.lead}
              </p>
              <div className="pt-2">
                <Link
                  href="/over-ons"
                  className="group inline-flex items-center font-semibold text-base text-[var(--asphalt)] hover:text-[var(--signal-ink)] border-b-2 border-[var(--asphalt)] hover:border-[var(--signal)] pb-1 transition-colors"
                >
                  <span>Meer over onze aanpak</span>
                  <ArrowRight
                    size={18}
                    strokeWidth={1.5}
                    className="ml-2 transition-transform duration-150 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>

            {/* Right 6 Columns: Numbered List with Hairlines */}
            <div className="lg:col-span-6 border-t border-[var(--line)]">
              {nl.home.sections.whyAtlas.items.map((item, idx) => (
                <RevealBlock
                  key={item.number}
                  delay={idx * 0.06}
                  className="py-6 md:py-7 border-b border-[var(--line)] grid grid-cols-12 gap-4 items-start"
                >
                  <div className="col-span-2 sm:col-span-2">
                    <span className="font-mono-label text-[var(--signal-ink)]">
                      {item.number}
                    </span>
                  </div>
                  <div className="col-span-10 sm:col-span-10">
                    <h3 className="text-[1.375rem] font-semibold text-[var(--asphalt)] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-base text-[var(--steel)] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </RevealBlock>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. 06 — LANDELIJK INZETBAAR: Hairline SVG outline of the Netherlands with orange dots on regions */}
      <section className="py-[clamp(80px,10vw,160px)] bg-[var(--paper)] border-b border-[var(--line)]">
        <div className="mx-auto max-w-[1360px] px-4 md:px-6">
          <SectionIndex
            code={nl.home.sections.coverage.index}
            note={nl.home.sections.coverage.note}
          />
          <NetherlandsCoverageSection />
        </div>
      </section>

      {/* 9. 07 — KWALITEIT: One row of certificates: mono code, name, one line, separated by vertical hairlines */}
      {obtainedCertificates.length > 0 && (
        <section className="py-20 md:py-28 bg-[var(--paper)] border-b border-[var(--line)]">
          <div className="mx-auto max-w-[1360px] px-4 md:px-6">
            <SectionIndex
              code={nl.home.sections.quality.index}
              note={nl.home.sections.quality.note}
            />

            <h2 className="font-display-expanded text-display-h2 text-[var(--asphalt)] mb-12">
              {nl.home.sections.quality.headline}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border-t border-b border-[var(--line)]">
              {obtainedCertificates.map((cert, idx) => (
                <div
                  key={cert.code}
                  className={`py-7 ${
                    idx > 0
                      ? 'sm:pl-6 border-t sm:border-t-0 lg:border-l border-[var(--line)]'
                      : ''
                  } ${idx < obtainedCertificates.length - 1 ? 'sm:pr-6' : ''}`}
                >
                  <span className="inline-block font-mono-label text-[var(--asphalt)] border border-[var(--asphalt)] px-2.5 py-1 rounded-[2px] mb-4">
                    {cert.code}
                  </span>
                  <h3 className="text-lg font-semibold text-[var(--asphalt)] mb-1.5">
                    {cert.name}
                  </h3>
                  <p className="text-sm text-[var(--steel)] leading-relaxed">
                    {cert.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 10. OPDRACHTGEVERS & ERVARINGEN (Hides automatically when lists are empty) */}
      <ClientsAndTestimonialsSection />

      {/* 11. WERKEN BIJ (Dark): Full-bleed photo with gradient, H2 "WORD VERKEERSREGELAAR.", 3 benefits in mono, button "Bekijk vacatures →" */}
      <section className="relative bg-[var(--asphalt)] text-[var(--paper)] py-[clamp(80px,10vw,160px)] overflow-hidden border-b border-[var(--line-dark)]">
        {/* Full-bleed photo with measured contrast gradient */}
        <div className="absolute inset-0 z-0">
          {/* TODO: replace with real Atlas photo */}
          <img
            src={nl.home.sections.careers.bgImage}
            alt={nl.home.sections.careers.bgImageAlt}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--asphalt)] via-[var(--asphalt)]/90 to-[var(--asphalt)]/45" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1360px] px-4 md:px-6">
          <SectionIndex
            code={nl.home.sections.careers.index}
            note={nl.home.sections.careers.note}
            dark={true}
          />

          <div className="max-w-3xl space-y-8">
            <h2 className="font-display-expanded text-display-h1 text-[var(--paper)]">
              {nl.home.sections.careers.headline}
            </h2>

            <p className="text-lg md:text-xl text-[var(--steel-light)] leading-relaxed max-w-2xl">
              {nl.home.sections.careers.lead}
            </p>

            {/* 3 Benefits in Mono */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {nl.home.sections.careers.benefits.map((benefit, idx) => (
                <span
                  key={benefit}
                  className="font-mono-label text-[var(--paper)] border border-[var(--line-dark)] bg-[var(--asphalt-2)]/90 px-3.5 py-2 rounded-[2px]"
                >
                  0{idx + 1} · {benefit}
                </span>
              ))}
            </div>

            <div className="pt-4">
              <Link
                href={nl.home.sections.careers.ctaHref}
                className="group inline-flex items-center justify-center h-[52px] px-7 bg-[var(--signal)] hover:bg-[var(--signal-hover)] text-[var(--asphalt)] font-semibold text-[15px] rounded-[2px] transition-colors whitespace-nowrap"
              >
                <span>{nl.home.sections.careers.ctaLabel}</span>
                <ArrowRight
                  size={18}
                  strokeWidth={1.5}
                  className="ml-2 transition-transform duration-150 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 12. CLOSING CTA: Centred H2 "VERKEERSREGELAARS NODIG?", primary button, phone number in Display size (clickable) */}
      <section className="py-[clamp(80px,10vw,160px)] bg-[var(--paper)]">
        <div className="mx-auto max-w-[1360px] px-4 md:px-6 text-center">
          <p className="font-mono-label text-[var(--steel)] mb-4">
            {nl.home.sections.closingCta.monoLabel}
          </p>

          <h2 className="font-display-expanded text-display-h1 text-[var(--asphalt)] max-w-4xl mx-auto text-balance">
            {nl.home.sections.closingCta.headline}
          </h2>

          <p className="mt-5 text-lg text-[var(--steel)] max-w-xl mx-auto">
            {nl.home.sections.closingCta.subtext}
          </p>

          {/* Phone Number in Display Size (Clickable) */}
          <div className="my-10 md:my-12">
            <a
              href={getPhoneHref(company.phoneRaw)}
              className="inline-block font-display-expanded text-[clamp(2.25rem,5.5vw,5rem)] text-[var(--asphalt)] hover:text-[var(--signal-ink)] transition-colors border-b-2 border-[var(--line)] hover:border-[var(--signal)] pb-2"
            >
              {company.phoneDisplay}
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/offerte-aanvragen"
              className="group inline-flex items-center justify-center h-[52px] px-8 bg-[var(--signal)] hover:bg-[var(--signal-hover)] text-[var(--asphalt)] font-semibold text-[15px] rounded-[2px] transition-colors whitespace-nowrap"
            >
              <span>{nl.home.sections.closingCta.primaryCta}</span>
              <ArrowRight
                size={18}
                strokeWidth={1.5}
                className="ml-2 transition-transform duration-150 group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/werken-bij"
              className="inline-flex items-center justify-center h-[52px] px-6 border border-[var(--asphalt)] text-[var(--asphalt)] hover:bg-[var(--asphalt)] hover:text-[var(--paper)] font-medium text-[15px] rounded-[2px] transition-colors whitespace-nowrap"
            >
              <span>{nl.home.sections.closingCta.secondaryCta}</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
