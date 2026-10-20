import Link from "next/link";
import { CookieSettingsButton } from "./CookieSettingsButton";
import { Logo } from "./Logo";
import { footerGroups } from "@/content/navigation";
import { currentStage } from "@/content/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-intro">
        <div>
          <Logo tone="dark" />
          <p className="footer-name">Build the capacity behind meaningful work.</p>
        </div>
        <p>{currentStage}</p>
      </div>
      <div className="container footer-grid">
        {footerGroups.map((group) => (
          <nav key={group.title} aria-label={`${group.title} links`}>
            <h2>{group.title}</h2>
            {group.links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
          </nav>
        ))}
      </div>
      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} The Ethical Capacity Lab. An evolving, early-stage ecosystem.</p>
        <p><CookieSettingsButton /> · Optional analytics only with your consent.</p>
      </div>
    </footer>
  );
}
