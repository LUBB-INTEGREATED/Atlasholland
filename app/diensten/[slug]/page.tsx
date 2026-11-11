import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check, Phone } from 'lucide-react';
import { getServiceBySlug, nl } from '@/src/content/nl';
import { company, getPhoneHref } from '@/src/config/company';
import { InnerPageHero } from '@/components/InnerPageHero';
import { LaneLineDivider, SectionIndex } from '@/components/SignatureElements';
import { FaqAccordion } from '@/components/FaqAccordion';
import { ServiceRowList } from '@/components/ServiceRowList';

export async function generateStaticParams() {
  return nl.services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) {
    return {
      title: 'Dienst niet gevonden',
    };
  }

  return {
    title: `${service.title} — ${service.groupLabel}`,
    description: service.lead,
    openGraph: {
      title: `${service.title} | ${company.name}`,
      description: service.lead,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const obtainedCodes = new Set(
    company.certificates.filter((c) => c.obtained).map((c) => c.code)
  );
  const serviceCertificates = service.certificates.filter((code) =>
    obtainedCodes.has(code)
  );

  const relatedServices = service.relatedSlugs
    .map((s) => getServiceBySlug(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <div>
      <InnerPageHero
        breadcrumb={`HOME / DIENSTEN / ${service.title.toUpperCase()}`}
        h1={service.title.toUpperCase()}
        subHeadline={`${service.number} — ${service.groupLabel}`}
        lead={service.lead}
        image={service.image}
        imageAlt={service.imageAlt}
        primaryCta={{
          label: `${service.title} aanvragen`,
          href: `/offerte-aanvragen?dienst=${service.slug}`,
        }}
        secondaryCta={{
          label: 'Werken in dit vakgebied',
          href: '/werken-bij',
        }}
      />

      {/* Main Content (Left 8 Columns) + Sticky Aside (Right 4 Columns) */}
      <section className="py-[clamp(80px,10vw,140px)] bg-[var(--paper)]">
        <div className="mx-auto max-w-[1360px] px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left 8 Columns */}
            <div className="lg:col-span-8 space-y-16">
              {/* 01 Wat wij doen + Bullets */}
              <div>
                <SectionIndex code="01 — WAT WIJ DOEN" note={service.groupLabel} />
                <h2 className="font-display-expanded text-display-h2 text-[var(--asphalt)] mb-6">
                  VAKKUNDIGE INZET OP LOCATIE
                </h2>
                <div className="space-y-4 text-base md:text-lg text-[var(--steel)] leading-relaxed">
                  {service.whatWeDo.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-[var(--line)]">
                  <p className="font-mono-label text-[var(--asphalt)] mb-4">
                    KERNPUNTEN VAN DEZE DIENST
                  </p>
                  <ul className="space-y-3">
                    {service.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3.5">
                        <span className="mt-1 w-5 h-5 rounded-[2px] border border-[var(--asphalt)] flex items-center justify-center shrink-0 text-[var(--asphalt)]">
                          <Check size={13} strokeWidth={2} />
                        </span>
                        <span className="text-base font-medium text-[var(--asphalt)]">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 02 Toepassingen */}
              <div>
                <SectionIndex code="02 — TOEPASSINGEN" note="PRAKTIJKSITUATIES" />
                <h2 className="font-display-expanded text-[clamp(1.75rem,3vw,2.65rem)] text-[var(--asphalt)] mb-6">
                  WAARVOOR U DEZE DIENST INZET
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.applications.map((app, idx) => (
                    <div
                      key={app}
                      className="p-5 bg-white border border-[var(--line)] rounded-[2px]"
                    >
                      <span className="font-mono-label text-[var(--signal-ink)] block mb-2">
                        0{idx + 1} / SITUATIE
                      </span>
                      <p className="text-base font-medium text-[var(--asphalt)]">
                        {app}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 03 Werkwijze on the Lane Line */}
              <div>
                <SectionIndex code="03 — WERKWIJZE" note="STAP VOOR STAP" />
                <h2 className="font-display-expanded text-[clamp(1.75rem,3vw,2.65rem)] text-[var(--asphalt)] mb-8">
                  VAN AANVRAAG TOT UITVOERING
                </h2>
                <div className="mb-8">
                  <LaneLineDivider dark={false} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {service.processSteps.map((step) => (
                    <div
                      key={step.step}
                      className="pt-2 border-t md:border-t-0 border-[var(--line)] first:border-t-0"
                    >
                      <span className="inline-block font-mono-label px-2.5 py-1 border border-[var(--asphalt)] text-[var(--asphalt)] rounded-[2px] mb-3">
                        STAP {step.step}
                      </span>
                      <h3 className="text-lg font-semibold text-[var(--asphalt)] mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-[var(--steel)] leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 04 FAQ */}
              <div>
                <SectionIndex code="04 — VEELGESTELDE VRAGEN" note="PLANNING & INZET" />
                <h2 className="font-display-expanded text-[clamp(1.75rem,3vw,2.65rem)] text-[var(--asphalt)] mb-8">
                  PRAKTISCHE INFORMATIE VOOR OPDRACHTGEVERS
                </h2>
                <FaqAccordion items={service.faqs} />
              </div>
            </div>

            {/* Right 4 Columns: Sticky Aside */}
            <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
              <div className="bg-[var(--asphalt)] text-[var(--paper)] rounded-[6px] border border-[var(--line-dark)] overflow-hidden">
                <div className="p-6 md:p-8 space-y-6">
                  <div className="flex items-center justify-between border-b border-[var(--line-dark)] pb-4">
                    <span className="font-mono-label text-[var(--paper)]">
                      DIRECT AANVRAGEN
                    </span>
                    <span className="inline-flex items-center gap-2 font-mono-label text-[var(--steel-light)]">
                      <span
                        className="w-2 h-2 rounded-full bg-[var(--ok)]"
                        aria-hidden="true"
                      />
                      REACTIE &lt; {company.responseTimeHours}U
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display-expanded text-2xl text-[var(--paper)]">
                      {service.title.toUpperCase()} INPLANNEN?
                    </h3>
                    <p className="text-sm text-[var(--steel-light)] mt-2 leading-relaxed">
                      Vraag direct een vrijblijvende offerte aan of bespreek de benodigde capaciteit met onze 24/7 planning.
                    </p>
                  </div>

                  <Link
                    href={`/offerte-aanvragen?dienst=${service.slug}`}
                    className="group w-full h-[52px] px-6 bg-[var(--signal)] hover:bg-[var(--signal-hover)] text-[var(--asphalt)] font-semibold text-[15px] rounded-[2px] flex items-center justify-center transition-colors"
                  >
                    <span>Direct aanvragen</span>
                    <ArrowRight
                      size={18}
                      strokeWidth={1.5}
                      className="ml-2 transition-transform duration-150 group-hover:translate-x-1"
                    />
                  </Link>

                  <div className="pt-4 border-t border-[var(--line-dark)] space-y-2">
                    <span className="font-mono-label text-[var(--steel-light)] block">
                      24/7 TELEFONISCHE PLANNING & SPOED
                    </span>
                    <a
                      href={getPhoneHref(company.phoneRaw)}
                      className="inline-flex items-center gap-2.5 font-mono text-lg font-semibold text-[var(--paper)] hover:text-[var(--signal)] transition-colors"
                    >
                      <Phone size={17} strokeWidth={1.5} />
                      <span>{company.phoneDisplay}</span>
                    </a>
                  </div>

                  {serviceCertificates.length > 0 && (
                    <div className="pt-4 border-t border-[var(--line-dark)]">
                      <span className="font-mono-label text-[var(--steel-light)] block mb-3">
                        CERTIFICERING & NORMERING
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {serviceCertificates.map((code) => (
                          <span
                            key={code}
                            className="font-mono-label text-[var(--paper)] border border-[var(--line-dark)] px-2.5 py-1 rounded-[2px]"
                          >
                            {code}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Secondary Card: Recruitment Goal */}
              <div className="p-6 bg-white border border-[var(--line)] rounded-[6px] space-y-3">
                <span className="font-mono-label text-[var(--steel)]">
                  VACATURES BIJ ATLAS
                </span>
                <p className="text-base font-semibold text-[var(--asphalt)]">
                  Zelf aan de slag binnen {service.title.toLowerCase()}?
                </p>
                <p className="text-sm text-[var(--steel)]">
                  Ook zonder ervaring leiden wij je gratis op tot gecertificeerd vakman.
                </p>
                <Link
                  href="/werken-bij#solliciteren"
                  className="inline-flex items-center text-sm font-semibold text-[var(--asphalt)] hover:text-[var(--signal-ink)] underline underline-offset-4 pt-1"
                >
                  <span>Direct solliciteren →</span>
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Bottom: 3 Related Services as Rows */}
      {relatedServices.length > 0 && (
        <section className="py-20 md:py-28 bg-white border-t border-[var(--line)]">
          <div className="mx-auto max-w-[1360px] px-4 md:px-6">
            <SectionIndex
              code="05 — GERELATEERDE DIENSTEN"
              note="COMBINEER OP LOCATIE"
            />
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <h2 className="font-display-expanded text-display-h2 text-[var(--asphalt)]">
                AANSLUITENDE EXPERTISES
              </h2>
              <Link
                href="/diensten"
                className="font-mono-label text-[var(--asphalt)] hover:text-[var(--signal-ink)] underline underline-offset-4"
              >
                ALLE 11 DIENSTEN BEKIJKEN →
              </Link>
            </div>
            <ServiceRowList services={relatedServices} />
          </div>
        </section>
      )}
    </div>
  );
}
