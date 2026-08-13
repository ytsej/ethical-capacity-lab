"use client";

export function CookieSettingsButton({ className = "cookie-settings-link" }: { className?: string }) {
  return (
    <button
      className={className}
      type="button"
      onClick={() => window.dispatchEvent(new Event("ecl:open-cookie-settings"))}
    >
      Cookie settings
    </button>
  );
}
