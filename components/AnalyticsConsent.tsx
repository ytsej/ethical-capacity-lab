"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { trackPageView } from "@/lib/analytics";

const STORAGE_KEY = "ecl_consent_v1";
const CONSENT_VERSION = 1;

type ConsentChoice = "granted" | "denied";
type ConsentState = ConsentChoice | "unset" | "loading";
type StoredConsent = { version: number; analytics: boolean; timestamp: string };

function ensureGtag() {
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || ((...args: unknown[]) => window.dataLayer.push(args));
  return window.gtag;
}

function updateGoogleConsent(choice: ConsentChoice) {
  const gtag = ensureGtag();
  gtag("consent", "update", {
    analytics_storage: choice,
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  gtag("set", "ads_data_redaction", true);
  window.__eclAnalyticsGranted = choice === "granted";
  if (choice === "denied") window.__eclLastPageView = undefined;
}

function readConsent(): ConsentChoice | "unset" {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return "unset";
    const parsed = JSON.parse(raw) as Partial<StoredConsent>;
    if (parsed.version !== CONSENT_VERSION || typeof parsed.analytics !== "boolean") return "unset";
    return parsed.analytics ? "granted" : "denied";
  } catch {
    return "unset";
  }
}

function storeConsent(choice: ConsentChoice) {
  const value: StoredConsent = {
    version: CONSENT_VERSION,
    analytics: choice === "granted",
    timestamp: new Date().toISOString(),
  };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Consent still applies for the current page when storage is unavailable.
  }
}

function removeAnalyticsCookies() {
  const hostname = window.location.hostname;
  for (const item of document.cookie.split(";")) {
    const name = item.split("=")[0]?.trim();
    if (!name?.startsWith("_ga")) continue;
    document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
    document.cookie = `${name}=; Max-Age=0; path=/; domain=${hostname}; SameSite=Lax`;
    document.cookie = `${name}=; Max-Age=0; path=/; domain=.${hostname}; SameSite=Lax`;
  }
}

function configureAnalytics(measurementId: string) {
  if (!/^G-[A-Z0-9]+$/i.test(measurementId) || window.__eclGaConfigured) return;
  const gtag = ensureGtag();
  gtag("js", new Date());
  gtag("config", measurementId, {
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });
  window.__eclGaConfigured = true;

  if (!document.querySelector('script[data-ecl-ga4="true"]')) {
    const script = document.createElement("script");
    script.async = true;
    script.dataset.eclGa4 = "true";
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    document.head.appendChild(script);
  }
}

export function AnalyticsConsent({ measurementId }: { measurementId: string }) {
  const [consent, setConsent] = useState<ConsentState>("loading");
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const manageButtonRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const shouldRestoreFocusRef = useRef(false);

  const openPreferences = useCallback(() => {
    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setPreferencesOpen(true);
  }, []);

  const closePreferences = useCallback(() => {
    shouldRestoreFocusRef.current = true;
    setPreferencesOpen(false);
  }, []);

  useEffect(() => {
    const stored = readConsent();
    setConsent(stored);
    if (stored !== "unset") {
      updateGoogleConsent(stored);
      if (stored === "granted") {
        configureAnalytics(measurementId);
        trackPageView(window.location.pathname);
      }
    }
  }, [measurementId]);

  useEffect(() => {
    window.addEventListener("ecl:open-cookie-settings", openPreferences);
    return () => window.removeEventListener("ecl:open-cookie-settings", openPreferences);
  }, [openPreferences]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (preferencesOpen && !dialog.open) dialog.showModal();
    if (!preferencesOpen && dialog.open) dialog.close();
  }, [preferencesOpen]);

  useEffect(() => {
    if (preferencesOpen || !shouldRestoreFocusRef.current) return;
    shouldRestoreFocusRef.current = false;
    const previousTrigger = returnFocusRef.current;
    const focusTarget = previousTrigger?.isConnected ? previousTrigger : manageButtonRef.current;
    focusTarget?.focus();
    returnFocusRef.current = null;
  }, [preferencesOpen, consent]);

  const choose = (choice: ConsentChoice) => {
    storeConsent(choice);
    updateGoogleConsent(choice);
    setConsent(choice);
    closePreferences();
    if (choice === "granted") {
      configureAnalytics(measurementId);
      trackPageView(window.location.pathname);
    } else {
      removeAnalyticsCookies();
    }
  };

  return (
    <>
      {consent === "unset" && !preferencesOpen && (
        <section className="consent-banner" aria-label="Analytics cookie choices">
          <div className="consent-banner-copy">
            <h2>Optional analytics</h2>
            <p>We use optional analytics to understand how this public website is used. You can accept or decline analytics cookies. Essential website functions do not depend on analytics consent.</p>
            <Link href="/cookies">Cookie and Analytics Notice</Link>
          </div>
          <div className="consent-actions">
            <button className="button consent-choice-button" type="button" onClick={() => choose("granted")}>Accept analytics</button>
            <button className="button consent-choice-button" type="button" onClick={() => choose("denied")}>Decline analytics</button>
            <button className="consent-manage" ref={manageButtonRef} type="button" onClick={openPreferences}>Manage preferences</button>
          </div>
        </section>
      )}

      <dialog
        className="consent-dialog"
        ref={dialogRef}
        aria-labelledby="consent-dialog-title"
        aria-describedby="consent-dialog-description"
        onCancel={(event) => {
          event.preventDefault();
          closePreferences();
        }}
        onClose={() => setPreferencesOpen(false)}
      >
        <div className="consent-dialog-header">
          <h2 id="consent-dialog-title">Cookie preferences</h2>
          <button className="dialog-close" type="button" aria-label="Close cookie preferences" onClick={closePreferences}>×</button>
        </div>
        <p id="consent-dialog-description">Essential preference storage is always available. Analytics is optional and is loaded only after you accept it.</p>
        <div className="consent-preference-row">
          <div>
            <h3>Essential storage</h3>
            <p>Used to remember your privacy choice and support core website operation.</p>
          </div>
          <strong>Always active</strong>
        </div>
        <div className="consent-preference-row">
          <div>
            <h3>Analytics</h3>
            <p>Helps us understand public pages and navigation without using form contents or personal identifiers.</p>
          </div>
          <strong>{consent === "granted" ? "Accepted" : consent === "denied" ? "Declined" : "Not selected"}</strong>
        </div>
        <div className="consent-dialog-actions">
          <button className="button consent-choice-button" type="button" onClick={() => choose("granted")}>Accept analytics</button>
          <button className="button consent-choice-button" type="button" onClick={() => choose("denied")}>Decline analytics</button>
        </div>
        <p><Link href="/cookies" onClick={() => setPreferencesOpen(false)}>Read the Cookie and Analytics Notice</Link></p>
      </dialog>
    </>
  );
}
