import { useState } from "react";

interface ImageCarouselProps {
  images: string[];
  alt: string;
}

export default function ImageCarousel({ images, alt }: ImageCarouselProps) {
  const [index, setIndex] = useState(0);

  if (images.length === 0) return null;

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <div className="mb-8">
      <div className="relative border-2 border-stroke overflow-hidden bg-surface">
        <img
          src={images[index]}
          alt={`${alt} — image ${index + 1} of ${images.length}`}
          className="w-full aspect-[16/9] object-cover"
        />
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center border-2 border-stroke bg-bg font-display text-xl hover:bg-text-primary hover:text-bg transition-colors"
            >
              ←
            </button>
            <button
              onClick={next}
              aria-label="Next image"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center border-2 border-stroke bg-bg font-display text-xl hover:bg-text-primary hover:text-bg transition-colors"
            >
              →
            </button>
            <span className="absolute bottom-2 right-2 tag-bar bg-ink">
              {index + 1} / {images.length}
            </span>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 mt-3">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to image ${i + 1}`}
              className={`w-2.5 h-2.5 border border-stroke ${i === index ? "bg-ink" : "bg-bg"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
