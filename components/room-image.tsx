"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";

const FALLBACK_ROOM_IMAGE =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" role="img" aria-label="Room image placeholder"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#f2e8dc"/><stop offset="1" stop-color="#e2d2c2"/></linearGradient></defs><rect width="1200" height="800" fill="url(#g)"/><rect x="80" y="80" width="1040" height="640" rx="32" fill="#fff8f1" opacity=".9"/><path d="M270 530h660l-70-126-100 82-88-126-120 102-74-60-208 128z" fill="#d7b08a"/><circle cx="370" cy="290" r="58" fill="#b8794f"/><text x="50%" y="655" text-anchor="middle" font-family="Arial, sans-serif" font-size="38" fill="#7a4c2d">Terra Lodge</text></svg>',
  );

type RoomImageProps = Omit<ImageProps, "src"> & {
  src: string;
};

export default function RoomImage({ alt, src, onError, ...props }: RoomImageProps) {
  const [imageSrc, setImageSrc] = useState(src);

  return (
    <Image
      alt={alt}
      {...props}
      onError={(event) => {
        setImageSrc(FALLBACK_ROOM_IMAGE);
        onError?.(event);
      }}
      src={imageSrc}
    />
  );
}
