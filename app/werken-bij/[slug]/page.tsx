import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Check } from 'lucide-react';
import { getVacancyBySlug, nl } from '@/src/content/nl';
import { company, getPhoneHref } from '@/src/config/company';
import { InnerPageHero } from '@/components/InnerPageHero';
import { SectionIndex } from '@/components/SignatureElements';
import { JobApplicationForm } from '@/components/JobApplicationForm';

export async function generateStaticParams() {
  return nl.werkenBijPage.vacancies.map((vac) => ({
    slug: vac.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const vacancy = getVacancyBySlug(slug);
  if (!vacancy) {
    return { title: 'Vacature niet gevonden' };
  }

  return {
    title: `${vacancy.title} (${vacancy.region}) — Vacature`,
    description: vacancy.shortSummary,
    openGraph: {
      title: `${vacancy.title} | Werken bij ${company.name}`,
      description: vacancy.shortSummary,
    },
  };
}

export default async function VacancyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vacancy = getVacancyBySlug(slug);

  if (!vacancy) {
    notFound();
  }

  return (
    <div>
      <InnerPageHero
        breadcrumb={`HOME / WERKEN BIJ / ${vacancy.code}`}
        h1={vacancy.title.toUpperCase()}
        subHeadline={`${vacancy.region.toUpperCase()} · ${vacancy.hours.toUpperCase()}`}
        lead={vacancy.intro}
        primaryCta={{
          label: 'Direct solliciteren',
          href: '#solliciteren',
        }}
        secondaryCta={{
          label: 'Verkeersregelaars inhuren?',
          href: '/offerte-aanvragen',
        }}
      />

      <section className="py-[clamp(80px,10vw,140px)] bg-[var(--paper)] border-b border-[var(--line)]">
        <div className="mx-auto max-w-[1360px] px-4 md:px-6">
          <div className="mb-8">
            <Link
              href="/werken-bij"
              className="inline-flex items-center gap-2 font-mono-label text-[var(--steel)] hover:text-[var(--asphalt)]"
            >
              <ArrowLeft size={15} strokeWidth={1.5} />
              <span>TERUG NAAR ALLE VACATURES</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left 8 Columns: Wat ga je doen, Wat vragen wij, Wat bieden wij */}
            <div className="lg:col-span-8 space-y-12">
              <div className="bg-white border border-[var(--line)] rounded-[6px] p-6 md:p-8">
                <SectionIndex code="01 — DE FUNCTIE" note="WAT GA JE DOEN?" />
                <h2 className="font-display-expanded text-2xl md:text-3xl text-[var(--asphalt)] mb-6">
                  WAT GA JE DOEN?
                </h2>
                <ul className="space-y-3.5">
                  {vacancy.whatYouDo.map((item) => (
                    <li key={item} className="flex items-start gap-3.5">
                      <span className="mt-1 w-5 h-5 rounded-[2px] border border-[var(--asphalt)] flex items-center justify-center shrink-0 text-[var(--asphalt)]">
                        <Check size={13} strokeWidth={2} />
                      </span>
                      <span className="text-base text-[var(--asphalt)] leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white border border-[var(--line)] rounded-[6px] p-6 md:p-8">
                <SectionIndex code="02 — PROFIEL" note="WAT VRAGEN WIJ?" />
                <h2 className="font-display-expanded text-2xl md:text-3xl text-[var(--asphalt)] mb-6">
                  WAT VRAGEN WIJ VAN JOU?
                </h2>
                <ul className="space-y-3.5">
                  {vacancy.whatWeAsk.map((item) => (
                    <li key={item} className="flex items-start gap-3.5">
                      <span className="mt-1 w-5 h-5 rounded-[2px] border border-[var(--asphalt)] flex items-center justify-center shrink-0 text-[var(--asphalt)]">
                        <Check size={13} strokeWidth={2} />
                      </span>
                      <span className="text-base text-[var(--asphalt)] leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white border border-[var(--line)] rounded-[6px] p-6 md:p-8">
                <SectionIndex code="03 — VOORWAARDEN" note="WAT BIEDEN WIJ?" />
                <h2 className="font-display-expanded text-2xl md:text-3xl text-[var(--asphalt)] mb-6">
                  WAT BIEDEN WIJ JOU?
                </h2>
                <ul className="space-y-3.5">
                  {vacancy.whatWeOffer.map((item) => (
                    <li key={item} className="flex items-start gap-3.5">
                      <span className="mt-1 w-5 h-5 rounded-[2px] border border-[var(--asphalt)] flex items-center justify-center shrink-0 text-[var(--asphalt)]">
                        <Check size={13} strokeWidth={2} />
                      </span>
                      <span className="text-base text-[var(--asphalt)] leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right 4 Columns: Sticky Sidebar (regio, uren, start) */}
            <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
              <div className="bg-[var(--asphalt)] text-[var(--paper)] rounded-[6px] border border-[var(--line-dark)] p-6 md:p-8 space-y-6">
                <div className="flex items-center justify-between border-b border-[var(--line-dark)] pb-4">
                  <span className="font-mono-label text-[var(--paper)]">
                    KENMERKEN
                  </span>
                  <span className="font-mono-label text-[var(--steel-light)]">
                    {vacancy.code}
                  </span>
                </div>

                <dl className="space-y-4">
                  <div className="border-b border-[var(--line-dark)] pb-3">
                    <dt className="font-mono-label text-[var(--steel-light)]">
                      STANDPLAATS / REGIO
                    </dt>
                    <dd className="text-base font-semibold text-[var(--paper)] mt-1">
                      {vacancy.region}
                    </dd>
                  </div>
                  <div className="border-b border-[var(--line-dark)] pb-3">
                    <dt className="font-mono-label text-[var(--steel-light)]">
                      UREN PER WEEK
                    </dt>
                    <dd className="text-base font-semibold text-[var(--paper)] mt-1">
                      {vacancy.hours} ({vacancy.employmentType})
                    </dd>
                  </div>
                  <div className="border-b border-[var(--line-dark)] pb-3">
                    <dt className="font-mono-label text-[var(--steel-light)]">
                      STARTDATUM
                    </dt>
                    <dd className="text-base font-semibold text-[var(--paper)] mt-1">
                      {vacancy.startLabel}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono-label text-[var(--steel-light)]">
                      INDICATIE BELONING
                    </dt>
                    <dd className="text-base font-semibold text-[var(--paper)] mt-1">
                      {vacancy.salaryIndication}
                    </dd>
                  </div>
                </dl>

                <a
                  href="#solliciteren"
                  className="w-full h-[52px] px-6 bg-[var(--signal)] hover:bg-[var(--signal-hover)] text-[var(--asphalt)] font-semibold text-[15px] rounded-[2px] flex items-center justify-center transition-colors"
                >
                  Solliciteer op deze functie →
                </a>

                <div className="pt-2 border-t border-[var(--line-dark)]">
                  <span className="font-mono-label text-[var(--steel-light)] block">
                    LIEVER EERST EVEN BELLEN?
                  </span>
                  <a
                    href={getPhoneHref(company.phoneRaw)}
                    className="font-mono text-base font-semibold text-[var(--paper)] hover:text-[var(--signal)] mt-1 inline-block"
                  >
                    {company.phoneDisplay}
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Embedded Application Form */}
      <section
        id="solliciteren"
        className="py-[clamp(80px,10vw,140px)] bg-white scroll-mt-20"
      >
        <div className="mx-auto max-w-[1360px] px-4 md:px-6">
          <SectionIndex
            code="04 — SOLLICITATIEFORMULIER"
            note={vacancy.title.toUpperCase()}
          />
          <div className="max-w-3xl">
            <h2 className="font-display-expanded text-display-h2 text-[var(--asphalt)] mb-4">
              SOLLICITEER DIRECT OP {vacancy.code}
            </h2>
            <p className="text-base text-[var(--steel)] mb-8">
              Vul je gegevens in en wij nemen binnen 2 werkdagen contact met je op.
            </p>
            <JobApplicationForm defaultVacancySlug={vacancy.slug} />
          </div>
        </div>
      </section>
    </div>
  );
}
