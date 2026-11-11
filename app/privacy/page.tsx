import React from 'react';
import type { Metadata } from 'next';
import { nl } from '@/src/content/nl';
import { company } from '@/src/config/company';
import { InnerPageHero } from '@/components/InnerPageHero';

export const metadata: Metadata = {
  title: 'Privacyverklaring',
  description: nl.legal.privacy.lead,
  openGraph: {
    title: `Privacyverklaring | ${company.name}`,
    description: nl.legal.privacy.lead,
  },
};

export default function PrivacyPage() {
  return (
    <div>
      <InnerPageHero
        breadcrumb={nl.legal.privacy.breadcrumb}
        h1={nl.legal.privacy.h1}
        lead={nl.legal.privacy.lead}
        primaryCta={{
          label: 'Offerte aanvragen',
          href: '/offerte-aanvragen',
        }}
        secondaryCta={{
          label: 'Werken bij Atlas',
          href: '/werken-bij',
        }}
      />

      <section className="py-[clamp(64px,8vw,120px)] bg-[var(--paper)]">
        <div className="mx-auto max-w-[1360px] px-4 md:px-6">
          <div className="max-w-4xl border-t border-[var(--line)]">
            {nl.legal.privacy.sections.map((sec) => (
              <div key={sec.code} className="py-8 border-b border-[var(--line)]">
                <span className="font-mono-label text-[var(--signal-ink)] block mb-2">
                  {sec.code}
                </span>
                <h2 className="text-xl md:text-2xl font-semibold text-[var(--asphalt)] mb-3">
                  {sec.title}
                </h2>
                <p className="text-base text-[var(--steel)] leading-relaxed">
                  {sec.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
