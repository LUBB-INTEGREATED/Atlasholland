import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Mail } from 'lucide-react';
import { nl } from '@/src/content/nl';
import { company, getMailHref } from '@/src/config/company';
import { InnerPageHero } from '@/components/InnerPageHero';
import { SectionIndex } from '@/components/SignatureElements';
import { StatBlockGrid } from '@/components/StatBlockGrid';

export const metadata: Metadata = {
  title: 'Over ons — Vakmanschap in Verkeersveiligheid',
  description:
    'Maak kennis met Atlas Holland B.V.: sinds 2016 uw landelijke partner voor gecertificeerde verkeersregelaars, tijdelijke verkeersmaatregelen en verkeersplannen.',
  openGraph: {
    title: `Over ons | ${company.name}`,
    description: nl.overOnsPage.lead,
  },
};

export default function OverOnsPage() {
  const obtainedCertificates = company.certificates.filter((c) => c.obtained);

  return (
    <div>
      <InnerPageHero
        breadcrumb={nl.overOnsPage.breadcrumb}
        h1={nl.overOnsPage.h1}
        lead={nl.overOnsPage.lead}
        image={nl.overOnsPage.heroImage}
        imageAlt={nl.overOnsPage.heroImageAlt}
        primaryCta={{
          label: 'Offerte aanvragen',
          href: '/offerte-aanvragen',
        }}
        secondaryCta={{
          label: 'Kom werken bij Atlas',
          href: '/werken-bij',
        }}
      />

      {/* 01 — Ons Verhaal ("Alles onder één dak") */}
      <section className="py-[clamp(80px,10vw,140px)] bg-[var(--paper)] border-b border-[var(--line)]">
        <div className="mx-auto max-w-[1360px] px-4 md:px-6">
          <SectionIndex
            code={nl.overOnsPage.story.index}
            note={nl.overOnsPage.story.note}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
            <div className="lg:col-span-5">
              <h2 className="font-display-expanded text-display-h2 text-[var(--asphalt)] text-balance">
                {nl.overOnsPage.story.headline}
              </h2>
            </div>

            <div className="lg:col-span-7 space-y-5 text-base md:text-lg text-[var(--steel)] leading-relaxed">
              {nl.overOnsPage.story.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>

          <StatBlockGrid stats={company.stats} dark={false} />
        </div>
      </section>

      {/* 02 — Kernwaarden as a Numbered List */}
      <section className="py-[clamp(80px,10vw,140px)] bg-white border-b border-[var(--line)]">
        <div className="mx-auto max-w-[1360px] px-4 md:px-6">
          <SectionIndex
            code={nl.overOnsPage.values.index}
            note={nl.overOnsPage.values.note}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <h2 className="font-display-expanded text-display-h2 text-[var(--asphalt)] text-balance">
                {nl.overOnsPage.values.headline}
              </h2>
            </div>

            <div className="lg:col-span-7 border-t border-[var(--line)]">
              {nl.overOnsPage.values.items.map((val) => (
                <div
                  key={val.number}
                  className="py-7 border-b border-[var(--line)] grid grid-cols-12 gap-4 items-start"
                >
                  <div className="col-span-2">
                    <span className="font-mono-label text-[var(--signal-ink)]">
                      {val.number}
                    </span>
                  </div>
                  <div className="col-span-10">
                    <h3 className="text-[1.375rem] font-semibold text-[var(--asphalt)] mb-2">
                      {val.title}
                    </h3>
                    <p className="text-base text-[var(--steel)] leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 03 — Team Grid (Photo, Name, Role, Email, LinkedIn) */}
      {company.team && company.team.length > 0 && (
        <section className="py-[clamp(80px,10vw,140px)] bg-[var(--paper)] border-b border-[var(--line)]">
          <div className="mx-auto max-w-[1360px] px-4 md:px-6">
            <SectionIndex
              code={nl.overOnsPage.team.index}
              note={nl.overOnsPage.team.note}
            />

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <h2 className="font-display-expanded text-display-h2 text-[var(--asphalt)]">
                  {nl.overOnsPage.team.headline}
                </h2>
                <p className="mt-3 text-base md:text-lg text-[var(--steel)] max-w-2xl">
                  {nl.overOnsPage.team.description}
                </p>
              </div>
              <Link
                href="/contact"
                className="group inline-flex items-center h-[52px] px-6 border border-[var(--asphalt)] text-[var(--asphalt)] hover:bg-[var(--asphalt)] hover:text-[var(--paper)] font-medium text-[15px] rounded-[2px] transition-colors whitespace-nowrap shrink-0"
              >
                <span>Direct contact opnemen</span>
                <ArrowRight
                  size={18}
                  strokeWidth={1.5}
                  className="ml-2 transition-transform duration-150 group-hover:translate-x-1"
                />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {company.team.map((member, idx) => (
                <div
                  key={member.name}
                  className="bg-white border border-[var(--line)] rounded-[6px] overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-[4/3] w-full bg-[var(--asphalt)] border-b border-[var(--line)] overflow-hidden relative">
                      {/* TODO: replace with real Atlas photo */}
                      <img
                        src={member.image}
                        alt={`${member.name} — ${member.role}`}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-3 left-3 font-mono-label bg-[var(--asphalt)]/90 text-[var(--paper)] px-2.5 py-1 rounded-[2px] border border-[var(--line-dark)]">
                        0{idx + 1} · {member.department}
                      </span>
                    </div>

                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-[var(--asphalt)]">
                        {member.name}
                      </h3>
                      <p className="text-sm text-[var(--steel)] mt-0.5">
                        {member.role}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 py-4 border-t border-[var(--line)] bg-[var(--paper)]/50 flex items-center justify-between gap-2">
                    <a
                      href={getMailHref(member.email)}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--asphalt)] hover:text-[var(--signal-ink)] truncate"
                    >
                      <Mail size={14} strokeWidth={1.5} className="shrink-0" />
                      <span className="truncate">{member.email}</span>
                    </a>
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`LinkedIn profiel van ${member.name}`}
                        className="inline-flex items-center gap-1 font-mono-label text-[var(--steel)] hover:text-[var(--asphalt)] shrink-0"
                      >
                        <span>IN</span>
                        <ArrowUpRight size={13} strokeWidth={1.5} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 04 — Certificates (Only obtained === true) */}
      {obtainedCertificates.length > 0 && (
        <section className="py-20 md:py-28 bg-white">
          <div className="mx-auto max-w-[1360px] px-4 md:px-6">
            <SectionIndex
              code="04 — CERTIFICERING & NORMERING"
              note="KWALITEITSBORGING"
            />

            <h2 className="font-display-expanded text-display-h2 text-[var(--asphalt)] mb-12">
              ERKEND VOLGENS LANDELIJKE NORMEN
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
    </div>
  );
}
