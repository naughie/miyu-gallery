import { useEffect, useRef, useState } from "react";

const makeUrl = (base: string, width: number) => {
  const thb = base.replace("/images", "/thumbnails");
  return `${thb}?w=${width}`;
};

interface Props {
  url: string;
  alt: string;
  onClick: () => void;
}

const Photo = ({ url, alt, onClick }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver((entries) => {
      const newWidth = entries[0].contentRect.width;
      setWidth(Math.round(newWidth));
    });

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [width]);

  const imgSrc = width > 0 ? makeUrl(url, width) : "";

  return (
    <div
      ref={ref}
      className="aspect-video cursor-pointer transform hover:scale-105 transition-transform duration-300"
      onClick={onClick}
    >
      <img
        src={imgSrc}
        alt={alt}
        className="w-full h-full object-cover rounded-lg shadow-lg"
        loading="lazy"
      />
    </div>
  );
};

export default Photo;
