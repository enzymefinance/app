import { expect, test } from "@playwright/test";

test("displays the correct metadata", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Enzyme");
});
