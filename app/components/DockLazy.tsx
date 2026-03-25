"use client";

import dynamic from "next/dynamic";

const Dock = dynamic(() => import("./Dock"), { ssr: false });

export default function DockLazy() {
  return <Dock />;
}
