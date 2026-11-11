import React from 'react';
import type { Metadata } from 'next';
import { nl } from '@/src/content/nl';
import { company } from '@/src/config/company';
import { InnerPageHero } from '@/components/InnerPageHero';
import { OpleidingenInteractive } from '@/components/OpleidingenInteractive';

export const metadata: Metadata = {
  title: 'Opleidingen — BRL 9101, Beroepsverkeersregelaar & VCA',
  description:
    'Praktijkgerichte opleidingen en herinstructies van Atlas Holland B.V.: BRL 9101, Beroepsverkeersregelaar (SVNL), VCA-VOL, EHBO/BHV, agressiebeheersing en tramveiligheid.',
  openGraph: {
    title: `Opleidingen & Certificering | ${company.name}`,
    description: nl.opleidingenPage.lead,
  },
};

export default function OpleidingenPage() {
  return (
    <div>
      <InnerPageHero
        breadcrumb={nl.opleidingenPage.breadcrumb}
        h1={nl.opleidingenPage.h1}
        lead={nl.opleidingenPage.lead}
        image={nl.opleidingenPage.heroImage}
        imageAlt={nl.opleidingenPage.heroImageAlt}
        primaryCta={{
          label: 'Direct inschrijven',
          href: '#aanmelden',
        }}
        secondaryCta={{
          label: 'Gratis opleiding via vacature',
          href: '/werken-bij',
        }}
      />

      <OpleidingenInteractive courses={nl.opleidingenPage.courses} />
    </div>
  );
}
