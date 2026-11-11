'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'motion/react';
import { StatItem } from '@/src/config/company';

function CountUpNumber({
  target,
  prefix = '',
  suffix = '',
}: {
  target: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const prefersReducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView || prefersReducedMotion) return;

    let startTime: number | null = null;
    const duration = 1100;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(eased * target));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    const frameId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(frameId);
  }, [isInView, target, prefersReducedMotion]);

  const shownValue = prefersReducedMotion
    ? target
    : isInView
    ? displayValue
    : target;

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {shownValue}
      {suffix}
    </span>
  );
}

export function StatBlockGrid({
  stats,
  dark = true,
}: {
  stats: StatItem[];
  dark?: boolean;
}) {
  if (!stats || stats.length === 0) return null;

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-b ${
        dark ? 'border-[var(--line-dark)]' : 'border-[var(--line)]'
      }`}
    >
      {stats.map((stat, idx) => (
        <div
          key={stat.label}
          className={`py-8 md:py-10 ${
            idx > 0
              ? `sm:pl-8 lg:pl-10 border-t sm:border-t-0 ${
                  idx % 2 === 1 ? 'sm:border-l' : ''
                } lg:border-l ${
                  dark ? 'border-[var(--line-dark)]' : 'border-[var(--line)]'
                }`
              : ''
          } ${idx < stats.length - 1 ? 'sm:pr-6' : ''}`}
        >
          <p className="font-mono-label text-[var(--steel-light)] mb-3">
            0{idx + 1} / {stat.label}
          </p>
          <div
            className={`font-display-expanded text-[clamp(2.75rem,5vw,4.5rem)] leading-none ${
              dark ? 'text-[var(--paper)]' : 'text-[var(--asphalt)]'
            }`}
          >
            <CountUpNumber
              target={stat.value}
              prefix={stat.prefix}
              suffix={stat.suffix}
            />
          </div>
          <p
            className={`text-sm mt-3 ${
              dark ? 'text-[var(--steel-light)]' : 'text-[var(--steel)]'
            }`}
          >
            {stat.sublabel}
          </p>
        </div>
      ))}
    </div>
  );
}
