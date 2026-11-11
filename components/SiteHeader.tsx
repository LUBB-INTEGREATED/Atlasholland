'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, ChevronDown, Menu, Phone, X } from 'lucide-react';
import { company, getPhoneHref } from '@/src/config/company';
import { nl, ServiceItem } from '@/src/content/nl';
import { AtlasLogo } from './AtlasLogo';

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredService, setHoveredService] = useState<ServiceItem>(nl.services[0]);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMegaOpen(false);
        setMobileOpen(false);
      }
    };
    const onClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMegaOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onClickOutside);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, []);

  const operationalServices = nl.services.filter((s) => s.group === 'operationeel');
  const planningServices = nl.services.filter((s) => s.group === 'planning-advies');
  const totalServices = nl.services.filter((s) => s.group === 'totaaloplossingen');

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 w-full transition-colors duration-200 ${
        scrolled || megaOpen || mobileOpen
          ? 'bg-[var(--paper)] border-b border-[var(--line)] shadow-[0_4px_20px_rgba(15,16,18,0.05)]'
          : 'bg-[var(--paper)]/90 backdrop-blur-xs border-b border-transparent'
      }`}
    >
      <div className="mx-auto max-w-[1360px] px-4 md:px-6 h-20 flex items-center justify-between gap-6">
        {/* Left: Logo */}
        <Link
          href="/"
          aria-label={`${company.name} — Naar startpagina`}
          className="shrink-0 py-1 focus-visible:outline-2 focus-visible:outline-[var(--signal)]"
        >
          <AtlasLogo variant="light" className="h-12 md:h-13 w-auto" />
        </Link>

        {/* Center: Navigation (Desktop) */}
        <nav aria-label="Hoofdnavigatie" className="hidden lg:flex items-center gap-8">
          {nl.nav.items.map((item) => {
            const active = isActive(item.href);

            if (item.hasMega) {
              return (
                <div
                  key={item.href}
                  className="relative flex items-center"
                  onMouseEnter={() => setMegaOpen(true)}
                >
                  <Link
                    href={item.href}
                    className={`text-[15px] font-medium py-2 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                      active || megaOpen
                        ? 'border-[var(--signal)] text-[var(--asphalt)]'
                        : 'border-transparent text-[var(--asphalt)] hover:text-[var(--steel)]'
                    }`}
                  >
                    {item.label}
                  </Link>
                  <button
                    type="button"
                    aria-expanded={megaOpen}
                    aria-controls="diensten-mega-panel"
                    aria-label="Open overzicht diensten"
                    onClick={() => setMegaOpen((prev) => !prev)}
                    className="ml-1 p-1 text-[var(--asphalt)] hover:text-[var(--signal-ink)] transition-colors"
                  >
                    <ChevronDown
                      size={16}
                      strokeWidth={1.5}
                      className={`transition-transform duration-200 ${
                        megaOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                onMouseEnter={() => setMegaOpen(false)}
                className={`text-[15px] font-medium py-2 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                  active
                    ? 'border-[var(--signal)] text-[var(--asphalt)]'
                    : 'border-transparent text-[var(--asphalt)] hover:text-[var(--steel)]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: 24/7 Phone with Green Online Dot + Primary CTA */}
        <div className="hidden lg:flex items-center gap-6 shrink-0">
          <a
            href={getPhoneHref(company.phoneRaw)}
            className="group flex items-center gap-2.5 text-sm font-medium text-[var(--asphalt)] hover:text-[var(--signal-ink)] transition-colors whitespace-nowrap shrink-0"
          >
            <span
              className="w-2 h-2 rounded-full bg-[var(--ok)] shrink-0"
              aria-hidden="true"
            />
            <span className="font-mono-label text-[var(--steel)]">
              {nl.nav.statusLabel}
            </span>
            <span aria-hidden="true" className="text-[var(--line)]">
              ·
            </span>
            <span className="font-mono text-xs tracking-wider font-medium text-[var(--asphalt)] group-hover:underline">
              {company.phoneDisplay}
            </span>
          </a>

          <Link
            href={nl.nav.ctaHref}
            className="group inline-flex items-center justify-center h-[52px] px-6 bg-[var(--signal)] hover:bg-[var(--signal-hover)] text-[var(--asphalt)] font-semibold text-[15px] rounded-[2px] transition-colors whitespace-nowrap shrink-0"
          >
            <span>{nl.nav.ctaLabel}</span>
            <ArrowRight
              size={18}
              strokeWidth={1.5}
              className="ml-2 transition-transform duration-150 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Mobile Controls */}
        <div className="flex lg:hidden items-center gap-3">
          <a
            href={getPhoneHref(company.phoneRaw)}
            aria-label={`Bel direct ${company.phoneDisplay}`}
            className="inline-flex items-center gap-1.5 px-3 h-11 border border-[var(--line)] rounded-[2px] text-xs font-mono uppercase tracking-wider text-[var(--asphalt)] bg-white"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--ok)]" aria-hidden="true" />
            <span>24/7</span>
          </a>
          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileOpen ? 'Sluit menu' : 'Open menu'}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex items-center justify-center w-11 h-11 border border-[var(--line)] rounded-[2px] text-[var(--asphalt)] bg-white"
          >
            {mobileOpen ? (
              <X size={22} strokeWidth={1.5} />
            ) : (
              <Menu size={22} strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      {/* Diensten Mega Panel (Desktop) */}
      {megaOpen && (
        <div
          id="diensten-mega-panel"
          onMouseLeave={() => setMegaOpen(false)}
          className="hidden lg:block w-full bg-[var(--paper)] border-t border-b border-[var(--line)] shadow-[0_16px_36px_rgba(15,16,18,0.08)]"
        >
          <div className="mx-auto max-w-[1360px] px-6 py-10 grid grid-cols-12 gap-8">
            {/* Column 1: Operationeel */}
            <div className="col-span-3 border-r border-[var(--line)] pr-6">
              <p className="font-mono-label text-[var(--steel)] mb-4">
                01 / {nl.nav.megaMenuGroups.operationeel}
              </p>
              <ul className="space-y-1">
                {operationalServices.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/diensten/${service.slug}`}
                      onClick={() => setMegaOpen(false)}
                      onMouseEnter={() => setHoveredService(service)}
                      onFocus={() => setHoveredService(service)}
                      className="group flex items-center justify-between py-2.5 px-2 -mx-2 rounded-[2px] hover:bg-white transition-colors"
                    >
                      <span className="text-[15px] font-medium text-[var(--asphalt)] group-hover:text-[var(--signal-ink)]">
                        {service.title}
                      </span>
                      <ArrowRight
                        size={15}
                        strokeWidth={1.5}
                        className="text-[var(--steel)] opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Planning & Advies */}
            <div className="col-span-3 border-r border-[var(--line)] pr-6">
              <p className="font-mono-label text-[var(--steel)] mb-4">
                02 / {nl.nav.megaMenuGroups['planning-advies']}
              </p>
              <ul className="space-y-1">
                {planningServices.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/diensten/${service.slug}`}
                      onClick={() => setMegaOpen(false)}
                      onMouseEnter={() => setHoveredService(service)}
                      onFocus={() => setHoveredService(service)}
                      className="group flex items-center justify-between py-2.5 px-2 -mx-2 rounded-[2px] hover:bg-white transition-colors"
                    >
                      <span className="text-[15px] font-medium text-[var(--asphalt)] group-hover:text-[var(--signal-ink)]">
                        {service.title}
                      </span>
                      <ArrowRight
                        size={15}
                        strokeWidth={1.5}
                        className="text-[var(--steel)] opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Totaaloplossingen */}
            <div className="col-span-3 border-r border-[var(--line)] pr-6 flex flex-col justify-between">
              <div>
                <p className="font-mono-label text-[var(--steel)] mb-4">
                  03 / {nl.nav.megaMenuGroups.totaaloplossingen}
                </p>
                <ul className="space-y-1">
                  {totalServices.map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={`/diensten/${service.slug}`}
                        onMouseEnter={() => setHoveredService(service)}
                        onFocus={() => setHoveredService(service)}
                        className="group flex items-center justify-between py-2.5 px-2 -mx-2 rounded-[2px] hover:bg-white transition-colors"
                      >
                        <span className="text-[15px] font-medium text-[var(--asphalt)] group-hover:text-[var(--signal-ink)]">
                          {service.title}
                        </span>
                        <ArrowRight
                          size={15}
                          strokeWidth={1.5}
                          className="text-[var(--steel)] opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-[var(--line)] mt-6 space-y-2">
                <Link
                  href="/diensten"
                  className="group inline-flex items-center text-sm font-semibold text-[var(--asphalt)] hover:text-[var(--signal-ink)]"
                >
                  <span>{nl.nav.megaMenuAllLabel}</span>
                  <ArrowRight
                    size={15}
                    strokeWidth={1.5}
                    className="ml-1.5 transition-transform group-hover:translate-x-1"
                  />
                </Link>
                <div>
                  <Link
                    href="/werken-bij"
                    className="inline-block font-mono-label text-[var(--steel)] hover:text-[var(--asphalt)] underline underline-offset-4"
                  >
                    {nl.nav.megaMenuRecruitLabel} →
                  </Link>
                </div>
              </div>
            </div>

            {/* Column 4: Hover Photo Preview */}
            <div className="col-span-3 flex flex-col justify-between">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[6px] border border-[var(--line)] bg-[var(--asphalt)]">
                {/* TODO: replace with real Atlas photo */}
                <img
                  src={hoveredService.image}
                  alt={hoveredService.imageAlt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-300 scale-100"
                />
                <div className="absolute top-3 left-3 bg-[var(--asphalt)]/90 px-2.5 py-1 rounded-[2px] border border-[var(--line-dark)]">
                  <span className="font-mono-label text-[var(--paper)]">
                    {hoveredService.number} — {hoveredService.groupLabel}
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-base font-semibold text-[var(--asphalt)]">
                  {hoveredService.title}
                </p>
                <p className="text-sm text-[var(--steel)] line-clamp-2 mt-1">
                  {hoveredService.shortDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Full-Screen Menu */}
      {mobileOpen && (
        <div
          id="mobile-navigation-drawer"
          className="lg:hidden fixed inset-x-0 top-20 bottom-0 z-50 bg-[var(--paper)] overflow-y-auto flex flex-col justify-between p-6"
        >
          <div className="space-y-6">
            <nav aria-label="Mobiele navigatie" className="divide-y divide-[var(--line)] border-t border-b border-[var(--line)]">
              {nl.nav.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center justify-between py-4 text-xl font-semibold text-[var(--asphalt)]"
                >
                  <span>{item.label}</span>
                  <ArrowRight size={20} strokeWidth={1.5} />
                </Link>
              ))}
            </nav>

            <div>
              <p className="font-mono-label text-[var(--steel)] mb-3">
                SNEL NAAR SPECIALISMEN
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {nl.services.slice(0, 6).map((s) => (
                  <Link
                    key={s.slug}
                    href={`/diensten/${s.slug}`}
                    className="py-2.5 px-3 bg-white border border-[var(--line)] rounded-[2px] text-sm font-medium text-[var(--asphalt)] flex items-center justify-between"
                  >
                    <span>{s.title}</span>
                    <span className="font-mono-label text-[var(--steel)]">{s.number}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6 space-y-3 border-t border-[var(--line)] mt-8">
            <Link
              href="/offerte-aanvragen"
              className="w-full h-[52px] bg-[var(--signal)] text-[var(--asphalt)] font-semibold text-base rounded-[2px] flex items-center justify-center gap-2"
            >
              <span>{nl.nav.ctaLabel}</span>
              <ArrowRight size={18} strokeWidth={1.5} />
            </Link>
            <a
              href={getPhoneHref(company.phoneRaw)}
              className="w-full h-[52px] bg-[var(--asphalt)] text-[var(--paper)] font-mono text-sm uppercase tracking-wider rounded-[2px] flex items-center justify-center gap-2.5"
            >
              <Phone size={17} strokeWidth={1.5} />
              <span>24/7 PLANNING: {company.phoneDisplay}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
