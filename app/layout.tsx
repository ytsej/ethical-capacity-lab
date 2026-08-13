import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "@fontsource-variable/inter";
import "@fontsource-variable/fraunces";
import "./globals.css";
import { AnalyticsConsent } from "@/components/AnalyticsConsent";
import { AnalyticsInteractions } from "@/components/AnalyticsInteractions";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { isSearchIndexingEnabled, site } from "@/content/site";

const socialImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "The Ethical Capacity Lab — build the capacity behind meaningful work",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ethicalcapacitylab.org"),
  title: { default: site.name, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: "/" },
  icons: { icon: [{ url: "/favicon.ico", sizes: "any" }, { url: "/icon.svg", type: "image/svg+xml" }], apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }] },
  openGraph: { type: "website", siteName: site.name, locale: "en_US", title: site.name, description: site.description, url: "/", images: [socialImage] },
  twitter: { card: "summary_large_image", title: site.name, description: site.description, images: [socialImage.url] },
  robots: isSearchIndexingEnabled()
    ? { index: true, follow: true, googleBot: { index: true, follow: true } }
    : { index: false, follow: false, noarchive: true, googleBot: { index: false, follow: false, noarchive: true } },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#F6F1E7", colorScheme: "light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";

  return (
    <html lang="en">
      <body>
        <Script id="ecl-consent-defaults" strategy="beforeInteractive">{`
          window.dataLayer = window.dataLayer || [];
          window.gtag = window.gtag || function(){ window.dataLayer.push(arguments); };
          window.gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            wait_for_update: 500
          });
          window.gtag('set', 'ads_data_redaction', true);
        `}</Script>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <Header />
        <main id="main-content" tabIndex={-1}>{children}</main>
        <Footer />
        <AnalyticsInteractions />
        <AnalyticsConsent measurementId={measurementId} />
      </body>
    </html>
  );
}
