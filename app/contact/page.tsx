import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { nl } from '@/src/content/nl';
import { company, getMailHref, getPhoneHref } from '@/src/config/company';
import { InnerPageHero } from '@/components/InnerPageHero';
import { SectionIndex } from '@/components/SignatureElements';
import { ContactForm } from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact — 24/7 Centrale Planning & Vestiging Utrecht',
  description:
    'Neem direct contact op met Atlas Holland B.V. voor verkeersregelaars, spoedinzet of verkeersplannen. 24/7 telefonisch bereikbaar.',
  openGraph: {
    title: `Contact | ${company.name}`,
    description: nl.contactPage.lead,
  },
};

export default function ContactPage() {
  const googleMapsRouteUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${company.name} ${company.address.street} ${company.address.postalCode} ${company.address.city}`
  )}`;

  return (
    <div>
      <InnerPageHero
        breadcrumb={nl.contactPage.breadcrumb}
        h1={nl.contactPage.h1}
        lead={nl.contactPage.lead}
        image={nl.contactPage.heroImage}
        imageAlt={nl.contactPage.heroImageAlt}
        primaryCta={{
          label: 'Offerte aanvragen',
          href: '/offerte-aanvragen',
        }}
        secondaryCta={{
          label: 'Solliciteren bij Atlas',
          href: '/werken-bij',
        }}
      />

      {/* Form Left + Details in Large Type Right */}
      <section className="py-[clamp(80px,10vw,140px)] bg-[var(--paper)] border-b border-[var(--line)]">
        <div className="mx-auto max-w-[1360px] px-4 md:px-6">
          <SectionIndex code="01 — CONTACT & PLANNING" note="24/7 BEREIKBAAR" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left 7 Columns: Contact Form */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="font-display-expanded text-display-h2 text-[var(--asphalt)]">
                {nl.contactPage.formHeadline}
              </h2>
              <ContactForm />
            </div>

            {/* Right 5 Columns: Details in Large Type (Phone in Display Size) */}
            <div className="lg:col-span-5 space-y-10 lg:pl-6 lg:border-l lg:border-[var(--line)]">
              <div>
                <span className="font-mono-label text-[var(--steel)] block mb-2">
                  24/7 PLANNING & SPOEDINZET
                </span>
                <a
                  href={getPhoneHref(company.phoneRaw)}
                  className="font-display-expanded text-[clamp(2.1rem,4vw,3.5rem)] text-[var(--asphalt)] hover:text-[var(--signal-ink)] transition-colors block leading-none"
                >
                  {company.phoneDisplay}
                </a>
                <p className="text-sm text-[var(--steel)] mt-3">
                  Dag en nacht rechtstreeks verbonden met onze dienstdoende planner.
                </p>
              </div>

              <div className="pt-8 border-t border-[var(--line)] space-y-4">
                <div>
                  <span className="font-mono-label text-[var(--steel)] block mb-1">
                    E-MAIL PLANNING & OFFERTES
                  </span>
                  <a
                    href={getMailHref(company.email)}
                    className="text-xl md:text-2xl font-semibold text-[var(--asphalt)] hover:text-[var(--signal-ink)] underline underline-offset-4"
                  >
                    {company.email}
                  </a>
                </div>

                <div className="pt-2">
                  <span className="font-mono-label text-[var(--steel)] block mb-1">
                    E-MAIL WERVING & OPLEIDINGEN
                  </span>
                  <a
                    href={getMailHref(company.jobsEmail)}
                    className="text-lg font-medium text-[var(--asphalt)] hover:text-[var(--signal-ink)] underline underline-offset-4"
                  >
                    {company.jobsEmail}
                  </a>
                </div>
              </div>

              <div className="pt-8 border-t border-[var(--line)] space-y-3">
                <span className="font-mono-label text-[var(--steel)] block">
                  HOOFDKANTOOR & STEUNPUNT MIDDEN-NEDERLAND
                </span>
                <p className="text-xl font-semibold text-[var(--asphalt)]">
                  {company.name}
                </p>
                <p className="text-base text-[var(--steel)]">
                  {company.address.street}
                  <br />
                  {company.address.postalCode} {company.address.city} (
                  {company.address.country})
                </p>
                <div className="pt-2">
                  <a
                    href={googleMapsRouteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono-label text-[var(--asphalt)] border border-[var(--asphalt)] px-4 py-2.5 rounded-[2px] hover:bg-[var(--asphalt)] hover:text-[var(--paper)] transition-colors"
                  >
                    <span>{nl.contactPage.routeLabel}</span>
                    <ArrowUpRight size={15} strokeWidth={1.5} />
                  </a>
                </div>
              </div>

              <div className="pt-8 border-t border-[var(--line)] font-mono text-xs text-[var(--steel)] space-y-1">
                <p>KVK-NUMMER: {company.kvk}</p>
                <p>BTW-IDENTIFICATIENUMMER: {company.btw}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Map Below */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-[1360px] px-4 md:px-6">
          <SectionIndex
            code="02 — LOCATIE & BEREIKBAARHEID"
            note="BEDRIJVENTERREIN LAGE WEIDE · UTRECHT (A2)"
          />

          <div className="rounded-[6px] border border-[var(--line)] overflow-hidden bg-[var(--asphalt)] relative aspect-[21/8] min-h-[280px]">
            <svg
              viewBox="0 0 1200 460"
              fill="none"
              aria-label={`Locatiekaart ${company.name} aan de ${company.address.street} te ${company.address.city}`}
              className="w-full h-full object-cover"
            >
              <rect width="1200" height="460" fill="#141619" />
              {/* Coordinate Grid */}
              <g stroke="#2A2D31" strokeWidth="1">
                <line x1="0" y1="115" x2="1200" y2="115" />
                <line x1="0" y1="230" x2="1200" y2="230" />
                <line x1="0" y1="345" x2="1200" y2="345" />
                <line x1="240" y1="0" x2="240" y2="460" />
                <line x1="480" y1="0" x2="480" y2="460" />
                <line x1="720" y1="0" x2="720" y2="460" />
                <line x1="960" y1="0" x2="960" y2="460" />
              </g>
              {/* Amsterdam-Rijnkanaal Waterway */}
              <path
                d="M 790,0 L 660,460 L 735,460 L 865,0 Z"
                fill="#1D2530"
              />
              {/* A2 Highway Corridor */}
              <path
                d="M 410,0 L 535,460"
                stroke="#4D6080"
                strokeWidth="14"
              />
              <path
                d="M 410,0 L 535,460"
                stroke="#E9D9CA"
                strokeWidth="2"
                strokeDasharray="16 12"
              />
              {/* Atoomweg Arterial Road */}
              <path
                d="M 140,290 L 620,210 L 1060,260"
                stroke="#8DA1BE"
                strokeWidth="6"
              />
              {/* Atlas Holland Marker Pin */}
              <circle
                cx="620"
                cy="210"
                r="26"
                fill="#F4721E"
                fillOpacity="0.22"
                stroke="#F4721E"
                strokeWidth="2"
              />
              <circle cx="620" cy="210" r="8" fill="#F4721E" />
              <rect
                x="655"
                y="178"
                width="290"
                height="64"
                rx="2"
                fill="#121820"
                stroke="#F4721E"
                strokeWidth="1.5"
              />
              <text
                x="672"
                y="204"
                fill="#E9D9CA"
                fontFamily="monospace"
                fontSize="13"
                fontWeight="bold"
              >
                ATLAS HOLLAND B.V.
              </text>
              <text
                x="672"
                y="225"
                fill="#9CA1A7"
                fontFamily="monospace"
                fontSize="12"
              >
                ATOOMWEG 412 · 3542 AB UTRECHT
              </text>
            </svg>
          </div>
        </div>
      </section>
    </div>
  );
}
