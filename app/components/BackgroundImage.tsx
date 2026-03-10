import Image from "next/image";

interface BackgroundImageProps {
  src: string;
  alt: string;
}

export default function BackgroundImage({ src, alt }: BackgroundImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority
      className="object-cover"
      suppressHydrationWarning
    />
  );
}
