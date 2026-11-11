import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { VisibleGridLines } from './SignatureElements';

interface InnerPageHeroProps {
  breadcrumb: string;
  h1: React.ReactNode;
  subHeadline?: string;
  lead: string;
  image?: string;
  imageAlt?: string;
  primaryCta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
}

export function InnerPageHero({
  breadcrumb,
  h1,
  subHeadline,
  lead,
  image,
  imageAlt = '',
  primaryCta,
  secondaryCta,
}: InnerPageHeroProps) {
  return (
    <section className="relative bg-[var(--paper)] border-b border-[var(--line)] pt-10 md:pt-16 pb-12 md:pb-20 overflow-hidden">
      <VisibleGridLines dark={false} />

      <div className="relative z-10 mx-auto max-w-[1360px] px-4 md:px-6">
        {/* Mono Breadcrumb */}
        <div className="flex items-center gap-3 pb-6 mb-6 border-b border-[var(--line)]">
          <span className="font-mono-label text-[var(--steel)]">{breadcrumb}</span>
        </div>

        {/* Uppercase H1 + Lead */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <h1 className="font-display-expanded text-display-h1 text-[var(--asphalt)] text-balance">
              {h1}
            </h1>
            {subHeadline && (
              <p className="mt-4 font-mono-label text-[var(--signal-ink)] text-sm">
                {subHeadline}
              </p>
            )}
          </div>

          <div className="lg:col-span-4 space-y-6">
            <p className="text-lg md:text-[1.15rem] leading-[1.6] text-[var(--steel)]">
              {lead}
            </p>

            {(primaryCta || secondaryCta) && (
              <div className="flex flex-wrap items-center gap-3 pt-1">
                {primaryCta && (
                  <Link
                    href={primaryCta.href}
                    className="group inline-flex items-center h-[52px] px-6 bg-[var(--signal)] hover:bg-[var(--signal-hover)] text-[var(--asphalt)] font-semibold text-[15px] rounded-[2px] transition-colors whitespace-nowrap"
                  >
                    <span>{primaryCta.label}</span>
                    <ArrowRight
                      size={18}
                      strokeWidth={1.5}
                      className="ml-2 transition-transform duration-150 group-hover:translate-x-1"
                    />
                  </Link>
                )}
                {secondaryCta && (
                  <Link
                    href={secondaryCta.href}
                    className="inline-flex items-center h-[52px] px-5 border border-[var(--asphalt)]/25 hover:border-[var(--asphalt)] text-[var(--asphalt)] font-medium text-[15px] rounded-[2px] transition-colors whitespace-nowrap bg-white/60"
                  >
                    <span>{secondaryCta.label}</span>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Wide Photo BELOW the text (No dark overlay heroes) */}
        {image && (
          <div className="mt-10 md:mt-14 overflow-hidden rounded-[6px] border border-[var(--line)] bg-[var(--asphalt)] aspect-[21/9]">
            {/* TODO: replace with real Atlas photo */}
            <img
              src={image}
              alt={imageAlt}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
}
