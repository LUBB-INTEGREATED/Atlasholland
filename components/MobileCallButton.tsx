'use client';

import React, { useEffect, useState } from 'react';
import { Phone } from 'lucide-react';
import { company, getPhoneHref } from '@/src/config/company';

export function MobileCallButton() {
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const footerEl = document.getElementById('site-footer');
    if (!footerEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setFooterVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(footerEl);
    return () => observer.disconnect();
  }, []);

  if (footerVisible) return null;

  return (
    <a
      href={getPhoneHref(company.phoneRaw)}
      aria-label={`Bel direct 24/7 planning: ${company.phoneDisplay}`}
      className="md:hidden fixed bottom-5 right-5 z-40 w-[56px] h-[56px] bg-[var(--signal)] hover:bg-[var(--signal-hover)] text-[var(--asphalt)] rounded-[2px] border border-[var(--asphalt)]/15 flex items-center justify-center transition-transform duration-150 active:scale-95"
    >
      <Phone size={24} strokeWidth={1.75} />
    </a>
  );
}
