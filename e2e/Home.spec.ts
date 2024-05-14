import { test, expect } from "@playwright/test";

test("Test Home Page", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await expect(page.title()).resolves.toMatch("TTK dApp");

  const connectButton = await page.isVisible("text=Connect Wallet");
  expect(connectButton).toBeTruthy();

  const ttkSection = await page.isVisible("text=BankToken (TTK)");
  expect(ttkSection).toBeFalsy();

  const bankSection = await page.isVisible("text=Bank");
  expect(bankSection).toBeFalsy();

  // TODO: Connection with mock wallet, form filling, interactions and tx actions
});
