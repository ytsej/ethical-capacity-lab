import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { site } from "@/content/site";

const eclInbox = "ethicalcapacitylab@gmail.com";
const outdatedInbox = "dogoodie.community@gmail.com";

function source(relativePath: string) {
  return readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

describe("public ECL contact email", () => {
  it("uses the ECL inbox as the typed public source of truth", () => {
    expect(site.email).toBe(eclInbox);
  });

  it.each(["app/contact/page.tsx", "app/report-a-concern/page.tsx", "components/SubmissionForm.tsx"])("renders %s from the typed ECL inbox without the outdated address", (relativePath) => {
    const file = source(relativePath);
    expect(file).toContain("site.email");
    expect(file).not.toContain(outdatedInbox);
  });
});
