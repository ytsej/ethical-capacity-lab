/**
 * ECL mark: a seedling held by a cup.
 * The gold cup is the Lab's shared foundation; the two leaves are DoGoodie (navy)
 * and the Liberation Network (green), growing from the same stem.
 */
export function LogoMark({ className = "", title }: { className?: string; title?: string }) {
  return (
    <svg className={`logo-mark ${className}`.trim()} viewBox="0 0 48 48" role={title ? "img" : undefined} aria-hidden={title ? undefined : true} focusable="false">
      {title && <title>{title}</title>}
      <path className="logo-leaf-left" d="M23.2 25.5C14.8 25.6 9.6 20.2 9.4 11.6c8.6-.2 13.9 5.2 13.8 13.9Z" fill="#33506B" />
      <path className="logo-leaf-right" d="M24.8 21.4c.1-9 5.6-14.6 14.5-14.6.1 9-5.5 14.6-14.5 14.6Z" fill="#4B5D3E" />
      <path d="M24 31V20.5" stroke="#2A2823" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path className="logo-cup" d="M7.5 30.5h33c0 7.9-7.4 13-16.5 13s-16.5-5.1-16.5-13Z" fill="#A9762F" />
      <path d="M11 33.6h26" stroke="#F5E9D3" strokeWidth="1.6" strokeLinecap="round" fill="none" opacity=".75" />
    </svg>
  );
}

export function Logo({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <span className={`logo logo-${tone}`}>
      <LogoMark />
      <span className="logo-text">
        <span className="logo-the">The</span>
        <span className="logo-name">Ethical Capacity Lab</span>
      </span>
    </span>
  );
}
