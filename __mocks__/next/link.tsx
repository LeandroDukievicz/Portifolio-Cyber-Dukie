// Mock automático de next/link para testes Jest
import React from "react";

type LinkProps = {
  children: React.ReactNode;
  href: string;
  [key: string]: unknown;
};

function NextLink({ children, href, ...props }: LinkProps) {
  return React.createElement("a", { href, ...props }, children);
}

NextLink.displayName = "NextLink";

export default NextLink;
