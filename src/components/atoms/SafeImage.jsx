'use client';

import { useState } from 'react';

function toWebpSrc(src) {
  if (!src || src.startsWith('data:') || src.endsWith('.svg')) return null;
  const ext = src.lastIndexOf('.');
  if (ext === -1) return null;
  return src.slice(0, ext) + '.webp';
}

export function SafeImage({ src, alt, className, style, width, height, loading = 'lazy', fetchPriority, disableWebp = false, onError, ...rest }) {
  const [fallback, setFallback] = useState(false);
  const webpSrc = !disableWebp ? toWebpSrc(src) : null;

  return (
    <picture>
      {webpSrc && !fallback && (
        <source srcSet={webpSrc} type="image/webp" />
      )}
      <img
        src={src}
        alt={alt}
        className={className}
        style={style}
        width={width}
        height={height}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
        onError={(e) => {
          if (webpSrc && !fallback) {
            setFallback(true);
            return;
          }
          if (onError) onError(e);
        }}
        {...rest}
      />
    </picture>
  );
}
