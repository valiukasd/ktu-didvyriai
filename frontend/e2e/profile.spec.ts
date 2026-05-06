import { expect, test } from "@playwright/test";
import { createTestAccount, registerAccount } from "./helpers";

test("updates the account profile", async ({ page }) => {
	const account = createTestAccount();

	await registerAccount(page, account);

	const updatedName = `${account.name} X`;
	const updatedAge = "31";

	await page.goto("/profile");
	await page.getByLabel("Full Name").fill(updatedName);
	await page.getByLabel("Age").fill(updatedAge);
	await page.getByRole("button", { name: "Save changes" }).click();

	await expect(page.getByLabel("Full Name")).toHaveValue(updatedName);
	await expect(page.getByLabel("Age")).toHaveValue(updatedAge);
	await expect(page.getByText("Profile updated successfully.")).toBeVisible();
});