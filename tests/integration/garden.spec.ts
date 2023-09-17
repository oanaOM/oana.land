import { test, expect } from "@playwright/test";

test.describe("Garden page", () => {
  test("should show the Garden page", ({ page }) => {
    const homePageTitle = page.getByText("Garden");

    expect(homePageTitle).toBeTruthy();
  });
});
