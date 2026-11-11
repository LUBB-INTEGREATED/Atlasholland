import React from 'react';
import type { Metadata } from 'next';
import { nl } from '@/src/content/nl';
import { company } from '@/src/config/company';
import { InnerPageHero } from '@/components/InnerPageHero';
import { QuoteRequestWizard } from '@/components/QuoteRequestWizard';

export const metadata: Metadata = {
  title: 'Offerte aanvragen — Verkeersregelaars & Verkeersmaatregelen',
  description:
    'Vraag in 3 stappen gecertificeerde verkeersregelaars, tijdelijke verkeersmaatregelen of een verkeersplan aan bij Atlas Holland B.V. Reactie binnen 24 uur.',
  openGraph: {
    title: `Offerte aanvragen | ${company.name}`,
    description: nl.offertePage.lead,
  },
};

export default function OfferteAanvragenPage() {
  return (
    <div>
      <InnerPageHero
        breadcrumb={nl.offertePage.breadcrumb}
        h1={nl.offertePage.h1}
        lead={nl.offertePage.lead}
        image={nl.offertePage.heroImage}
        imageAlt={nl.offertePage.heroImageAlt}
      />

      <section className="py-[clamp(64px,8vw,120px)] bg-[var(--paper)]">
        <div className="mx-auto max-w-[1360px] px-4 md:px-6">
          <QuoteRequestWizard />
        </div>
      </section>
    </div>
  );
}
