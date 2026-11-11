'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';

export interface FaqEntry {
  question: string;
  answer: string;
}

export function FaqAccordion({ items }: { items: FaqEntry[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!items || items.length === 0) return null;

  return (
    <div className="border-t border-[var(--line)]">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        const panelId = `faq-panel-${idx}`;
        const buttonId = `faq-button-${idx}`;

        return (
          <div key={item.question} className="border-b border-[var(--line)]">
            <button
              id={buttonId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="w-full py-5 md:py-6 flex items-center justify-between gap-6 text-left group"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-mono-label text-[var(--steel)] shrink-0">
                  0{idx + 1}
                </span>
                <span className="text-lg md:text-xl font-semibold text-[var(--asphalt)] group-hover:text-[var(--signal-ink)] transition-colors">
                  {item.question}
                </span>
              </div>
              <span
                aria-hidden="true"
                className="w-9 h-9 rounded-[2px] border border-[var(--line)] flex items-center justify-center shrink-0 text-[var(--asphalt)] group-hover:border-[var(--asphalt)] transition-colors"
              >
                <Plus
                  size={18}
                  strokeWidth={1.5}
                  className={`transition-transform duration-200 ${
                    isOpen ? 'rotate-45 text-[var(--signal-ink)]' : ''
                  }`}
                />
              </span>
            </button>

            {isOpen && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="pb-6 pl-0 md:pl-9 pr-4 md:pr-12 text-base text-[var(--steel)] leading-relaxed"
              >
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
