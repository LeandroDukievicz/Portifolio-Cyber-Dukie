// Mock automático de next/image para testes Jest
import React from "react";

type ImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
  className?: string;
  [key: string]: unknown;
};

function NextImage({ src, alt, width, height, style, className }: ImageProps) {
  return React.createElement("img", { src, alt, width, height, style, className });
}

NextImage.displayName = "NextImage";

export default NextImage;
