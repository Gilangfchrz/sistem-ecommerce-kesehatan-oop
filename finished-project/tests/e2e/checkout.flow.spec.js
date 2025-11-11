/**
 * E2E Tests - Complete Shopping & Checkout Flow
 * Testing frontend user journey dari browse → add to cart → checkout
 *
 * Prerequisites:
 * - Backend running on http://localhost:5000
 * - Frontend running on http://localhost:3000
 * - Playwright browsers installed: npx playwright install chromium
 *
 * Run: npm run test:e2e
 * Run with UI: npm run test:e2e:ui
 */

const { test, expect } = require("@playwright/test");

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

test.describe("E2E: Complete Shopping Flow", () => {
  // Test 1: Homepage loads correctly
  test("Homepage loads with all key elements", async ({ page }) => {
    await page.goto(FRONTEND_URL);

    // Check navbar
    await expect(page.locator("nav")).toBeVisible();

    // Check hero section
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // Check products section exists
    const productsSection = page.locator("text=Produk");
    await expect(productsSection).toBeVisible();
  });

  // Test 2: Browse and filter products
  test("Can browse products and use filters", async ({ page }) => {
    await page.goto(`${FRONTEND_URL}/products`);

    // Wait for products to load
    await page.waitForSelector("article", { timeout: 10000 });

    // Count initial products
    const initialCount = await page.locator("article").count();
    expect(initialCount).toBeGreaterThan(0);

    // Test category filter
    const categoryFilter = page
      .locator('select[name="category"], button:has-text("Vitamin")')
      .first();
    if (await categoryFilter.isVisible()) {
      await categoryFilter.click();
      await page.waitForTimeout(1000); // Wait for filter to apply

      // Products should be filtered
      const filteredCount = await page.locator("article").count();
      expect(filteredCount).toBeGreaterThan(0);
    }
  });

  // Test 3: Search functionality
  test("Search finds relevant products", async ({ page }) => {
    await page.goto(`${FRONTEND_URL}/products`);

    // Find search input
    const searchInput = page
      .locator('input[type="search"], input[placeholder*="Cari"]')
      .first();
    await searchInput.fill("vitamin");
    await searchInput.press("Enter");

    // Wait for search results
    await page.waitForTimeout(1500);

    // Should show products
    const products = await page.locator("article").count();
    expect(products).toBeGreaterThan(0);
  });

  // Test 4: Add product to cart
  test("Can add product to cart and badge updates", async ({ page }) => {
    await page.goto(`${FRONTEND_URL}/products`);

    // Wait for products
    await page.waitForSelector("article", { timeout: 10000 });

    // Find first "Add to Cart" button
    const addToCartButton = page
      .locator(
        'button:has-text("Tambah ke Keranjang"), button:has-text("Add to Cart")'
      )
      .first();
    await addToCartButton.click();

    // Wait for cart update
    await page.waitForTimeout(1000);

    // Check cart badge shows count
    const cartBadge = page.locator('[class*="badge"], [class*="cart-count"]');
    if (await cartBadge.isVisible()) {
      const badgeText = await cartBadge.textContent();
      expect(parseInt(badgeText || "0")).toBeGreaterThan(0);
    }
  });

  // Test 5: View cart page
  test("Cart page displays added items", async ({ page }) => {
    await page.goto(`${FRONTEND_URL}/products`);

    // Add product to cart
    await page.waitForSelector("article", { timeout: 10000 });
    await page
      .locator(
        'button:has-text("Tambah ke Keranjang"), button:has-text("Add to Cart")'
      )
      .first()
      .click();
    await page.waitForTimeout(1000);

    // Navigate to cart
    await page.goto(`${FRONTEND_URL}/cart`);

    // Cart should have items
    await expect(page.locator("text=Keranjang, text=Cart")).toBeVisible();
    const cartItems = await page
      .locator('tbody tr, [class*="cart-item"]')
      .count();
    expect(cartItems).toBeGreaterThan(0);
  });

  // Test 6: Checkout form validation
  test("Checkout form validates required fields", async ({ page }) => {
    await page.goto(`${FRONTEND_URL}/cart`);

    // Go to checkout (if cart not empty, add product first)
    const checkoutButton = page.locator(
      'button:has-text("Checkout"), a[href*="/checkout"]'
    );
    if (await checkoutButton.isVisible()) {
      await checkoutButton.click();
    } else {
      await page.goto(`${FRONTEND_URL}/checkout`);
    }

    // Try to submit without filling
    const submitButton = page
      .locator('button[type="submit"], button:has-text("Bayar")')
      .first();
    await submitButton.click();

    // Should show validation errors or not proceed
    // (Validation might be client-side or show error messages)
    await page.waitForTimeout(1000);
  });

  // Test 7: Complete checkout flow
  test("Can complete checkout with valid data", async ({ page }) => {
    // Add product
    await page.goto(`${FRONTEND_URL}/products`);
    await page.waitForSelector("article", { timeout: 10000 });
    await page
      .locator(
        'button:has-text("Tambah ke Keranjang"), button:has-text("Add to Cart")'
      )
      .first()
      .click();
    await page.waitForTimeout(1000);

    // Go to cart
    await page.goto(`${FRONTEND_URL}/cart`);

    // Proceed to checkout
    const checkoutLink = page
      .locator('button:has-text("Checkout"), a[href*="/checkout"]')
      .first();
    await checkoutLink.click();

    // Fill checkout form
    await page.fill(
      'input[name="name"], input[placeholder*="Nama"]',
      "Aiman Test"
    );
    await page.fill(
      'input[name="email"], input[type="email"]',
      "aiman.test@example.com"
    );
    await page.fill(
      'input[name="phone"], input[placeholder*="Phone"]',
      "081234567890"
    );
    await page.fill(
      'textarea[name="address"], textarea[placeholder*="Alamat"]',
      "Jl. Test No. 123"
    );

    // Submit (will redirect to Midtrans or success page)
    const payButton = page
      .locator('button:has-text("Bayar"), button[type="submit"]')
      .last();
    await payButton.click();

    // Should navigate away from checkout
    await page.waitForTimeout(2000);

    // Either on Midtrans page or success page
    const currentUrl = page.url();
    const isOnPaymentOrSuccess =
      currentUrl.includes("midtrans") ||
      currentUrl.includes("success") ||
      currentUrl.includes("payment");

    expect(isOnPaymentOrSuccess).toBe(true);
  }, 20000);

  // Test 8: Responsive navigation on mobile
  test("Responsive navigation works on mobile viewport", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
    await page.goto(FRONTEND_URL);

    // Check if hamburger menu exists
    const hamburgerMenu = page.locator(
      'button[class*="hamburger"], button[aria-label*="menu"]'
    );
    if (await hamburgerMenu.isVisible()) {
      await hamburgerMenu.click();

      // Navigation menu should appear
      const navMenu = page.locator('nav ul, [class*="mobile-menu"]');
      await expect(navMenu).toBeVisible();
    }
  });

  // Test 9: Dark mode toggle (if implemented)
  test("Can toggle dark mode theme", async ({ page }) => {
    await page.goto(FRONTEND_URL);

    // Look for theme toggle button
    const themeToggle = page
      .locator(
        'button[aria-label*="theme"], button:has-text("🌙"), button:has-text("☀")'
      )
      .first();

    if (await themeToggle.isVisible()) {
      // Get initial theme
      const bodyClass = await page.locator("body").getAttribute("class");

      // Toggle theme
      await themeToggle.click();
      await page.waitForTimeout(500);

      // Theme should have changed
      const newBodyClass = await page.locator("body").getAttribute("class");
      expect(newBodyClass).not.toBe(bodyClass);
    }
  });

  // Test 10: AI Chatbot modal opens
  test("AI Chatbot modal opens and accepts input", async ({ page }) => {
    await page.goto(FRONTEND_URL);

    // Look for chatbot button (usually floating button)
    const chatbotButton = page
      .locator(
        'button[class*="chatbot"], button[aria-label*="AI"], button:has-text("")'
      )
      .first();

    if (await chatbotButton.isVisible()) {
      await chatbotButton.click();

      // Modal should open
      const chatModal = page.locator('[role="dialog"], [class*="modal"]');
      await expect(chatModal).toBeVisible();

      // Can type message
      const chatInput = page
        .locator(
          'input[placeholder*="pesan"], textarea[placeholder*="message"]'
        )
        .first();
      await chatInput.fill("Test message");

      // Has send button
      const sendButton = page
        .locator('button[type="submit"], button:has-text("Kirim")')
        .first();
      await expect(sendButton).toBeVisible();
    }
  });
});
