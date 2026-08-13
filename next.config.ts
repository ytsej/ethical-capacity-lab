import type { NextConfig } from "next";

const developmentCsp = process.env.NODE_ENV === "development";
const configuredPublicUrl = process.env.NEXT_PUBLIC_SITE_URL;
const searchIndexingEnabled = (() => {
  if (process.env.SITE_ENV !== "production" || !configuredPublicUrl) return false;
  try {
    const publicUrl = new URL(configuredPublicUrl);
    return publicUrl.protocol === "https:" && !["localhost", "127.0.0.1", "::1"].includes(publicUrl.hostname);
  } catch {
    return false;
  }
})();
const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  `script-src 'self' 'unsafe-inline' https://www.googletagmanager.com${developmentCsp ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://www.google-analytics.com https://www.googletagmanager.com",
  `connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com${developmentCsp ? " ws: wss:" : ""}`,
  "font-src 'self'",
  ...(developmentCsp ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const nextConfig: NextConfig = {
  distDir: process.env.NEXT_DIST_DIR || ".next",
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "browsing-topics=(), camera=(), geolocation=(), interest-cohort=(), microphone=(), payment=(), usb=()" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Content-Security-Policy", value: contentSecurityPolicy },
          ...(!searchIndexingEnabled ? [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }] : [])
        ]
      }
    ];
  },
  async redirects() {
    return [
      { source: "/community", destination: "/builders", permanent: true },
      { source: "/join", destination: "/builders#expression-of-interest", permanent: true },
      { source: "/faq", destination: "/resources#faq", permanent: true },
      { source: "/proof-of-work", destination: "/work", permanent: true },
      { source: "/manifesto", destination: "/ethical-work", permanent: true },
      { source: "/submit-a-challenge", destination: "/challenges", permanent: true },
      { source: "/ethical-capacity-lab", destination: "/about", permanent: true },
      { source: "/liberation-network", destination: "/liberation", permanent: true }
    ];
  }
};

export default nextConfig;
