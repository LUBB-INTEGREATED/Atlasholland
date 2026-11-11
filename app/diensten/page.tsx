import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { nl } from '@/src/content/nl';
import { company, getPhoneHref } from '@/src/config/company';
import { InnerPageHero } from '@/components/InnerPageHero';
import { ServiceRowList } from '@/components/ServiceRowList';
import { LaneLineDivider } from '@/components/SignatureElements';

export const metadata: Metadata = {
  title: 'Diensten — Verkeersregelaars, Verkeersplannen & TVM',
  description:
    'Overzicht van alle 11 specialismen van Atlas Holland B.V.: gecertificeerde verkeersregelaars, bouwportiers, verkeersplannen, BLVC, tijdelijke verkeersmaatregelen en 24/7 spoedinzet.',
  openGraph: {
    title: 'Diensten — Verkeersregelaars, Verkeersplannen & TVM | Atlas Holland B.V.',
    description:
      'Overzicht van alle 11 specialismen van Atlas Holland B.V.: gecertificeerde verkeersregelaars, bouwportiers, verkeersplannen, BLVC en tijdelijke verkeersmaatregelen.',
  },
};

export default function DienstenPage() {
  return (
    <div>
      <InnerPageHero
        breadcrumb={nl.servicesPage.breadcrumb}
        h1={nl.servicesPage.h1}
        lead={nl.servicesPage.lead}
        image={nl.servicesPage.heroImage}
        imageAlt={nl.servicesPage.heroImageAlt}
        primaryCta={{
          label: 'Offerte aanvragen',
          href: '/offerte-aanvragen',
        }}
        secondaryCta={{
          label: 'Solliciteer als verkeersregelaar',
          href: '/werken-bij',
        }}
      />

      {/* Services Grouped Under Mono Group Labels */}
      <section className="py-[clamp(80px,10vw,140px)] bg-[var(--paper)]">
        <div className="mx-auto max-w-[1360px] px-4 md:px-6 space-y-20 md:space-y-28">
          {nl.servicesPage.groups.map((group) => {
            const groupServices = nl.services.filter((s) => s.group === group.key);
            return (
              <div key={group.key}>
                <div className="flex items-center gap-4 mb-8">
                  <span className="font-mono-label text-[var(--asphalt)]">
                    {group.code}
                  </span>
                  <div className="h-px flex-1 bg-[var(--line)]" />
                  <span className="font-mono-label text-[var(--steel)]">
                    {groupServices.length} DIENSTEN
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                  <div className="lg:col-span-4 space-y-3">
                    <h2 className="font-display-expanded text-[clamp(1.75rem,3vw,2.5rem)] text-[var(--asphalt)]">
                      {group.title}
                    </h2>
                    <p className="text-base text-[var(--steel)] leading-relaxed">
                      {group.description}
                    </p>
                  </div>

                  <div className="lg:col-span-8">
                    <ServiceRowList services={groupServices} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <LaneLineDivider dark={false} />

      {/* Dual Action Closing Block (Clients + Job Seekers) */}
      <section className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-[1360px] px-4 md:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-3">
            <span className="font-mono-label text-[var(--steel)]">
              MAATWERK OF COMBINATIE-INZET
            </span>
            <h2 className="font-display-expanded text-display-h2 text-[var(--asphalt)]">
              DIRECT CAPACITEIT OF ADVIES OP LOCATIE?
            </h2>
            <p className="text-base md:text-lg text-[var(--steel)] max-w-2xl">
              Combineer gecertificeerde verkeersregelaars met een CROW-verkeersplan en geplaatste bebording onder één vast aanspreekpunt.
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:justify-end gap-4">
            <Link
              href="/offerte-aanvragen"
              className="group inline-flex items-center justify-center h-[52px] px-6 bg-[var(--signal)] hover:bg-[var(--signal-hover)] text-[var(--asphalt)] font-semibold text-[15px] rounded-[2px] transition-colors whitespace-nowrap"
            >
              <span>Offerte aanvragen</span>
              <ArrowRight
                size={18}
                strokeWidth={1.5}
                className="ml-2 transition-transform duration-150 group-hover:translate-x-1"
              />
            </Link>
            <a
              href={getPhoneHref(company.phoneRaw)}
              className="inline-flex items-center justify-center h-[52px] px-6 border border-[var(--asphalt)] text-[var(--asphalt)] hover:bg-[var(--asphalt)] hover:text-[var(--paper)] font-mono text-xs uppercase tracking-wider rounded-[2px] transition-colors whitespace-nowrap"
            >
              <span>BEL {company.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
