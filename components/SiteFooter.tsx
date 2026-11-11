import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { company, getMailHref, getPhoneHref } from '@/src/config/company';
import { nl } from '@/src/content/nl';
import { AtlasLogo } from './AtlasLogo';

export function SiteFooter() {
  const obtainedCertificates = company.certificates.filter((c) => c.obtained);

  return (
    <footer
      id="site-footer"
      className="bg-[var(--asphalt)] text-[var(--paper)] relative overflow-hidden"
    >
      {/* Signature 2: Barrier Tape ONLY on top edge of footer and urgent Spoed bar */}
      <div className="barrier-tape" aria-hidden="true" />

      <div className="mx-auto max-w-[1360px] px-4 md:px-6 pt-16 md:pt-24 pb-12">
        {/* Top Row: Logo + Direct Dual CTAs */}
        <div className="pb-12 mb-12 border-b border-[var(--line-dark)] flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <Link href="/" aria-label={company.name}>
              <AtlasLogo variant="dark" className="h-14 w-auto" />
            </Link>
            <div className="sm:border-l sm:border-[var(--line-dark)] sm:pl-6">
              <p className="font-mono-label text-[var(--steel-light)]">
                LANDELIJK INZETBAAR · 24/7 PLANNING
              </p>
              <p className="text-base text-[var(--paper)] mt-1">
                {company.tagline}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/offerte-aanvragen"
              className="inline-flex items-center h-12 px-5 bg-[var(--signal)] hover:bg-[var(--signal-hover)] text-[var(--asphalt)] font-semibold text-sm rounded-[2px] transition-colors whitespace-nowrap"
            >
              <span>Offerte aanvragen →</span>
            </Link>
            <Link
              href="/werken-bij"
              className="inline-flex items-center h-12 px-5 border border-[var(--line-dark)] hover:border-[var(--paper)] text-[var(--paper)] font-medium text-sm rounded-[2px] transition-colors whitespace-nowrap"
            >
              <span>Solliciteer als verkeersregelaar</span>
            </Link>
          </div>
        </div>

        {/* Main 4-Column Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-[var(--line-dark)]">
          {/* Column 1: Diensten (5 cols) */}
          <div className="lg:col-span-5">
            <p className="font-mono-label text-[var(--steel-light)] mb-5">
              01 — {nl.footer.servicesTitle}
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
              {nl.services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/diensten/${service.slug}`}
                    className="text-sm text-[var(--steel-light)] hover:text-[var(--paper)] transition-colors inline-flex items-center gap-2"
                  >
                    <span className="font-mono text-[11px] text-[var(--steel)]">
                      {service.number}
                    </span>
                    <span>{service.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Atlas Navigation (3 cols) */}
          <div className="lg:col-span-3">
            <p className="font-mono-label text-[var(--steel-light)] mb-5">
              02 — {nl.footer.companyTitle}
            </p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-[var(--steel-light)] hover:text-[var(--paper)] transition-colors"
                >
                  Startpagina
                </Link>
              </li>
              <li>
                <Link
                  href="/diensten"
                  className="text-[var(--steel-light)] hover:text-[var(--paper)] transition-colors"
                >
                  Alle 11 diensten
                </Link>
              </li>
              <li>
                <Link
                  href="/opleidingen"
                  className="text-[var(--steel-light)] hover:text-[var(--paper)] transition-colors"
                >
                  Opleidingen & Academie
                </Link>
              </li>
              <li>
                <Link
                  href="/over-ons"
                  className="text-[var(--steel-light)] hover:text-[var(--paper)] transition-colors"
                >
                  Over Atlas Holland B.V.
                </Link>
              </li>
              <li>
                <Link
                  href="/werken-bij"
                  className="text-[var(--steel-light)] hover:text-[var(--paper)] transition-colors"
                >
                  Werken bij & Vacatures
                </Link>
              </li>
              <li>
                <Link
                  href="/offerte-aanvragen"
                  className="text-[var(--steel-light)] hover:text-[var(--paper)] transition-colors"
                >
                  Offerte of inzet aanvragen
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-[var(--steel-light)] hover:text-[var(--paper)] transition-colors"
                >
                  Contact & Spoedlijn
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact, KvK, BTW, Socials (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <p className="font-mono-label text-[var(--steel-light)]">
              03 — {nl.footer.contactTitle}
            </p>

            <div className="space-y-2">
              <div>
                <span className="font-mono-label text-[var(--steel-light)] block">
                  24/7 PLANNING & INZET
                </span>
                <a
                  href={getPhoneHref(company.phoneRaw)}
                  className="text-xl font-semibold text-[var(--paper)] hover:text-[var(--signal)] transition-colors font-mono tracking-tight"
                >
                  {company.phoneDisplay}
                </a>
              </div>
              <div>
                <span className="font-mono-label text-[var(--steel-light)] block">
                  E-MAIL PLANNING
                </span>
                <a
                  href={getMailHref(company.email)}
                  className="text-sm text-[var(--paper)] hover:underline"
                >
                  {company.email}
                </a>
              </div>
            </div>

            <div className="text-sm text-[var(--steel-light)] space-y-1 pt-2 border-t border-[var(--line-dark)]">
              <p className="text-[var(--paper)] font-medium">{company.name}</p>
              <p>{company.address.street}</p>
              <p>
                {company.address.postalCode} {company.address.city} ({company.address.country})
              </p>
              <p className="font-mono text-xs pt-2 text-[var(--steel-light)]">
                KVK: {company.kvk} · BTW: {company.btw}
              </p>
            </div>

            <div className="flex items-center gap-4 pt-1">
              {company.socials.linkedin && (
                <a
                  href={company.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono-label text-[var(--steel-light)] hover:text-[var(--paper)] border border-[var(--line-dark)] px-3 py-1.5 rounded-[2px]"
                >
                  <span>LINKEDIN</span>
                  <ArrowUpRight size={13} strokeWidth={1.5} />
                </a>
              )}
              {company.socials.instagram && (
                <a
                  href={company.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono-label text-[var(--steel-light)] hover:text-[var(--paper)] border border-[var(--line-dark)] px-3 py-1.5 rounded-[2px]"
                >
                  <span>INSTAGRAM</span>
                  <ArrowUpRight size={13} strokeWidth={1.5} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Certificate Codes Row (Only obtained === true) */}
        {obtainedCertificates.length > 0 && (
          <div className="py-6 border-b border-[var(--line-dark)] flex flex-wrap items-center justify-between gap-4">
            <span className="font-mono-label text-[var(--steel-light)]">
              GECERTIFICEERD & GEBORGD:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {obtainedCertificates.map((cert) => (
                <span
                  key={cert.code}
                  className="font-mono-label text-[var(--paper)] border border-[var(--line-dark)] px-2.5 py-1 rounded-[2px]"
                >
                  {cert.code} — {cert.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Legal Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[var(--steel-light)]">
          <p>{nl.footer.rights}</p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="hover:text-[var(--paper)] transition-colors underline-offset-4 hover:underline"
            >
              {nl.footer.privacyLabel}
            </Link>
            <Link
              href="/algemene-voorwaarden"
              className="hover:text-[var(--paper)] transition-colors underline-offset-4 hover:underline"
            >
              {nl.footer.termsLabel}
            </Link>
          </div>
        </div>
      </div>

      {/* Huge Outlined "ATLAS" Wordmark (1px stroke) cut off at the bottom edge */}
      <div
        aria-hidden="true"
        className="w-full overflow-hidden pointer-events-none select-none flex justify-center -mb-[4.5vw]"
      >
        <span className="atlas-outline-wordmark text-[23vw] tracking-tight block leading-none">
          ATLAS
        </span>
      </div>
    </footer>
  );
}
