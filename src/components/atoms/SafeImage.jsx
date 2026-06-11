'use client';

import { useState } from 'react';

function toWebpSrc(src) {
  if (!src) return null;
  const ext = src.lastIndexOf('.');
  if (ext === -1) return null;
  return src.slice(0, ext) + '.webp';
}

export function SafeImage({ src, alt, className, style, width, height, loading, fetchPriority, onError, ...rest }) {
  const [fallback, setFallback] = useState(false);
  const webpSrc = toWebpSrc(src);

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
        onError={(e) => {
          if (!fallback) {
            setFallback(true);
          }
          if (onError) onError(e);
        }}
        {...rest}
      />
    </picture>
  );
}
