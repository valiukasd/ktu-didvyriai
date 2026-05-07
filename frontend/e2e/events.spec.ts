import { expect, test } from "@playwright/test";
import { createEvent, createTestAccount, registerAccount } from "./helpers";

test("creates, edits, deletes, and registers for events", async ({ page }) => {
	const account = createTestAccount();
	const eventSuffix = Date.now().toString(36);
	const lifecycleEventName = `Lifecycle ${eventSuffix}`;
	const ticketEventName = `Ticket ${eventSuffix}`;

	await registerAccount(page, account);

	await createEvent(page, lifecycleEventName, "Vilnius Hall");

	await page.getByRole("link", { name: "My Events" }).click();
	await expect(page.getByText(lifecycleEventName, { exact: true })).toBeVisible();

	await page.getByRole("link", { name: "Edit" }).click();
	const updatedEventName = `${lifecycleEventName} Updated`;
	await page.getByLabel("Event name").fill(updatedEventName);
	await page.getByLabel("Location").fill("Kaunas Arena");
	await page.getByRole("button", { name: "Save changes" }).click();

	await expect(page).toHaveURL(/\/events$/);
	await expect(page.getByText(updatedEventName, { exact: true })).toBeVisible();

	await page.getByRole("button", { name: "Delete" }).click();
	await expect(page.getByText(updatedEventName, { exact: true })).toHaveCount(0);

	await createEvent(page, ticketEventName, "Tickets Center");
	await page.getByRole("link", { name: "View" }).click();
	await page.getByRole("button", { name: "Get Ticket" }).click();

	await expect(page.getByText("You are registered for this event.")).toBeVisible();

	await page.getByRole("link", { name: "My Tickets" }).click();
	await expect(page.getByText(ticketEventName, { exact: true })).toBeVisible();
});