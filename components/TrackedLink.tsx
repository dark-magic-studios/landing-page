"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes, MouseEventHandler } from "react";
import { trackEvent } from "@/lib/gtag";

interface TrackedLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  external?: boolean;
  eventName: string;
  eventCategory: string;
  eventLabel?: string;
}

export default function TrackedLink({
  href,
  external,
  eventName,
  eventCategory,
  eventLabel,
  onClick,
  children,
  ...rest
}: TrackedLinkProps) {
  const handleClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    trackEvent(eventName, { category: eventCategory, label: eventLabel });
    onClick?.(e);
  };

  if (external) {
    return (
      <a href={href} onClick={handleClick} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
