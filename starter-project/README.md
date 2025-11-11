# Health E-Commerce - Testing Suite (STARTER)

> **Practice Project: Learn testing dengan TODOs**

**Goal:** Learn to write unit tests, integration tests, dan E2E tests untuk Health E-Commerce system!

---

## **What You'll Learn**

Di starter project ini, kamu akan practice:

- **Unit Testing** - Test utility functions dengan Jest
- **Integration Testing** - Test real API endpoints dengan Supertest
- **E2E Testing** - Automate UI testing dengan Playwright
- **AAA Pattern** - Arrange, Act, Assert
- **Test Coverage** - Generate coverage reports

---

## **Project Structure**

```
starter-project/
├── package.json            All dependencies ready
├── jest.config.js          TODO: Configure Jest
├── playwright.config.js    TODO: Configure Playwright
├── tests/
│   ├── unit/
│   │   └── currency.test.js       TODO: Complete 8 unit tests
│   ├── integration/
│   │   └── products.test.js       TODO: Complete 6 API tests
│   └── e2e/
│       └── shopping.spec.js       TODO: Complete 6 E2E tests
└── README.md (This file!)
```

**TODOs:** 20+ test cases untuk kamu complete!

---

## **Quick Start**

### Step 1: Install Dependencies

```bash
cd starter-project
npm install
```

### Step 2: Ensure Backend & Frontend Running

```bash
# Backend must be running di http://localhost:5000
# Frontend must be running di http://localhost:3000
# (For E2E tests)
```

### Step 3: Run Tests

```bash
# Run unit tests (fast!)
npm run test:unit

# Run integration tests (needs backend!)
npm run test:integration

# Run E2E tests (needs backend + frontend!)
npx playwright install chromium
npm run test:e2e
```

---

## **Learning Path**

### Task 1: Unit Tests (Easy - 30 min)

**File:** `tests/unit/currency.test.js`

**TODOs:**

- [ ] TODO 1: Test large numbers
- [ ] TODO 2: Test zero value
- [ ] TODO 3: Test error handling
- [ ] TODO 4: Test default tax rate
- [ ] TODO 5: Test custom tax rate
- [ ] TODO 6: Test negative validation
- [ ] TODO 7: Test total calculation
- [ ] TODO 8: Test large quantities

**Run:**

```bash
npm run test:unit
```

**Expected:** 8 tests pass!

---

### Task 2: Integration Tests (Medium - 1 hour)

**File:** `tests/integration/products.test.js`

**TODOs:**

- [ ] TODO 1: Test get all products
- [ ] TODO 2: Test filter by category
- [ ] TODO 3: Test search
- [ ] TODO 4: Test get by ID
- [ ] TODO 5: Test 404 error
- [ ] TODO 6: Test invalid ID

**Run:**

```bash
# Ensure backend running!
curl http://localhost:5000/health

npm run test:integration
```

**Expected:** 6 tests pass!

---

### Task 3: E2E Tests (Advanced - 1.5 hours)

**File:** `tests/e2e/shopping.spec.js`

**TODOs:**

- [ ] TODO 1: Test browse products
- [ ] TODO 2: Test search
- [ ] TODO 3: Test add to cart
- [ ] TODO 4: Test view cart
- [ ] TODO 5: Test checkout form
- [ ] TODO 6: Test responsive menu

**Run:**

```bash
# Ensure backend + frontend running!
curl http://localhost:5000/health
curl http://localhost:3000

npm run test:e2e

# Use UI mode untuk see browser:
npm run test:e2e:ui
```

**Expected:** 6 tests pass!

---

## **Hints & Tips**

### Jest Basics:

```javascript
// Basic test structure
test("description", () => {
  // Arrange
  const input = 100;

  // Act
  const result = myFunction(input);

  // Assert
  expect(result).toBe(expected);
});

// Async tests
test("async function", async () => {
  const result = await asyncFunction();
  expect(result).toBeDefined();
});
```

### Supertest Basics:

```javascript
const response = await request(BASE_URL).get("/api/products").expect(200);

expect(response.body).toHaveProperty("data");
```

### Playwright Basics:

```javascript
await page.goto(URL);
await page.click("button");
await page.fill("input", "text");
await expect(page.locator("h1")).toBeVisible();
```

---

## **Troubleshooting**

### "Backend connection refused"

```bash
# Start backend:
cd ../../../Backend/Modul_5-External_API_Integration/finished-project
npm run dev
```

### "Playwright browser not found"

```bash
npx playwright install chromium
```

### "Jest timeout"

```javascript
// Add timeout to specific test:
test("name", async () => {
  // test code
}, 20000); // 20 seconds
```

---

## **Success Criteria**

You're done when:

- All 8 unit tests pass
- All 6 integration tests pass
- All 6 E2E tests pass
- **Total: 20 tests pass!**
- You understand test patterns
- Ready for finished-project!

---

## **Resources**

- [Jest Documentation](https://jestjs.io/)
- [Supertest Guide](https://github.com/ladjs/supertest)
- [Playwright Docs](https://playwright.dev/)
- **Compare:** `../finished-project/` untuk reference

---

## **Next Steps**

After completing:

1.  Check finished-project untuk compare
2.  Run coverage: `npm run test:coverage`
3.  Add more test cases untuk extra practice
4.  Modul 2: GitHub Workflow

---

**Happy Testing! **

_Starter Project - Common Modul 1_  
_Practice Testing with TODOs_
