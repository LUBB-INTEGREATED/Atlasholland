import React from 'react';
import { company } from '@/src/config/company';

interface AtlasLogoProps {
  variant?: 'light' | 'dark';
  className?: string;
}

export function AtlasLogo({ variant = 'light', className = 'h-12 w-auto' }: AtlasLogoProps) {
  const filterUrl =
    variant === 'dark' ? 'url(#atlas-logo-dark-filter)' : 'url(#atlas-logo-light-filter)';

  return (
    <span className="inline-flex items-center select-none">
      {/* Uses the exact uploaded logo file with corner artifact clipped out */}
      <img
        src="/assets/aistudio/WhatsApp_Image_2026-11-07_at_20.55.23_c868a7b5.jpeg"
        alt={company.name}
        width={180}
        height={118}
        referrerPolicy="no-referrer"
        className={`${className} object-contain block`}
        style={{
          filter: filterUrl,
          clipPath: 'polygon(7.5% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 14%, 7.5% 14%)',
        }}
      />
    </span>
  );
}
