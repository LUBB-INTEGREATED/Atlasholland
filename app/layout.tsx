import type { Metadata } from 'next';
import { Archivo, Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { company } from '@/src/config/company';
import { nl } from '@/src/content/nl';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { MobileCallButton } from '@/components/MobileCallButton';

const archivo = Archivo({
  subsets: ['latin'],
  weight: 'variable',
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap',
});

const geistSans = Geist({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-geist-sans',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  weight: ['500'],
  variable: '--font-geist-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: nl.meta.defaultTitle,
    template: `%s | ${company.name}`,
  },
  description: nl.meta.defaultDescription,
  openGraph: {
    title: nl.meta.defaultTitle,
    description: nl.meta.defaultDescription,
    siteName: company.name,
    locale: 'nl_NL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: nl.meta.defaultTitle,
    description: nl.meta.defaultDescription,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: company.name,
    description: nl.meta.defaultDescription,
    telephone: company.phoneRaw,
    email: company.email,
    foundingDate: String(company.foundingYear),
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.address.street,
      postalCode: company.address.postalCode,
      addressLocality: company.address.city,
      addressRegion: company.address.region,
      addressCountry: 'NL',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '00:00',
      closes: '23:59',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Nederland',
    },
  };

  return (
    <html
      lang="nl"
      className={`${archivo.variable} ${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-screen flex flex-col bg-[var(--paper)] text-[var(--asphalt)] selection:bg-[var(--signal)] selection:text-[var(--asphalt)]"
      >
        {/* Global SVG Filter Definitions for exact uploaded Atlas Logo rendering on Light and Dark surfaces */}
        <svg
          aria-hidden="true"
          className="sr-only pointer-events-none absolute w-0 h-0 overflow-hidden"
        >
          <defs>
            {/* Removes white JPEG background while keeping black #000 and orange #F4721E untouched */}
            <filter id="atlas-logo-light-filter" colorInterpolationFilters="sRGB">
              <feColorMatrix
                type="matrix"
                values="
                  1 0 0 0 0
                  0 1 0 0 0
                  0 0 1 0 0
                  0 0 -3.2 2.85 0
                "
              />
            </filter>
            {/* Removes white JPEG background, converts black parts to crisp white #FFF, keeps orange swoosh #F4721E */}
            <filter id="atlas-logo-dark-filter" colorInterpolationFilters="sRGB">
              <feColorMatrix
                type="matrix"
                values="
                  0 0 0 0 1
                  -1 1 0 0 1
                  -1 0 0 0 1
                  0 0 -3.2 2.85 0
                "
              />
            </filter>
          </defs>
        </svg>

        <SiteHeader />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <MobileCallButton />
      </body>
    </html>
  );
}
