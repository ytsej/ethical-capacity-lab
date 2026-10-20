"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const TARGETS = "main .section > .container > *, main .section-tight > .container > *, main [data-reveal]";

/**
 * Fades section content in as it enters the viewport.
 * Content stays visible without JavaScript and under reduced motion; anything already
 * on screen is marked revealed before hiding starts, so nothing above the fold flashes.
 */
export function RevealOnScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;

    const elements = Array.from(document.querySelectorAll<HTMLElement>(TARGETS));
    const viewportBottom = window.innerHeight;
    for (const element of elements) {
      if (element.getBoundingClientRect().top < viewportBottom) element.dataset.revealed = "instant";
    }
    document.documentElement.classList.add("js-reveal");

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        (entry.target as HTMLElement).dataset.revealed = "";
        observer.unobserve(entry.target);
      }
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    for (const element of elements) {
      if (!("revealed" in element.dataset)) observer.observe(element);
    }
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
