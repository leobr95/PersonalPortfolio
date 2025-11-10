'use client';

import Image from 'next/image';
import { useState } from 'react';

type Props = {
  src: string;
  alt: string;
  initials?: string;
  size?: number; // px
};

export default function Avatar({ src, alt, initials = 'LB', size = 140 }: Props) {
  const [error, setError] = useState(false);

  return (
    <div
      className="pf-avatar"
      style={{ width: size, height: size, position: 'relative' }}
      aria-label={alt}
    >
      {!error ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={`${size}px`}
          onError={() => setError(true)}
          style={{ objectFit: 'cover' }}
          priority
        />
      ) : (
        <div className="pf-initials" aria-hidden>
          {initials}
        </div>
      )}
    </div>
  );
}
