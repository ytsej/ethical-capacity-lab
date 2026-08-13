export type AnalyticsEvent =
  | "page_view"
  | "scroll"
  | "outbound_click"
  | "file_download"
  | "start_here_path_selected"
  | "resource_opened"
  | "ecosystem_branch_viewed"
  | "operational_hub_link_clicked"
  | "organization_support_clicked"
  | "builder_path_clicked"
  | "liberation_path_clicked"
  | "partner_path_clicked";

type AnalyticsProperties = Record<string, string | number | boolean>;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
    __eclAnalyticsGranted?: boolean;
    __eclGaConfigured?: boolean;
    __eclLastPageView?: string;
  }
}

const allowedProperties = new Set([
  "branch",
  "file_extension",
  "file_name",
  "link_domain",
  "link_path",
  "page_path",
  "path",
  "percent_scrolled",
  "resource_id",
]);

function safeProperties(properties: AnalyticsProperties = {}) {
  return Object.fromEntries(
    Object.entries(properties)
      .filter(([key, value]) => allowedProperties.has(key) && ["string", "number", "boolean"].includes(typeof value))
      .map(([key, value]) => [key, typeof value === "string" ? value.slice(0, 120) : value]),
  );
}

export function track(event: AnalyticsEvent, properties?: AnalyticsProperties) {
  if (typeof window === "undefined" || !window.__eclAnalyticsGranted || !window.gtag) return;
  window.gtag("event", event, safeProperties(properties));
}

export function trackPageView(pathname: string) {
  if (!pathname.startsWith("/") || pathname.includes("?") || pathname.includes("#")) return;
  if (typeof window === "undefined" || window.__eclLastPageView === pathname) return;
  track("page_view", { page_path: pathname });
  if (window.__eclAnalyticsGranted) window.__eclLastPageView = pathname;
}
