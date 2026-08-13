import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: true,
  retries: 0,
  workers: 2,
  reporter: [["list"], ["html", { open: "never" }]],
  use: { baseURL: "http://127.0.0.1:3100", trace: "retain-on-failure", screenshot: "only-on-failure" },
  webServer: { command: "npm.cmd run dev -- --hostname 127.0.0.1 --port 3100", url: "http://127.0.0.1:3100", reuseExistingServer: false, timeout: 120_000, env: { NEXT_DIST_DIR: ".next-test", NEXT_PUBLIC_SITE_URL: "http://127.0.0.1:3100", NEXT_PUBLIC_GA_MEASUREMENT_ID: "G-TEST123", SITE_ENV: "preview", FORMSPREE_TEST_MODE: "accept" } },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
