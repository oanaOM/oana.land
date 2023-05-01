import { test, expect, type Page } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("Home page", () => {
  test("should navigate to blog posts", async ({ page }) => {
    const homePageTitle = page.getByText("Hello");

    await expect(homePageTitle).toBeTruthy();

    await page.getByText("Blog").click();

    const blogPageTitle = page.getByText("Posts");

    await expect(blogPageTitle).toBeTruthy();
  });

  test("should toggle theme mode", async ({ page }) => {
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
