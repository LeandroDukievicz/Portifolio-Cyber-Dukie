"use client";

import dynamic from "next/dynamic";

const TerminalWindow = dynamic(() => import("./TerminalWindow"), { ssr: false });

export default function TerminalWindowLazy() {
  return <TerminalWindow />;
}
