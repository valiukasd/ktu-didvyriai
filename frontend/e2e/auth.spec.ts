import { expect, test } from "@playwright/test";
import { createTestAccount, logInAccount, registerAccount, signOut } from "./helpers";

test("registers a new account and signs back in", async ({ page }) => {
	const account = createTestAccount();

	await registerAccount(page, account);
	await signOut(page);
	await logInAccount(page, account);

	await expect(page.getByRole("link", { name: "Account" })).toBeVisible();
});