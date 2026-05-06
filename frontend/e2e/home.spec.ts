import { test, expect } from "@playwright/test";

test("has generic title or loads properly", async ({ page }) => {
	await page.goto("/");

	// Expect a generic check for the page loading, such as a main element,
	// checking the next.js app works
	await expect(page.locator("body")).toBeVisible();
});
