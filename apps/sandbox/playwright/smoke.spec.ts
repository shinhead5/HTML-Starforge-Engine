import { expect, test } from "@playwright/test";

test("loads canvas", async ({ page }) => {
  const messages: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      messages.push(msg.text());
    }
  });

  await page.goto("/");
  const canvas = page.locator("#game");
  await expect(canvas).toBeVisible();
  expect(messages).toHaveLength(0);
});
