import os from "os";

/** @type {import('@playwright/test').PlaywrightTestConfig} */
module.exports = {
  outputDir: ".playwright",
  testDir: "tests",
  timeout: 30 * 1000,
  expect: { timeout: 10000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : Math.floor(os.cpus().length / 4),
  reporter: [["html", { outputFolder: ".report" }]],
  projects: [
    {
      name: "Enzyme",
      use: {
        baseURL: process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000/",
        video: "on-first-retry",
        trace: "on-first-retry",
        screenshot: "only-on-failure",
      },
    },
  ],
};
