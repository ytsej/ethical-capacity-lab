"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ecosystemMenu, primaryNavigation, workMenu, type NavigationLink } from "@/content/navigation";

const standalonePrimaryHrefs = new Set<string>(
  primaryNavigation.flatMap((item) => ("menu" in item ? [] : [item.href])),
);

function isPathActive(pathname: string, href: string) {
  return pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
}

function DesktopDropdown({ label, items }: { label: string; items: NavigationLink[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const wrapper = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const active = items.some((item) => isPathActive(pathname, item.href) && !standalonePrimaryHrefs.has(item.href));

  useEffect(() => {
    if (!open) return;
    function close(event: MouseEvent) {
      if (!wrapper.current?.contains(event.target as Node)) setOpen(false);
    }
    function escape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    }
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);

  return (
    <div className="desktop-dropdown" ref={wrapper}>
      <button ref={trigger} type="button" aria-expanded={open} aria-current={active ? "page" : undefined} onClick={() => setOpen((value) => !value)}>
        <span>{label}</span><span className="nav-chevron" aria-hidden="true" />
      </button>
      <div className={`dropdown-panel ${open ? "dropdown-panel-open" : ""}`} aria-hidden={!open} inert={!open ? true : undefined}>
        {items.map((item) => (
          <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
            <strong>{item.label}</strong>
            {item.description && <span>{item.description}</span>}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const mobileTrigger = useRef<HTMLButtonElement>(null);
  const mobilePanel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mobileOpen) return;
    const panel = mobilePanel.current;
    const focusable = panel?.querySelectorAll<HTMLElement>('a, button:not([disabled])');
    focusable?.[0]?.focus();
    document.body.classList.add("menu-open");

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMobileOpen(false);
        mobileTrigger.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.classList.remove("menu-open");
      document.removeEventListener("keydown", handleKey);
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <Link className="brand" href="/" aria-label="The Ethical Capacity Lab home">
            <span className="brand-mark" aria-hidden="true">ECL</span>
            <span className="brand-name">The Ethical<br />Capacity Lab</span>
          </Link>
          <nav className="desktop-nav" aria-label="Primary navigation">
            <DesktopDropdown label="Our Ecosystem" items={ecosystemMenu} />
            <Link href="/organizations" aria-current={isPathActive(pathname, "/organizations") ? "page" : undefined}>For Organizations</Link>
            <Link href="/builders" aria-current={isPathActive(pathname, "/builders") ? "page" : undefined}>For Builders</Link>
            <Link href="/liberation" aria-current={isPathActive(pathname, "/liberation") ? "page" : undefined}>Liberation Network</Link>
            <DesktopDropdown label="Work & Partners" items={workMenu} />
            <Link href="/resources" aria-current={pathname === "/resources" ? "page" : undefined}>Resources</Link>
          </nav>
          <Link className="button header-cta" href="/start">Start Here</Link>
          <button ref={mobileTrigger} className="mobile-trigger" type="button" aria-expanded={mobileOpen} aria-controls="mobile-navigation" onClick={() => setMobileOpen(true)}>
            <span className="sr-only">Open navigation</span><span aria-hidden="true">Menu</span>
          </button>
        </div>
      </header>
      {mobileOpen && (
        <div className="mobile-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) closeMobile(); }}>
          <div id="mobile-navigation" className="mobile-panel" role="dialog" aria-modal="true" aria-label="Site navigation" ref={mobilePanel}>
            <div className="mobile-panel-head">
              <span className="eyebrow">Navigation</span>
              <button type="button" onClick={() => { closeMobile(); mobileTrigger.current?.focus(); }}>Close <span aria-hidden="true">×</span></button>
            </div>
            <Link className="button mobile-start" href="/start" onClick={closeMobile}>Start Here</Link>
            <nav aria-label="Mobile navigation">
              {primaryNavigation.map((item) => "menu" in item ? (
                <details key={item.label}>
                  <summary>{item.label}</summary>
                  <div>
                    {item.menu.map((sub) => <Link key={sub.href} href={sub.href} aria-current={isPathActive(pathname, sub.href) && !standalonePrimaryHrefs.has(sub.href) ? "page" : undefined} onClick={closeMobile}>{sub.label}</Link>)}
                  </div>
                </details>
              ) : <Link key={item.href} href={item.href} aria-current={isPathActive(pathname, item.href) ? "page" : undefined} onClick={closeMobile}>{item.label}</Link>)}
              <Link href="/contact" aria-current={pathname === "/contact" ? "page" : undefined} onClick={closeMobile}>Contact</Link>
              <Link href="/report-a-concern" aria-current={pathname === "/report-a-concern" ? "page" : undefined} onClick={closeMobile}>Report a Concern</Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
