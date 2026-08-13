import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const publicCopyFiles = [
  "app/accessibility/page.tsx",
  "app/about/page.tsx",
  "app/builders/page.tsx",
  "app/contact/page.tsx",
  "app/ecosystem/page.tsx",
  "app/ethical-work/page.tsx",
  "app/organizations/page.tsx",
  "app/resources/page.tsx",
  "app/work/page.tsx",
  "components/EcosystemArchitecture.tsx",
  "content/capabilities.ts",
  "content/ecosystem.ts",
  "content/navigation.ts",
  "content/resources.ts",
].map((file) => readFileSync(resolve(process.cwd(), file), "utf8"));

describe("plain-language public copy", () => {
  it("does not restore the jargon-heavy phrases replaced in the public audit", () => {
    const copy = publicCopyFiles.join("\n").toLowerCase();
    for (const phrase of [
      "wcag 2.2 aa practices",
      "access commitment",
      "semantic landmarks",
      "governance and methodology",
      "safe-to-fail",
      "extractive outsourcing",
      "unpaid speculative work",
      "data-minimized inquiry",
      "case-study index",
      "read the evidence record",
      "proof of work",
      "shared trust layer",
      "institutional parent",
      "practical arm",
      "bounded conversation",
    ]) {
      expect(copy).not.toContain(phrase);
    }
  });
});
