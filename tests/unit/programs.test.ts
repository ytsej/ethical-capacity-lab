import { describe, expect, it } from "vitest";
import { getProgramStatus } from "@/content/programs";

describe("Impact Hack date-aware status", () => {
  it.each([
    ["2026-07-19T23:59:00+08:00", "upcoming"],
    ["2026-08-03T12:00:00+08:00", "applications_open"],
    ["2026-08-12T12:00:00+08:00", "reviewing"],
    ["2026-08-18T12:00:00+08:00", "active"],
    ["2026-08-25T12:00:00+08:00", "judging"],
    ["2027-01-01T00:00:00+08:00", "archived"],
  ])("derives %s as %s", (date, expected) => expect(getProgramStatus(new Date(date))).toBe(expected));
});
