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

### Step 2: Setup dan Start Backend (WAJIB Running)

PENTING: Testing suite ini memerlukan backend final dari Modul 5 yang sudah complete. Pastikan backend running sebelum menjalankan integration tests.

```bash
# 1. Navigate ke Backend Modul 5 (Final Backend Project)
cd ../../backend/health-ecommerce-external-integration/finished-project

# 2. Install dependencies (jika belum)
npm install

# 3. Setup .env file dengan API keys yang diperlukan:
# Buat file .env di folder finished-project backend
# Isi dengan:
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/health_ecommerce
# JWT_SECRET=your_jwt_secret_key
# GEMINI_API_KEY=your_google_gemini_api_key
# MIDTRANS_SERVER_KEY=your_midtrans_server_key
# MIDTRANS_CLIENT_KEY=your_midtrans_client_key
# CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
# CLOUDINARY_API_KEY=your_cloudinary_api_key
# CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# 4. Pastikan MongoDB running
# PENTING: MongoDB harus running sebelum menjalankan backend dan tests
# 
# Opsi A (RECOMMENDED): Menggunakan MongoDB Compass atau MongoDB Atlas
# - Buka MongoDB Compass
# - Connect ke database: mongodb://localhost:27017
# - Jika berhasil connect, berarti MongoDB sudah running
# - Atau gunakan connection string dari MongoDB Atlas jika menggunakan cloud database
# 
# Opsi B: Menggunakan MongoDB Service (Windows Service / macOS Service)
# - Pastikan MongoDB service sudah running di system services
# - Windows: Check Services app, cari "MongoDB"
# - macOS: Check Activity Monitor atau system preferences
# 
# Opsi C: Menggunakan mongod command (jika opsi A dan B tidak tersedia)
# - Buka terminal baru
# - Jalankan: mongod
# - Pastikan MongoDB service running
# 
# CATATAN: Jika mongod tidak jalan di local, tidak perlu dipaksakan
# Gunakan MongoDB Compass untuk cek apakah database sudah accessible
# Atau gunakan MongoDB Atlas (cloud) sebagai alternatif

# 5. Seed database dengan sample data
npm run seed

# 6. Start backend server (keep running di terminal ini!)
npm run dev

# Backend akan running di: http://localhost:5000
# Pastikan backend URL ini sama dengan BASE_URL di testing .env
```

**VERIFIKASI BACKEND:**
```bash
# Test backend health endpoint
curl http://localhost:5000/health

# Jika berhasil, akan return: { "status": "ok" } atau { "success": true, "message": "Server is running" }
```

### Step 3: Setup dan Start Frontend (Untuk E2E Tests)

PENTING: Frontend diperlukan untuk E2E tests. Pastikan frontend running sebelum menjalankan E2E tests.

```bash
# 1. Navigate ke Frontend Modul 3 (Final Frontend Project)
cd ../../frontend/health-ecommerce-production-uiux/finished-project

# 2. Install dependencies (jika belum)
npm install

# 3. Setup .env file:
# Buat file .env di folder finished-project frontend
# Isi dengan:
# VITE_API_URL=http://localhost:5000

# PENTING: Pastikan VITE_API_URL sama dengan backend yang sedang running!
# Jika backend running di port lain, update VITE_API_URL sesuai dengan port backend yang digunakan

# 4. Start frontend development server (keep running di terminal ini!)
npm run dev

# Frontend akan running di: http://localhost:3000
# Pastikan frontend URL ini sama dengan FRONTEND_URL di testing .env
```

**VERIFIKASI FRONTEND:**
```bash
# Test frontend
curl http://localhost:3000

# Atau buka browser: http://localhost:3000
# Pastikan frontend bisa load dan connect ke backend
```

**PENTING:**
- Backend HARUS running di http://localhost:5000 sebelum menjalankan integration tests
- Frontend HARUS running di http://localhost:3000 sebelum menjalankan E2E tests
- Pastikan .env di testing project memiliki:
  - BASE_URL=http://localhost:5000 (untuk backend)
  - FRONTEND_URL=http://localhost:3000 (untuk frontend)
- Jika backend atau frontend running di port lain, update .env sesuai dengan port yang digunakan

### Step 3: Run Tests

```bash
# PENTING: Pastikan kamu berada di folder starter-project!
# Jika error "Missing script: test", pastikan kamu di folder yang benar
# Cek dengan: ls package.json (harus ada file package.json di folder saat ini)

# Run unit tests (fast!)
npm run test:unit

# Run integration tests (needs backend!)
npm run test:integration

# Run E2E tests (needs backend + frontend!)
npx playwright install chromium
npm run test:e2e

# Run all tests (unit + integration)
npm test
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
