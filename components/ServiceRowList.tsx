'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ServiceItem } from '@/src/content/nl';

interface ServiceRowListProps {
  services: ServiceItem[];
  showInlineMobilePhoto?: boolean;
}

export function ServiceRowList({
  services,
  showInlineMobilePhoto = true,
}: ServiceRowListProps) {
  const [hoveredService, setHoveredService] = useState<ServiceItem | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      className="relative border-b border-[var(--line)]"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoveredService(null)}
    >
      {services.map((service) => (
        <Link
          key={service.slug}
          href={`/diensten/${service.slug}`}
          onMouseEnter={() => setHoveredService(service)}
          onFocus={() => setHoveredService(service)}
          onBlur={() => setHoveredService(null)}
          className="group block border-t border-[var(--line)] py-6 md:py-7 px-3 -mx-3 sm:px-4 sm:-mx-4 transition-colors duration-150 hover:bg-white focus-visible:bg-white"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 items-start md:items-center">
            {/* Mono Number */}
            <div className="md:col-span-1 flex items-center justify-between">
              <span className="font-mono-label text-[var(--steel)] group-hover:text-[var(--signal-ink)] transition-colors">
                {service.number}
              </span>
              <ArrowRight
                size={18}
                strokeWidth={1.5}
                className="md:hidden text-[var(--asphalt)] transition-transform duration-150 group-hover:translate-x-1"
              />
            </div>

            {/* Service Name (H3: 1.375rem, Geist 600) */}
            <div className="md:col-span-4">
              <h3 className="text-[1.375rem] leading-snug font-semibold text-[var(--asphalt)] group-hover:text-[var(--signal-ink)] transition-colors">
                {service.title}
              </h3>
            </div>

            {/* One-line / Concise Description */}
            <div className="md:col-span-6">
              <p className="text-[15px] text-[var(--steel)] line-clamp-2 md:line-clamp-1">
                {service.shortDescription}
              </p>
            </div>

            {/* Arrow Right (Desktop) */}
            <div className="hidden md:flex md:col-span-1 justify-end">
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-[2px] border border-transparent group-hover:border-[var(--line)] text-[var(--asphalt)] transition-all">
                <ArrowRight
                  size={18}
                  strokeWidth={1.5}
                  className="transition-transform duration-150 group-hover:translate-x-1"
                />
              </span>
            </div>
          </div>

          {/* Mobile Inline Photo */}
          {showInlineMobilePhoto && (
            <div className="mt-4 md:hidden overflow-hidden rounded-[6px] border border-[var(--line)] aspect-[16/9] bg-[var(--asphalt)]">
              {/* TODO: replace with real Atlas photo */}
              <img
                src={service.image}
                alt={service.imageAlt}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </Link>
      ))}

      {/* Desktop Floating Photo Preview Following Cursor */}
      {hoveredService && (
        <div
          aria-hidden="true"
          className="hidden lg:block pointer-events-none absolute z-30 w-72 rounded-[6px] overflow-hidden border border-[var(--line)] bg-[var(--asphalt)] transition-opacity duration-150"
          style={{
            left: `${Math.min(Math.max(cursorPos.x + 28, 40), 560)}px`,
            top: `${Math.max(cursorPos.y - 90, 0)}px`,
          }}
        >
          <div className="aspect-[4/3] w-full overflow-hidden">
            {/* TODO: replace with real Atlas photo */}
            <img
              src={hoveredService.image}
              alt=""
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover scale-103 transition-transform duration-300"
            />
          </div>
          <div className="px-3 py-2 bg-[var(--asphalt)] text-[var(--paper)] flex items-center justify-between border-t border-[var(--line-dark)]">
            <span className="font-mono-label text-[var(--paper)]">
              {hoveredService.number} — {hoveredService.groupLabel}
            </span>
            <span className="font-mono-label text-[var(--steel-light)]">BEKIJK →</span>
          </div>
        </div>
      )}
    </div>
  );
}
