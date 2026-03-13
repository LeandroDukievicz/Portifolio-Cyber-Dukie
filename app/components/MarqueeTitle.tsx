"use client";

import { useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

const COLOR = "#ffffff";

function svg(viewBox: string, content: string) {
  return `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}">${content}</svg>`
  )}`;
}

const FAVICONS = [
  // VscCode
  svg(
    "0 0 16 16",
    `<path fill="${COLOR}" d="M4.708 5.578L2.061 8.224l2.647 2.646-.708.708-3-3V7.87l3-3 .708.708zm7-.708L11 5.578l2.647 2.646L11 10.87l.708.708 3-3V7.87l-3-3zM4.908 13l.894.448 5-10L9.908 3l-5 10z"/>`
  ),
  
  // CgCoffee
  svg(
    "0 0 24 24",
    `<path fill="${COLOR}" d="M6 2.5C5.44772 2.5 5 2.94772 5 3.5V5.5C5 6.05228 5.44772 6.5 6 6.5C6.55228 6.5 7 6.05228 7 5.5V3.5C7 2.94772 6.55228 2.5 6 2.5Z"/>
     <path fill="${COLOR}" fill-rule="evenodd" clip-rule="evenodd" d="M13 21.5C15.973 21.5 18.441 19.3377 18.917 16.5H19C21.2091 16.5 23 14.7091 23 12.5C23 10.2909 21.2091 8.5 19 8.5V7.5H1V15.5C1 18.8137 3.68629 21.5 7 21.5H13ZM3 9.5V15.5C3 17.7091 4.79086 19.5 7 19.5H13C15.2091 19.5 17 17.7091 17 15.5V9.5H3ZM21 12.5C21 13.6046 20.1046 14.5 19 14.5V10.5C20.1046 10.5 21 11.3954 21 12.5Z"/>
     <path fill="${COLOR}" d="M9 3.5C9 2.94772 9.44771 2.5 10 2.5C10.5523 2.5 11 2.94772 11 3.5V5.5C11 6.05228 10.5523 6.5 10 6.5C9.44771 6.5 9 6.05228 9 5.5V3.5Z"/>
     <path fill="${COLOR}" d="M14 2.5C13.4477 2.5 13 2.94772 13 3.5V5.5C13 6.05228 13.4477 6.5 14 6.5C14.5523 6.5 15 6.05228 15 5.5V3.5C15 2.94772 14.5523 2.5 14 2.5Z"/>`
  ),
  // VscCoffee
  svg(
    "0 0 16 16",
    `<path fill="${COLOR}" d="M3 1V1.5C3 1.96954 3.27449 2.20587 3.8 2.6L3.83977 2.62978C4.31392 2.98457 5 3.49793 5 4.5V5H4V4.5C4 4.03046 3.72551 3.79413 3.2 3.4L3.16023 3.37022C2.68608 3.01543 2 2.50207 2 1.5V1H3Z"/>
     <path fill="${COLOR}" d="M6 1V1.5C6 1.96954 6.27449 2.20587 6.8 2.6L6.83977 2.62978C7.31392 2.98457 8 3.49793 8 4.5V5H7V4.5C7 4.03046 6.72551 3.79413 6.2 3.4L6.16023 3.37022C5.68608 3.01543 5 2.50207 5 1.5V1H6Z"/>
     <path fill="${COLOR}" d="M9 1V1.5C9 1.96954 9.27449 2.20587 9.8 2.6L9.83977 2.62978C10.3139 2.98457 11 3.49793 11 4.5V5H10V4.5C10 4.03046 9.72551 3.79413 9.2 3.4L9.16023 3.37022C8.68608 3.01543 8 2.50207 8 1.5V1H9Z"/>
     <path fill="${COLOR}" fill-rule="evenodd" clip-rule="evenodd" d="M2 7L3 6H13.5C14.8807 6 16 7.11929 16 8.5C16 9.88071 14.8807 11 13.5 11H12.874C12.4299 12.7252 10.8638 14 9 14H6C3.79086 14 2 12.2091 2 10V7ZM12 10V7H3V10C3 11.6569 4.34315 13 6 13H9C10.6569 13 12 11.6569 12 10ZM13 7V10H13.5C14.3284 10 15 9.32843 15 8.5C15 7.67157 14.3284 7 13.5 7H13Z"/>`
  ),
  // TfiInfinite
  svg(
    "0 0 17 17",
    `<path fill="${COLOR}" d="M17 8c0 2.206-1.794 4-4 4-1.197 0-2.31-0.532-3.074-1.452l-0.002 0.001-0.014-0.018c-0.011-0.014-0.026-0.023-0.038-0.038l0.004-0.003-3.634-4.482c-0.569-0.64-1.386-1.008-2.242-1.008-1.654 0-3 1.346-3 3 0 1.654 1.346 3 3 3 0.915 0 1.769-0.41 2.342-1.125l0.009 0.007 0.817-1.012 0.778 0.628-0.823 1.019-0.010-0.008c-0.763 0.947-1.897 1.491-3.113 1.491-2.206 0-4-1.794-4-4 0-2.206 1.794-4 4-4 1.12 0 2.186 0.477 2.943 1.301l0.008-0.006 0.042 0.052 3.698 4.56c0.573 0.693 1.409 1.093 2.309 1.093 1.654 0 3-1.346 3-3 0-1.654-1.346-3-3-3-0.846 0-1.65 0.362-2.22 0.989l-0.948 1.175-0.778-0.628 0.948-1.175-0.004-0.003c0.76-0.863 1.855-1.358 3.002-1.358 2.206 0 4 1.794 4 4z"/>`
  ),
];

function setFavicon(href: string) {
  let link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }
  link.href = href;
}

export default function MarqueeTitle() {
  const { t } = useLanguage();

  useEffect(() => {
    const TITLE = t.marquee;
    let titleIndex = 0;
    const titleInterval = setInterval(() => {
      document.title = TITLE.slice(titleIndex) + TITLE.slice(0, titleIndex);
      titleIndex = (titleIndex + 1) % TITLE.length;
    }, 150);

    // Cycling favicons
    let faviconIndex = 0;
    setFavicon(FAVICONS[0]);
    const faviconInterval = setInterval(() => {
      faviconIndex = (faviconIndex + 1) % FAVICONS.length;
      setFavicon(FAVICONS[faviconIndex]);
    }, 800);

    return () => {
      clearInterval(titleInterval);
      clearInterval(faviconInterval);
    };
  }, [t.marquee]);

  return null;
}
