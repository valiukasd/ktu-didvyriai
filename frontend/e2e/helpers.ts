import { expect, type Page } from "@playwright/test";

export type TestAccount = {
	name: string;
	email: string;
	password: string;
};

export function createTestAccount(): TestAccount {
	const suffix = Date.now().toString(36);

	return {
		name: `QA${suffix}`,
		email: `qa+${suffix}@example.com`,
		password: `Qa${suffix}A1`,
	};
}

export async function registerAccount(page: Page, account: TestAccount) {
	await page.goto("/auth/register");
	await page.getByLabel("Full name").fill(account.name);
	await page.getByLabel("Age").fill("28");
	await page.getByLabel("Email").fill(account.email);
	await page.getByLabel("Password").fill(account.password);
	await page.getByRole("button", { name: "Submit" }).click();

	await expect(page).toHaveURL(/\/$/);
	await expect(page.getByRole("link", { name: "My Tickets" })).toBeVisible();
}

export async function logInAccount(page: Page, account: TestAccount) {
	await page.goto("/auth/log-in");
	await page.getByLabel("Email").fill(account.email);
	await page.getByLabel("Password").fill(account.password);
	await page.getByRole("button", { name: "Log in" }).click();

	await expect(page).toHaveURL(/\/$/);
	await expect(page.getByRole("link", { name: "My Tickets" })).toBeVisible();
}

export async function signOut(page: Page) {
	await page.getByRole("button", { name: "Log out" }).click();
	await expect(page).toHaveURL(/\/$/);
	await expect(page.getByRole("link", { name: "Log in" })).toBeVisible();
}

export async function fillEventDate(page: Page, monthsAhead = 1, day = 10) {
	const targetDate = new Date();
	targetDate.setMonth(targetDate.getMonth() + monthsAhead, day);
	targetDate.setHours(12, 0, 0, 0);

	await page.locator('button[name="eventDate"]').click();
	for (let index = 0; index < monthsAhead; index += 1) {
		await page.getByRole("button", { name: /next month/i }).click();
	}

	const dayKey = await page.evaluate((iso) => {
		return new Date(iso).toLocaleDateString();
	}, targetDate.toISOString());

	await page.locator(`[data-day="${dayKey}"]`).click();
}

export async function createEvent(page: Page, eventName: string, location: string) {
	await page.goto("/events/create");
	await page.getByLabel("Event name").fill(eventName);
	await page.getByLabel("Location").fill(location);
	await page.getByLabel("Ticket count").fill("5");
	await fillEventDate(page);
	await page.getByRole("button", { name: "Create event" }).click();

	await expect(page).toHaveURL(/\/events$/);
	await expect(page.getByText(eventName, { exact: true })).toBeVisible();
}