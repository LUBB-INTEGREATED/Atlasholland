'use client';

import React from 'react';

interface SectionIndexProps {
  code: string;
  note: string;
  dark?: boolean;
}

export function SectionIndex({ code, note, dark = false }: SectionIndexProps) {
  return (
    <div className="flex items-center gap-4 mb-8 md:mb-12">
      <span
        className={`font-mono-label whitespace-nowrap shrink-0 ${
          dark ? 'text-[var(--paper)]' : 'text-[var(--asphalt)]'
        }`}
      >
        {code}
      </span>
      <div
        className={`h-px flex-1 ${
          dark ? 'bg-[var(--line-dark)]' : 'bg-[var(--line)]'
        }`}
        aria-hidden="true"
      />
      <span
        className={`font-mono-label whitespace-nowrap shrink-0 ${
          dark ? 'text-[var(--steel-light)]' : 'text-[var(--steel)]'
        }`}
      >
        {note}
      </span>
    </div>
  );
}

interface LaneLineDividerProps {
  dark?: boolean;
  className?: string;
}

export function LaneLineDivider({ dark = false, className = '' }: LaneLineDividerProps) {
  return (
    <div className={`w-full overflow-hidden ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1360 4"
        fill="none"
        preserveAspectRatio="none"
        className="w-full h-[2px] block"
      >
        <line
          x1="0"
          y1="2"
          x2="1360"
          y2="2"
          stroke={dark ? 'var(--line-dark)' : 'var(--line)'}
          strokeWidth="2"
          strokeDasharray="24 16"
        />
      </svg>
    </div>
  );
}

export function VisibleGridLines({ dark = false }: { dark?: boolean }) {
  const lineClass = dark ? 'bg-[var(--line-dark)]/55' : 'bg-[var(--line)]/75';
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 mx-auto max-w-[1360px] px-4 md:px-6"
    >
      <div className="relative h-full w-full grid grid-cols-4">
        <div className={`h-full w-px ${lineClass}`} />
        <div className={`h-full w-px ${lineClass}`} />
        <div className={`h-full w-px ${lineClass}`} />
        <div className={`h-full w-px ${lineClass} flex justify-end`}>
          <div className={`h-full w-px ${lineClass}`} />
        </div>
      </div>
    </div>
  );
}

export function RevealBlock({
  children,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

export function RevealHeadlineLines({
  lines,
  className = '',
}: {
  lines: React.ReactNode[];
  className?: string;
}) {
  return (
    <span className={`block ${className}`}>
      {lines.map((line, idx) => (
        <span key={idx} className="block">
          {line}
        </span>
      ))}
    </span>
  );
}
