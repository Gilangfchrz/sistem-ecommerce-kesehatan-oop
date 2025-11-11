# Health E-Commerce - Complete Testing Suite

> **Testing lengkap untuk sistem Health E-Commerce MERN (Backend + Frontend + AI + Payment)**

[![Jest](https://img.shields.io/badge/Jest-29.7-green)](https://jestjs.io/)
[![Supertest](https://img.shields.io/badge/Supertest-6.3-blue)](https://github.com/ladjs/supertest)
[![Playwright](https://img.shields.io/badge/Playwright-1.41-green)](https://playwright.dev/)
[![Coverage](https://img.shields.io/badge/Target-85%25-brightgreen)]()

**Test suite lengkap untuk memastikan Health E-Commerce berjalan sempurna!**

---

## Apa yang Ditest?

Testing suite ini mengcover **SELURUH SISTEM Health E-Commerce:**

### **Backend API Testing (Supertest)**

- Products API (`/api/products`) - GET all, GET by ID, filters
- Authentication API (`/api/auth`) - Register, login, profile
- **AI Chatbot API** (`/api/external/ai/chat`) - Google Gemini
- **Payment API** (`/api/external/payment`) - Midtrans integration
- Health check endpoint

### **Frontend E2E Testing (Playwright)**

- Homepage loading & navigation
- Product browsing & filtering
- Product search functionality
- Add to cart flow
- Complete checkout process
- Responsive design (desktop + mobile)
- AI chatbot interaction

**Total Tests:** 25+ integration tests + 10+ E2E tests  
**Coverage Target:** 85%+

---

## Quick Start

### Prerequisites

**WAJIB: Backend & Frontend Harus Running!**

```bash
# Terminal 1: Start MongoDB
mongod

# Terminal 2: Start ULTIMATE Backend
cd ../../../Backend/Modul_5-External_API_Integration/finished-project
npm install
npm run seed    # Seed database with test data
npm run dev     # Start backend di port 5000

# Terminal 3: Start Frontend (pilih salah satu)
cd ../../../Frontend/Modul_3-UIUX_Best_Practices/finished-project
npm install
npm run dev     # Start frontend di port 3000

#  Backend: http://localhost:5000
#  Frontend: http://localhost:3000
```

---

### Run Testing Suite

```bash
# 1. Clone repository testing suite
git clone https://github.com/your-username/health-ecommerce-testing-suite.git
cd health-ecommerce-testing-suite

# 2. Masuk ke finished-project
cd finished-project

# 3. Install dependencies
npm install

# 4. Install Playwright browsers (untuk E2E tests)
npx playwright install chromium

# 5. Setup environment variables
cp .env.example .env
# Edit .env jika perlu (biasanya defaults sudah OK)

# 6. Run tests!
npm test
```

---

## Running Different Test Suites

### Unit Tests Only (Fast)

```bash
npm run test:unit

# Output:
# PASS tests/unit/currency.test.js
# ✓ formats Indonesian currency correctly
# ✓ calculates tax correctly
# Tests: 8 passed, 8 total
# Time: 0.5s
```

---

### Integration Tests (API Testing)

** Backend MUST be running!**

```bash
# Verify backend first
curl http://localhost:5000/api/products

# Run integration tests
npm run test:integration

# Output:
# PASS tests/integration/products.api.test.js
#   Health E-Commerce - Products API
#     GET /api/products
#       ✓ should return all products (245ms)
#       ✓ should filter by category (182ms)
#       ✓ should search products (156ms)
#     GET /api/products/:id
#       ✓ should return single product (134ms)
#       ✓ should return 404 for non-existent ID (89ms)
#
# PASS tests/integration/auth.api.test.js
#   Health E-Commerce - Authentication API
#     POST /api/auth/register
#       ✓ should register new user (456ms)
#       ✓ should reject duplicate email (234ms)
#     POST /api/auth/login
#       ✓ should login with correct credentials (312ms)
#       ✓ should reject wrong password (298ms)
#     GET /api/auth/profile
#       ✓ should get profile with valid token (178ms)
#       ✓ should reject request without token (92ms)
#
# PASS tests/integration/ai.chatbot.test.js
#   Health E-Commerce - AI Chatbot
#     POST /api/external/ai/chat
#       ✓ should get AI response (3.2s)
#       ✓ should reject empty message (124ms)
#
# PASS tests/integration/payment.api.test.js
#   Health E-Commerce - Payment API
#     POST /api/external/payment/create
#       ✓ should create payment with valid data (2.1s)
#       ✓ should reject negative amount (145ms)
#
# Tests: 20 passed, 20 total
# Time: 12.5s
```

---

### E2E Tests (Full User Flow)

** Backend & Frontend HARUS running!**

```bash
# Verify both running
curl http://localhost:5000/api/products  # Backend
curl http://localhost:3000                # Frontend

# Run Playwright E2E tests
npm run test:e2e

# Output:
# Running 5 tests using 1 worker
#
# ✓ checkout.flow.spec.js:10 Homepage loads correctly (1.2s)
# ✓ checkout.flow.spec.js:25 can browse products and filter (3.5s)
# ✓ checkout.flow.spec.js:45 complete shopping flow: browse → checkout (8.7s)
# ✓ checkout.flow.spec.js:95 search functionality works (2.1s)
# ✓ checkout.flow.spec.js:110 responsive navigation works (1.8s)
#
# 5 passed (17.3s)
```

**With UI Mode (See Browser):**

```bash
npm run test:e2e:ui
# Opens Playwright UI → Watch tests execute in real browser!
```

---

### Coverage Report

```bash
npm run test:coverage

# Output:
# ----------------------------|---------|----------|---------|---------|
# File                        | % Stmts | % Branch | % Funcs | % Lines |
# ----------------------------|---------|----------|---------|---------|
# All files                   |   87.5  |   82.3   |   90.1  |   88.2  |
#  integration/               |   92.1  |   88.5   |   95.0  |   93.4  |
#   products.api.test.js      |   95.2  |   90.0   |   100   |   96.1  |
#   auth.api.test.js          |   93.4  |   88.5   |   95.0  |   94.2  |
#   ai.chatbot.test.js        |   88.5  |   85.0   |   90.0  |   89.3  |
#   payment.api.test.js       |   91.2  |   87.5   |   92.5  |   92.8  |
# ----------------------------|---------|----------|---------|---------|
#
# Coverage report: ./coverage/lcov-report/index.html
```

---

## Test Coverage Breakdown

### Integration Tests (20+ tests)

**Products API (9 tests):**

```
✓ GET /api/products returns all products
✓ Filter by category=Vitamin
✓ Search by keyword
✓ Filter by price range
✓ GET /api/products/:id returns single product
✓ Returns 404 for non-existent product
✓ Returns 400 for invalid ID format
✓ GET /health returns status
```

**Auth API (8 tests):**

```
✓ POST /api/auth/register creates new user
✓ Rejects duplicate email
✓ Validates email format
✓ Validates password strength
✓ POST /api/auth/login with correct credentials
✓ Rejects wrong password
✓ GET /api/auth/profile with valid token
✓ Rejects request without token
```

**AI Chatbot (4 tests):**

```
✓ POST /api/external/ai/chat returns recommendations
✓ Rejects empty message
✓ Handles AI errors gracefully
✓ AI response relevant to health products
```

**Payment API (5 tests):**

```
✓ POST /api/external/payment/create with valid data
✓ Rejects negative amount
✓ Validates customer details
✓ Validates items array
✓ POST /api/external/payment/notification handles webhook
```

---

### E2E Tests (10+ tests)

**User Flows:**

```
✓ Homepage loads with all elements
✓ Browse products
✓ Filter by category
✓ Search products
✓ View product detail
✓ Add to cart
✓ View cart
✓ Checkout form
✓ Payment initiation
✓ Responsive mobile view
✓ AI chatbot interaction (if implemented)
```

---

## Troubleshooting

### "Connection refused - ECONNREFUSED localhost:5000"

**Problem:** Backend tidak running

**Fix:**

```bash
# Start backend
cd ../../../Backend/Modul_5-External_API_Integration/finished-project
npm run dev

# Verify running
curl http://localhost:5000/health
# Should return: {"success":true,"message":"Server is running"}
```

---

### "Jest timeout exceeded (15000ms)"

**Problem:** API call terlalu lama (biasanya AI atau Payment)

**Fix:**

```javascript
// Di test file, tambah timeout
test("AI chatbot responds", async () => {
  // test code
}, 20000); // 20 seconds timeout
```

Or globally di jest.config.js:

```javascript
{
  "testTimeout": 20000
}
```

---

### "Playwright browser not found"

**Problem:** Chromium browser belum ter-install

**Fix:**

```bash
npx playwright install chromium
# Or install all browsers:
npx playwright install
```

---

### "404 Not Found - /api/auth/login"

**Problem:** Auth routes belum mounted di backend

**Fix:**

```javascript
// Backend server.js - verify auth routes mounted
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes); // Must be present!
```

---

### "AI chatbot test fails - 500 error"

**Problem:** GEMINI_API_KEY tidak configured di backend

**Fix:**

```bash
# Backend .env file
GEMINI_API_KEY=your_actual_google_gemini_api_key_here

# Restart backend
npm run dev
```

---

### "Payment test fails - Midtrans error"

**Problem:** MIDTRANS keys tidak configured

**Fix:**

```bash
# Backend .env
MIDTRANS_SERVER_KEY=SB-Mid-server-xxxxx
MIDTRANS_CLIENT_KEY=SB-Mid-client-xxxxx

# Restart backend
```

---

### "E2E test fails - Element not found"

**Problem:** Frontend UI structure berbeda atau element belum load

**Fix:**

```javascript
// Increase wait time
await page.waitForSelector("article", { timeout: 10000 });

// Or use waitForLoadState
await page.waitForLoadState("networkidle");
```

---

## Test Suite Structure

```
finished-project/
├── tests/
│   ├── unit/
│   │   └── currency.test.js         #  8 tests (utility functions)
│   ├── integration/
│   │   ├── products.api.test.js     #  9 tests (Products CRUD)
│   │   ├── auth.api.test.js         #  8 tests (JWT auth)
│   │   ├── ai.chatbot.test.js       #  4 tests (Gemini AI)
│   │   └── payment.api.test.js      #  5 tests (Midtrans)
│   └── e2e/
│       └── checkout.flow.spec.js    #  10 tests (Full user flow)
├── playwright.config.js
├── package.json
├── .env.example
└── README.md (This file!)
```

**Total:** 44 tests covering complete Health E-Commerce system!

---

## Test Scenarios Covered

### Functional Testing

**Products:**

- List all products
- Filter by category
- Search by keyword
- Filter by price range
- Get product details
- Handle invalid IDs

**Authentication:**

- User registration
- User login (JWT)
- Get user profile (Protected route)
- Token validation
- Error handling (wrong password, duplicate email)

**AI Chatbot:**

- Send message to AI
- Receive product recommendations
- Input validation
- Error handling

**Payment:**

- Create payment (Midtrans)
- Payment redirect URL generated
- Webhook notification
- Data validation
- Error handling

---

### Non-Functional Testing

**Performance:**

- Response time < 500ms (most endpoints)
- AI response < 5s
- Payment creation < 3s

**Security:**

- Password not returned in responses
- Token required untuk protected routes
- Input validation working

**Reliability:**

- Error handling comprehensive
- Graceful degradation
- Clear error messages

---

## What You'll Learn

**Testing Strategies:**

- AAA Pattern (Arrange, Act, Assert)
- Test isolation (independent tests)
- Mock vs Real API testing
- E2E vs Integration trade-offs

**Tools Mastery:**

- Jest untuk unit & integration
- Supertest untuk API testing
- Playwright untuk E2E automation
- Coverage reporting

**Production Skills:**

- Test actual backend endpoints
- Test external integrations (AI, Payment)
- Automate UI testing
- CI/CD integration

---

## Challenge untuk Peserta

### Challenge #1: Add Kemenkes API Test

Test endpoint `/api/external/kemenkes/facilities`:

```javascript
test("should fetch health facilities from Kemenkes API", async () => {
  const response = await request(BASE_URL)
    .get("/api/external/kemenkes/facilities")
    .expect(200);

  expect(response.body.success).toBe(true);
  expect(response.body.data).toBeInstanceOf(Array);
});
```

---

### Challenge #2: Increase Coverage to 90%

Add more test cases sampai coverage > 90%!

**Hints:**

- Test edge cases (empty arrays, null values)
- Test error scenarios
- Test boundary conditions

---

### Challenge #3: Add Load Testing dengan k6

Create simple load test:

```javascript
// tests/load/products-load.js
import http from "k6/http";
import { check } from "k6";

export default function () {
  const res = http.get("http://localhost:5000/api/products");
  check(res, {
    "status is 200": (r) => r.status === 200,
    "response time < 500ms": (r) => r.timings.duration < 500,
  });
}
```

Run: `k6 run tests/load/products-load.js`

---

## CI/CD Integration

**GitHub Actions Workflow:**

```yaml
# .github/workflows/test.yml
name: Health E-Commerce Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      mongodb:
        image: mongo:7.0
        ports:
          - 27017:27017

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"

      - run: npm ci
      - run: npm run test:integration
      - run: npm run test:coverage

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
```

---

## Resources

**Testing Best Practices:**

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Supertest Guide](https://github.com/ladjs/supertest)
- [Playwright Docs](https://playwright.dev/docs/intro)

**Health E-Commerce Specific:**

- Backend API: http://localhost:5000/api-docs (Swagger)
- Test credentials: Email `aila@example.com`, Password `Aila123!`
- Payment sandbox: Use Midtrans test cards

---

**Test early, test often - Ship dengan confidence! **

---

** Repository:** `health-ecommerce-testing-suite`  
**System:** Health E-Commerce MERN  
**Backend:** localhost:5000 (ULTIMATE)  
**Coverage:** 85%+ target  
**Status:** Production-ready testing!
