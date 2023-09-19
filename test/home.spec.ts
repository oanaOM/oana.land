import { test, expect, type Page } from "@playwright/test";

test.describe("Home page", () => {
  test("should navigate to blog posts", async ({ page }) => {
    await page.goto("/");

    const homePageTitle = page.getByText("Hello");

    await expect(homePageTitle).toBeTruthy();

    await page.getByText("Garden").click();

    const gardenPageTitle = page.getByText("Flowering in progress ...");

    await expect(gardenPageTitle).toBeTruthy();
  });

  test("should toggle theme mode", async ({ page }) => {
    await page.goto("/");

    await page.getByTestId("theme-btn").click();

    await expect(page.locator("//html")).toHaveAttribute("data-theme", "dark");

    await checkThemeInLocalStorage(page, "dark");
  });
});

async function checkThemeInLocalStorage(page: Page, expected: string) {
  return await page.waitForFunction(() => {
    return localStorage["theme"];
  }, expected);
}
