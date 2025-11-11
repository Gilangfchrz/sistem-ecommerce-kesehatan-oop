/**
 * E2E Tests - Shopping Flow (STARTER)
 * TODO: Complete the E2E test scenarios below
 *
 * Prerequisites:
 * - Backend running on http://localhost:5000
 * - Frontend running on http://localhost:3000
 * - Playwright installed: npx playwright install chromium
 *
 * Run: npm run test:e2e
 * Run with UI: npm run test:e2e:ui
 *
 * Learning objectives:
 * - Automate browser interactions
 * - Test complete user flows
 * - Use Playwright selectors
 */

const { test, expect } = require("@playwright/test");

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

test.describe("E2E: Shopping Flow (STARTER)", () => {
  //  Example test (already complete)
  test("Homepage loads correctly", async ({ page }) => {
    await page.goto(FRONTEND_URL);

    // Check navbar visible
    await expect(page.locator("nav")).toBeVisible();

    // Check heading exists
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  // TODO 1: Test product browsing
  test("Can browse products", async ({ page }) => {
    // TODO: Navigate to /products page
    // TODO: Wait for products to load (selector: 'article')
    // TODO: Count products (should be > 0)
    // TODO: Verify at least one product card is visible
    // HINT: await page.goto(`${FRONTEND_URL}/products`);
    // HINT: await page.waitForSelector('article', { timeout: 10000 });
    // HINT: const count = await page.locator('article').count();
    // HINT: expect(count).toBeGreaterThan(0);
  });

  // TODO 2: Test search functionality
  test("Search finds relevant products", async ({ page }) => {
    // TODO: Navigate to /products
    // TODO: Find search input
    // TODO: Type 'vitamin' dan press Enter
    // TODO: Wait for results
    // TODO: Verify products are displayed
    // HINT: const searchInput = page.locator('input[type="search"]');
    // HINT: await searchInput.fill('vitamin');
    // HINT: await searchInput.press('Enter');
  });

  // TODO 3: Test add to cart
  test("Can add product to cart", async ({ page }) => {
    // TODO: Navigate to /products
    // TODO: Wait for products to load
    // TODO: Click first "Add to Cart" button
    // TODO: Verify cart badge shows count > 0
    // HINT: const addButton = page.locator('button:has-text("Add to Cart")').first();
    // HINT: await addButton.click();
    // HINT: await page.waitForTimeout(1000);
  });

  // TODO 4: Test view cart page
  test("Cart page displays added items", async ({ page }) => {
    // TODO: Navigate to products page
    // TODO: Add product to cart
    // TODO: Navigate to /cart
    // TODO: Verify cart page shows items (count > 0)
    // HINT: await page.goto(`${FRONTEND_URL}/cart`);
    // HINT: const items = await page.locator('tbody tr').count();
    // HINT: expect(items).toBeGreaterThan(0);
  });

  // TODO 5: Test checkout form
  test("Checkout form validation works", async ({ page }) => {
    // TODO: Navigate to checkout page
    // TODO: Try submit tanpa fill form
    // TODO: Verify validation errors appear atau form tidak submit
  });

  // TODO 6: Test responsive navigation
  test("Responsive menu works on mobile", async ({ page }) => {
    // TODO: Set viewport ke mobile size (375x667)
    // TODO: Check if hamburger menu exists dan clickable
    // TODO: Click hamburger menu
    // TODO: Verify menu appears
    // HINT: await page.setViewportSize({ width: 375, height: 667 });
    // HINT: const hamburger = page.locator('button[aria-label*="menu"]');
    // HINT: await hamburger.click();
  });
});

// ==========================================
// LEARNING RESOURCES
// ==========================================

/*
PLAYWRIGHT SELECTORS:

page.locator('button')                      - By tag name
page.locator('.classname')                  - By class
page.locator('#id')                         - By ID
page.locator('button:has-text("Click")')    - By text content
page.getByRole('button', { name: 'Click' }) - By role
page.getByPlaceholder('Search...')          - By placeholder
page.locator('article').first()             - First match
page.locator('article').last()              - Last match

COMMON ACTIONS:

await page.goto(url)                        - Navigate
await element.click()                       - Click
await element.fill('text')                  - Type text
await element.press('Enter')                - Press key
await page.waitForSelector('selector')      - Wait for element
await page.waitForTimeout(1000)             - Wait time (ms)

ASSERTIONS:

await expect(element).toBeVisible()         - Element visible
await expect(element).toHaveText('text')    - Has text
await expect(element).toHaveCount(n)        - Count matches
await expect(page).toHaveURL(url)           - Current URL

DEBUGGING:

npm run test:e2e:ui                         - Run with UI (see browser!)
await page.screenshot({ path: 'test.png' }) - Take screenshot
await page.pause()                          - Pause execution

NEXT STEPS:
1. Complete TODOs 1-6
2. Run: npm run test:e2e (ensure frontend & backend running!)
3. Use --ui mode untuk see tests execute
4. Compare dengan finished-project untuk reference
*/
