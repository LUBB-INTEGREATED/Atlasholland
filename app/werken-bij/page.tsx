import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { nl } from '@/src/content/nl';
import { company, getMailHref, getPhoneHref } from '@/src/config/company';
import { InnerPageHero } from '@/components/InnerPageHero';
import { LaneLineDivider, SectionIndex } from '@/components/SignatureElements';
import { FaqAccordion } from '@/components/FaqAccordion';
import { JobApplicationForm } from '@/components/JobApplicationForm';

export const metadata: Metadata = {
  title: 'Werken bij — Vacatures Verkeersregelaar & Bouwportier',
  description:
    'Word beroepsverkeersregelaar of bouwportier bij Atlas Holland B.V. Geen ervaring? Wij leiden je gratis op. Bekijk onze vacatures en solliciteer direct.',
  openGraph: {
    title: `Werken bij ${company.name} — Vacatures & Gratis Opleiding`,
    description: nl.werkenBijPage.lead,
  },
};

export default function WerkenBijPage() {
  return (
    <div>
      <InnerPageHero
        breadcrumb={nl.werkenBijPage.breadcrumb}
        h1={
          <>
            <span className="block">{nl.werkenBijPage.h1Line1}</span>
            <span className="block">{nl.werkenBijPage.h1Line2}</span>
          </>
        }
        subHeadline={nl.werkenBijPage.subHeadline}
        lead={nl.werkenBijPage.lead}
        image={nl.werkenBijPage.heroImage}
        imageAlt={nl.werkenBijPage.heroImageAlt}
        primaryCta={{
          label: 'Direct solliciteren',
          href: '#solliciteren',
        }}
        secondaryCta={{
          label: 'Verkeersregelaars inhuren?',
          href: '/offerte-aanvragen',
        }}
      />

      {/* 01 — Benefits as a Numbered List */}
      <section className="py-[clamp(80px,10vw,140px)] bg-[var(--paper)] border-b border-[var(--line)]">
        <div className="mx-auto max-w-[1360px] px-4 md:px-6">
          <SectionIndex
            code={nl.werkenBijPage.benefitsSection.index}
            note={nl.werkenBijPage.benefitsSection.note}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-4">
              <h2 className="font-display-expanded text-display-h2 text-[var(--asphalt)] text-balance">
                {nl.werkenBijPage.benefitsSection.headline}
              </h2>
              <p className="text-base md:text-lg text-[var(--steel)]">
                Bij Atlas Holland sta je er nooit alleen voor. Wij zorgen voor een erkend diploma, een goed salaris en werkkleding waarin je elk seizoen comfortabel staat.
              </p>
            </div>

            <div className="lg:col-span-7 border-t border-[var(--line)]">
              {nl.werkenBijPage.benefitsSection.items.map((item) => (
                <div
                  key={item.number}
                  className="py-7 border-b border-[var(--line)] grid grid-cols-12 gap-4 items-start"
                >
                  <div className="col-span-2">
                    <span className="font-mono-label text-[var(--signal-ink)]">
                      {item.number}
                    </span>
                  </div>
                  <div className="col-span-10">
                    <h3 className="text-[1.375rem] font-semibold text-[var(--asphalt)] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-base text-[var(--steel)] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 02 — Vacancy Rows (title · regio · uren · →) */}
      <section className="py-[clamp(80px,10vw,140px)] bg-white border-b border-[var(--line)]">
        <div className="mx-auto max-w-[1360px] px-4 md:px-6">
          <SectionIndex
            code={nl.werkenBijPage.vacanciesSection.index}
            note={nl.werkenBijPage.vacanciesSection.note}
          />

          <h2 className="font-display-expanded text-display-h2 text-[var(--asphalt)] mb-12">
            {nl.werkenBijPage.vacanciesSection.headline}
          </h2>

          <div className="border-t border-[var(--line)]">
            {nl.werkenBijPage.vacancies.map((vac) => (
              <Link
                key={vac.slug}
                href={`/werken-bij/${vac.slug}`}
                className="group block border-b border-[var(--line)] py-7 px-4 -mx-4 hover:bg-[var(--paper)] transition-colors"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start md:items-center">
                  <div className="md:col-span-1">
                    <span className="font-mono-label text-[var(--steel)] group-hover:text-[var(--signal-ink)]">
                      {vac.code}
                    </span>
                  </div>
                  <div className="md:col-span-5">
                    <h3 className="text-[1.375rem] font-semibold text-[var(--asphalt)] group-hover:text-[var(--signal-ink)] transition-colors">
                      {vac.title}
                    </h3>
                    <p className="text-sm text-[var(--steel)] mt-1 line-clamp-1">
                      {vac.shortSummary}
                    </p>
                  </div>
                  <div className="md:col-span-3">
                    <span className="font-mono-label text-[var(--steel)] block">
                      REGIO
                    </span>
                    <span className="text-sm font-medium text-[var(--asphalt)]">
                      {vac.region}
                    </span>
                  </div>
                  <div className="md:col-span-2">
                    <span className="font-mono-label text-[var(--steel)] block">
                      UREN
                    </span>
                    <span className="text-sm font-medium text-[var(--asphalt)]">
                      {vac.hours}
                    </span>
                  </div>
                  <div className="md:col-span-1 flex md:justify-end">
                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-[2px] border border-[var(--line)] group-hover:border-[var(--asphalt)] text-[var(--asphalt)]">
                      <ArrowRight
                        size={18}
                        strokeWidth={1.5}
                        className="transition-transform duration-150 group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 03 — 4 Steps on the Lane Line (Solliciteer → Kennismaken → Opleiding → Aan de slag) */}
      <section className="py-[clamp(80px,10vw,140px)] bg-[var(--paper)] border-b border-[var(--line)]">
        <div className="mx-auto max-w-[1360px] px-4 md:px-6">
          <SectionIndex
            code={nl.werkenBijPage.stepsSection.index}
            note={nl.werkenBijPage.stepsSection.note}
          />

          <h2 className="font-display-expanded text-display-h2 text-[var(--asphalt)] mb-12">
            {nl.werkenBijPage.stepsSection.headline}
          </h2>

          <div className="mb-8">
            <LaneLineDivider dark={false} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {nl.werkenBijPage.stepsSection.steps.map((step) => (
              <div
                key={step.number}
                className="pt-2 border-t sm:border-t-0 border-[var(--line)] first:border-t-0"
              >
                <span className="inline-block font-mono-label px-2.5 py-1 border border-[var(--asphalt)] text-[var(--asphalt)] rounded-[2px] mb-4">
                  STAP {step.number}
                </span>
                <h3 className="text-[1.375rem] font-semibold text-[var(--asphalt)] mb-2">
                  {step.title}
                </h3>
                <p className="text-sm md:text-base text-[var(--steel)] leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04 — FAQ Accordion */}
      <section className="py-[clamp(80px,10vw,140px)] bg-white border-b border-[var(--line)]">
        <div className="mx-auto max-w-[1360px] px-4 md:px-6">
          <SectionIndex
            code={nl.werkenBijPage.faqsSection.index}
            note={nl.werkenBijPage.faqsSection.note}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <h2 className="font-display-expanded text-display-h2 text-[var(--asphalt)] text-balance">
                {nl.werkenBijPage.faqsSection.headline}
              </h2>
            </div>

            <div className="lg:col-span-7">
              <FaqAccordion items={nl.werkenBijPage.faqsSection.items} />
            </div>
          </div>
        </div>
      </section>

      {/* 05 — Application Form (#solliciteren) */}
      <section
        id="solliciteren"
        className="py-[clamp(80px,10vw,140px)] bg-white scroll-mt-20"
      >
        <div className="mx-auto max-w-[1360px] px-4 md:px-6">
          <SectionIndex
            code={nl.werkenBijPage.form.index}
            note={nl.werkenBijPage.form.note}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <h2 className="font-display-expanded text-display-h2 text-[var(--asphalt)] text-balance">
                {nl.werkenBijPage.form.headline}
              </h2>
              <p className="text-base md:text-lg text-[var(--steel)] leading-relaxed">
                {nl.werkenBijPage.form.description}
              </p>

              <div className="p-6 bg-[var(--paper)] border border-[var(--line)] rounded-[6px] space-y-3">
                <span className="font-mono-label text-[var(--steel)] block">
                  VRAGEN OVER DE VACATURES OF OPLEIDING?
                </span>
                <p className="text-sm text-[var(--steel)]">
                  Bel of mail gerust met onze afdeling Werving & Opleiding:
                </p>
                <div className="pt-1 space-y-1">
                  <a
                    href={getPhoneHref(company.phoneRaw)}
                    className="block font-mono text-lg font-semibold text-[var(--asphalt)] hover:text-[var(--signal-ink)]"
                  >
                    {company.phoneDisplay}
                  </a>
                  <a
                    href={getMailHref(company.jobsEmail)}
                    className="block text-sm font-mono text-[var(--asphalt)] underline underline-offset-4"
                  >
                    {company.jobsEmail}
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <JobApplicationForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
