import { test, expect } from "@playwright/test"

test("go to /", async ({ page }) => {
  await page.goto("/")

  await expect(page).toHaveTitle(/Home - MedReporter/)
})
