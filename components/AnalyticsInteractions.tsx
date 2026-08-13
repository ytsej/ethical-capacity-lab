"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { track, trackPageView, type AnalyticsEvent } from "@/lib/analytics";

const pathEvents: Record<string, AnalyticsEvent | undefined> = {
  organization: "organization_support_clicked",
  builder: "builder_path_clicked",
  liberation: "liberation_path_clicked",
  partner: "partner_path_clicked",
};

const downloadableExtensions = new Set(["csv", "doc", "docx", "epub", "pdf", "ppt", "pptx", "rtf", "txt", "xls", "xlsx", "zip"]);

export function AnalyticsInteractions() {
  const pathname = usePathname();

  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);

  useEffect(() => {
    let scrolled = false;

    const onScroll = () => {
      if (scrolled) return;
      const available = document.documentElement.scrollHeight - window.innerHeight;
      if (available > 0 && window.scrollY / available >= 0.9) {
        scrolled = true;
        track("scroll", { percent_scrolled: 90 });
      }
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest("a") : null;
      if (!(target instanceof HTMLAnchorElement)) return;

      const pathChoice = target.dataset.pathChoice;
      if (pathChoice) {
        track("start_here_path_selected", { path: pathChoice });
        const pathEvent = pathEvents[pathChoice];
        if (pathEvent) track(pathEvent, { path: pathChoice });
      }

      const branch = target.dataset.ecosystemBranch;
      if (branch) track("ecosystem_branch_viewed", { branch });

      const namedEvent = target.dataset.analyticsEvent as AnalyticsEvent | undefined;
      if (namedEvent === "organization_support_clicked") track(namedEvent, { path: "organization" });

      let url: URL;
      try {
        url = new URL(target.href, window.location.href);
      } catch {
        return;
      }

      if (url.hostname === "hub.ethicalcapacitylab.org") {
        track("operational_hub_link_clicked", { link_domain: url.hostname, link_path: url.pathname });
      }

      if (["http:", "https:"].includes(url.protocol) && url.origin !== window.location.origin) {
        track("outbound_click", { link_domain: url.hostname, link_path: url.pathname });
      }

      const fileName = url.pathname.split("/").pop() || "";
      const extension = fileName.includes(".") ? fileName.split(".").pop()?.toLowerCase() || "" : "";
      if (downloadableExtensions.has(extension)) track("file_download", { file_name: fileName, file_extension: extension });
    };

    const onToggle = (event: Event) => {
      const target = event.target;
      if (!(target instanceof HTMLDetailsElement) || !target.open) return;
      const resourceId = target.dataset.resourceId;
      if (resourceId) track("resource_opened", { resource_id: resourceId });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onClick);
    document.addEventListener("toggle", onToggle, true);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick);
      document.removeEventListener("toggle", onToggle, true);
    };
  }, [pathname]);

  return null;
}
