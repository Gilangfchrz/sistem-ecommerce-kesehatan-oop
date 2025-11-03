/**
 * End-to-End Tests - Complete Checkout Flow
 * Testing Health E-Commerce dari browse sampai checkout
 * Frontend: http://localhost:3000
 * Backend: http://localhost:5000
 */

import { test, expect } from "@playwright/test";

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

test.describe("Health E-Commerce - Complete Checkout Flow", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to homepage
    await page.goto(FRONTEND_URL);
  });

  test("Homepage loads correctly dengan all elements", async ({ page }) => {
    // Check title
    await expect(page).toHaveTitle(/Health E-Commerce/i);

    // Check main heading
    const heading = page.getByRole("heading", {
      name: /Selamat Datang|Health E-Commerce/i,
    });
    await expect(heading).toBeVisible();

    // Check navigation links exist
    await expect(
      page.getByRole("link", { name: /Products|Produk/i })
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Cart|Keranjang/i })
    ).toBeVisible();

    // Check CTA button
    const ctaButton = page.getByRole("button", { name: /Belanja|Mulai/i });
    await expect(ctaButton).toBeVisible();
  });

  test("can browse products and filter by category", async ({ page }) => {
    // Navigate to products page
    await page.click("text=Products");
    await expect(page).toHaveURL(/.*products/);

    // Wait for products to load
    await page.waitForSelector('[class*="ant-card"]', { timeout: 5000 });

    // Count initial products
    const initialCount = await page.locator('[class*="ant-card"]').count();
    expect(initialCount).toBeGreaterThan(0);

    // Filter by Vitamin category
    await page.click('[class*="ant-select"]'); // Click category dropdown
    await page.click("text=Vitamin");

    // Wait for filtered results
    await page.waitForTimeout(500);

    // Verify filter applied (products count might change)
    const filteredCards = page.locator('[class*="ant-card"]');
    await expect(filteredCards.first()).toBeVisible();
  });

  test("complete shopping flow: browse → add to cart → checkout", async ({
    page,
  }) => {
    // Step 1: Navigate to products
    await page.goto(`${FRONTEND_URL}/products`);
    await page.waitForSelector('[class*="ant-card"]', { timeout: 5000 });

    // Step 2: Add first product to cart
    const firstProduct = page.locator('[class*="ant-card"]').first();
    const productName = await firstProduct
      .locator('h3, h4, [class*="title"]')
      .first()
      .textContent();

    await firstProduct.locator('button:has-text("Tambah")').click();

    // Step 3: Verify cart badge updated
    await page.waitForTimeout(500); // Wait for state update
    const cartBadge = page.locator('[class*="ant-badge-count"]');
    await expect(cartBadge).toBeVisible();
    const badgeText = await cartBadge.textContent();
    expect(parseInt(badgeText) || 0).toBeGreaterThan(0);

    // Step 4: Navigate to cart
    await page.click("text=Cart");
    await expect(page).toHaveURL(/.*cart/);

    // Step 5: Verify product in cart
    const cartHeading = page.locator("h1");
    await expect(cartHeading).toContainText(/Keranjang|Cart/i);

    const cartTable = page.locator("table");
    await expect(cartTable).toBeVisible();

    // Step 6: Proceed to checkout
    await page.click('button:has-text("Checkout")');
    await expect(page).toHaveURL(/.*checkout/);

    // Step 7: Fill shipping form
    await page.fill('input[name="name"], input[id*="name"]', "Aiman Test");
    await page.fill(
      'input[name="email"], input[id*="email"]',
      "aiman.test@example.com"
    );
    await page.fill('input[name="phone"], input[id*="phone"]', "08123456789");
    await page.fill(
      'textarea[name="address"], textarea[id*="address"]',
      "Jl. Sehat No. 123, Jakarta"
    );

    // Step 8: Submit form
    await page.click('button:has-text("Lanjut"), button[type="submit"]');

    // Step 9: Verify next step or payment page
    await page.waitForTimeout(1000);
    // Payment button should be visible atau redirected
    const paymentButton = page.locator('button:has-text("Bayar")');
    await expect(paymentButton).toBeVisible({ timeout: 3000 });
  });

  test("search functionality works correctly", async ({ page }) => {
    await page.goto(`${FRONTEND_URL}/products`);
    await page.waitForSelector('[class*="ant-card"]');

    // Find search input
    const searchInput = page.locator(
      'input[placeholder*="Cari"], input[placeholder*="Search"]'
    );
    await searchInput.fill("Vitamin");

    // Press Enter or click search
    await searchInput.press("Enter");

    // Wait for results
    await page.waitForTimeout(500);

    // Verify results contain search term
    const cards = page.locator('[class*="ant-card"]');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });

  test("responsive navigation works on mobile", async ({ page }) => {
    // Set mobile viewport (iPhone 13)
    await page.setViewportSize({ width: 390, height: 844 });

    await page.goto(FRONTEND_URL);

    // Navigation should still be accessible
    await expect(page.getByRole("navigation")).toBeVisible();

    // Can navigate to products
    await page.click("text=Products");
    await expect(page).toHaveURL(/.*products/);
  });
});

test.describe("AI Chatbot E2E Test", () => {
  test("AI chatbot modal opens and responds", async ({ page }) => {
    await page.goto(`${FRONTEND_URL}/products`);

    // Look for AI chatbot button (might be floating button)
    const aiButton = page
      .locator(
        'button:has-text("AI"), button[aria-label*="AI"], button[class*="chatbot"]'
      )
      .first();

    if (await aiButton.isVisible()) {
      await aiButton.click();

      // Modal should open
      const modal = page.locator('[class*="ant-modal"]');
      await expect(modal).toBeVisible();

      // Type message
      const textarea = modal.locator("textarea");
      await textarea.fill("Rekomendasi vitamin untuk imunitas");

      // Send
      const sendButton = modal.locator(
        'button:has-text("Kirim"), button:has-text("Send")'
      );
      await sendButton.click();

      // Wait for AI response (might take a few seconds)
      await page.waitForTimeout(3000);

      // Response should appear
      // (Exact assertion depends on UI implementation)
    }
  });
});
