# komdigi-fsd-intermediate-modul-1-common-health-ecommerce-complete-testing

> Complete Testing Suite untuk Health E-Commerce MERN System

[![Jest](https://img.shields.io/badge/Jest-29.7-green)](https://jestjs.io/)
[![Supertest](https://img.shields.io/badge/Supertest-6.3-blue)](https://github.com/ladjs/supertest)
[![Playwright](https://img.shields.io/badge/Playwright-1.41-green)](https://playwright.dev/)
[![Coverage](https://img.shields.io/badge/Target-85%25-brightgreen)](https://jestjs.io/)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

Comprehensive testing suite covering unit tests, integration tests, dan end-to-end tests untuk complete Health E-Commerce system.

---

## Apa yang Ada di Repository Ini?

Repository ini berisi **2 versi project**:

```
komdigi-fsd-intermediate-modul-1-common-health-ecommerce-complete-testing/
├── README.md (Ini file yang kamu baca)
├── starter-project/     #  Basic test setup (dengan TODO)
│   ├── README.md
│   ├── package.json
│   ├── jest.config.js   #  Jest configuration (ready!)
│   ├── tests/
│   │   ├── unit/
│   │   │   └── currency.test.js (with TODOs)
│   │   ├── integration/
│   │   │   └── products.test.js (with TODOs)
│   │   └── e2e/
│   │       └── shopping.spec.js (with TODOs)
│   └── playwright.config.js  #  Playwright config (ready!)
└── finished-project/    #  44 complete tests!
    ├── README.md
    ├── package.json
    ├── jest.config.js
    ├── tests/
    │   ├── unit/
    │   │   └── currency.test.js         (8 tests )
    │   ├── integration/
    │   │   ├── products.api.test.js     (9 tests )
    │   │   ├── auth.api.test.js         (8 tests )
    │   │   ├── ai.chatbot.test.js       (4 tests )
    │   │   └── payment.api.test.js      (5 tests )
    │   └── e2e/
    │       └── checkout.flow.spec.js    (10 tests )
    ├── playwright.config.js
    └── .env.example
```

**Pilih mana?**

- **Starter** - Untuk **practice testing** (RECOMMENDED!)
- **Finished** - Untuk **reference** test patterns

---

## Quick Start (Untuk Newbie)

### Prerequisites

Sebelum mulai, pastikan:

- **Backend running** di `http://localhost:5000`
- Repository: `health-ecommerce-ai-integration` (Backend Modul 5)
- Harus running untuk integration & E2E tests!
- **Frontend running** di `http://localhost:3000` (untuk E2E tests)
- Repository: `health-ecommerce-production-uiux` (Frontend Modul 3)
- **MongoDB accessible** (untuk integration tests)
  - Bisa menggunakan MongoDB Compass, MongoDB Atlas, atau MongoDB service
  - Tidak perlu menjalankan `mongod` command jika sudah accessible dengan cara lain

** Setup System (WAJIB Running):**

PENTING: Testing suite ini memerlukan backend final dari Modul 5 dan frontend final dari Modul 3 yang sudah complete. Pastikan keduanya running sebelum menjalankan tests.

**Terminal 1: Setup dan Start Backend (Modul 5)**

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

**Terminal 2: Setup dan Start Frontend (Modul 3)**

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

---

### Option 1: Practice dengan Starter Project

```bash
# 1. Clone repository ini
git clone https://github.com/your-username/komdigi-fsd-intermediate-modul-1-common-health-ecommerce-complete-testing.git

# 2. Masuk ke folder repository
cd komdigi-fsd-intermediate-modul-1-common-health-ecommerce-complete-testing

# 3. Masuk ke starter-project
cd starter-project

# PENTING: Pastikan kamu berada di folder starter-project sebelum menjalankan npm commands!
# Verifikasi dengan: ls package.json (harus ada file package.json)

# 4. Install dependencies
npm install

# 5. Install Playwright browsers
npx playwright install chromium

# 6. Setup environment variables
cp .env.example .env
# Defaults sudah OK (localhost:5000, localhost:3000)

# 7. Run tests (backend & frontend must be running!)
# PENTING: Pastikan kamu berada di folder starter-project!
# Jika belum, jalankan: cd starter-project
npm test
```

---

### Option 2: Lihat Complete Test Suite

```bash
# 1. Clone repository (jika belum)
git clone https://github.com/your-username/komdigi-fsd-intermediate-modul-1-common-health-ecommerce-complete-testing.git

# 2. Masuk ke folder repository
cd komdigi-fsd-intermediate-modul-1-common-health-ecommerce-complete-testing

# 3. Masuk ke finished-project
cd finished-project

# PENTING: Pastikan kamu berada di folder finished-project sebelum menjalankan npm commands!
# Verifikasi dengan: ls package.json (harus ada file package.json)

# 4. Install dependencies
npm install

# 5. Install Playwright browsers
npx playwright install chromium

# 6. Setup .env
cp .env.example .env

# 7. Ensure backend & frontend running!
# Check: curl http://localhost:5000/health
# Check: curl http://localhost:3000

# 8. Run all tests
# PENTING: Pastikan kamu berada di folder finished-project!
# Jika belum, jalankan: cd finished-project
npm test

# 9. Run dengan coverage
npm run test:coverage

# 10. Run E2E tests
npm run test:e2e
```

---

## Apa yang Akan Kamu Pelajari?

**Common Modul 1** melanjutkan setelah semua Backend & Frontend modules dengan **comprehensive testing**!

### Konsep yang Dipelajari:

- **Unit Testing** - Test functions & utilities dengan Jest
- **Integration Testing** - Test API endpoints dengan Supertest
- **E2E Testing** - Automate UI testing dengan Playwright
- **Coverage Tracking** - Generate & interpret coverage reports
- **Test Patterns** - AAA, mocking, test isolation
- **CI/CD Integration** - Automated testing in pipeline

### Apa yang Ditest:

**Backend API (26 integration tests):**

- Products endpoints (9 tests)
- Auth endpoints (8 tests)
- AI Chatbot - Google Gemini (4 tests)
- Payment - Midtrans (5 tests)

**Frontend E2E (10 tests):**

- Complete shopping flow
- Product browsing & filtering
- Cart management
- Checkout process
- Responsive behavior

**Unit Tests (8 tests):**

- Currency utilities
- Validation functions

**Total:** **44 comprehensive tests!**

---

## Struktur Starter Project

```
starter-project/
├── README.md              # Setup guide
├── package.json           # Dependencies
├── jest.config.js         #  Jest config (ready!)
├── playwright.config.js   #  Playwright config (ready!)
├── .env.example           #  Environment template
├── tests/
│   ├── unit/
│   │   └── currency.test.js      #  TODO: Complete tests
│   ├── integration/
│   │   ├── products.test.js      #  TODO: Test products API
│   │   ├── auth.test.js          #  TODO: Test auth API
│   │   └── ai.test.js            #  TODO: Test AI endpoint
│   └── e2e/
│       └── shopping.spec.js      #  TODO: E2E checkout flow
└── README.md
```

**TODOs:**

- [ ] Complete unit tests untuk utilities
- [ ] Write integration tests untuk all endpoints
- [ ] Create E2E tests untuk user flows
- [ ] Achieve 80%+ coverage

---

## Struktur Finished Project

```
finished-project/
├── README.md              # Complete guide
├── package.json           # All dependencies
├── jest.config.js         #  Jest configuration
├── playwright.config.js   #  Playwright configuration
├── .env.example           #  Environment variables
├── tests/
│   ├── unit/
│   │   └── currency.test.js           #  8 tests passing!
│   ├── integration/
│   │   ├── products.api.test.js       #  9 tests (Products CRUD)
│   │   ├── auth.api.test.js           #  8 tests (JWT auth)
│   │   ├── ai.chatbot.test.js         #  4 tests (Gemini AI)
│   │   └── payment.api.test.js        #  5 tests (Midtrans)
│   └── e2e/
│       └── checkout.flow.spec.js      #  10 tests (Full flow)
└── README.md
```

**All tests implemented:**

- 44 tests total
- 85%+ coverage
- Tests actual Health E-Commerce system
- Integration dengan localhost:5000
- E2E tests localhost:3000

---

## Test Coverage

### Integration Tests (26 tests)

**Products API (9 tests):**

```
✓ GET /api/products returns all products
✓ Filter products by category=Vitamin
✓ Search products by keyword
✓ Filter by price range (min/max)
✓ GET /api/products/:id returns single product
✓ Returns 404 for non-existent ID
✓ Returns 400 for invalid ID format
✓ GET /health returns server status
```

**Auth API (8 tests):**

```
✓ POST /api/auth/register creates new user
✓ Rejects duplicate email registration
✓ Validates email format
✓ Validates password strength
✓ POST /api/auth/login with correct credentials
✓ Rejects login with wrong password
✓ GET /api/auth/profile with valid token
✓ Rejects request without token
```

**AI Chatbot (4 tests):**

```
✓ POST /api/external/ai/chat returns recommendations
✓ Rejects empty message
✓ Handles AI API errors gracefully
✓ AI response relevant to health products
```

**Payment (5 tests):**

```
✓ POST /api/external/payment/create with valid data
✓ Rejects negative amount
✓ Validates customer details required
✓ Validates items array not empty
✓ POST /api/external/payment/notification handles webhook
```

---

### E2E Tests (10 tests)

```
✓ Homepage loads with all elements visible
✓ Can browse products and filter by category
✓ Complete shopping flow: browse → checkout
✓ Search functionality works correctly
✓ Responsive navigation works on mobile
✓ Add product to cart updates badge
✓ Cart page displays items
✓ Checkout form validates input
✓ Payment button redirects to Midtrans
✓ AI chatbot modal opens and responds
```

---

### Unit Tests (8 tests)

```
✓ formatCurrency formats Rp correctly
✓ formatCurrency handles decimals
✓ calculateTax with default 10%
✓ calculateTax with custom rate
✓ calculateTax throws error for negative
✓ calculateTotal with tax
✓ calculateTotal with large numbers
```

**Grand Total:** 44 tests, 85%+ coverage!

---

## Hubungan dengan Modul Lain

**Dari Backend Modul 1-5:**

- Testing backend API endpoints
- Verifying CRUD operations
- Testing external integrations

**Dari Frontend Modul 1-3:**

- E2E testing user flows
- Testing responsive behavior
- Verifying cart & checkout

**Common Modul 1 (This!)** → Testing Everything

- Comprehensive test suite
- Unit + Integration + E2E
- Coverage reporting
- CI/CD ready

**Ke Common Modul 2:**

- → Tests run in GitHub Actions
- → Coverage uploaded to Codecov
- → Automated testing pipeline

**Complete quality assurance!**

---

## Troubleshooting

### "Missing script: test" atau "npm error Missing script: test"

**Problem:** Kamu menjalankan `npm test` di folder yang salah (root folder, bukan starter-project atau finished-project)

**Fix:**
```bash
# Pastikan kamu berada di folder yang benar
# Untuk starter-project:
cd starter-project

# Atau untuk finished-project:
cd finished-project

# Verifikasi package.json ada
ls package.json
# Atau di Windows PowerShell: dir package.json
# Atau di Windows CMD: dir package.json

# Sekarang jalankan test
npm test
```

**Verifikasi:**
```bash
# Cek apakah package.json ada dan berisi script "test"
cat package.json | grep test
# Atau di Windows: type package.json | findstr test
```

---

### "Connection refused - localhost:5000"

**Solusi:**

```bash
# Backend tidak running!
cd ../../Backend/Modul_5-External_API_Integration/finished-project
npm run dev

# Verify:
curl http://localhost:5000/health
# Should return: {"success":true,"message":"Server is running"}
```

---

### "Jest timeout exceeded (15000ms)"

**Solusi:**

```javascript
// Untuk AI & Payment tests, tambah timeout:
test('AI chatbot responds', async () => {
  // test code
}, 20000); // 20 seconds

// Or globally di jest.config.js:
{
  "testTimeout": 20000
}
```

---

### "Playwright browser not found"

**Solusi:**

```bash
npx playwright install chromium

# Or install all:
npx playwright install
```

---

### "AI chatbot test fails - 500 error"

**Solusi:**

```bash
# Check GEMINI_API_KEY configured di backend
cd ../../Backend/Modul_5.../finished-project
cat .env | grep GEMINI_API_KEY

# Should have:
GEMINI_API_KEY=your_actual_api_key

# Restart backend
npm run dev
```

---

### "Payment test fails - Midtrans error"

**Solusi:**

```bash
# Check Midtrans keys di backend .env
MIDTRANS_SERVER_KEY=SB-Mid-server-xxx
MIDTRANS_CLIENT_KEY=SB-Mid-client-xxx

# Test endpoint manually:
curl -X POST http://localhost:5000/api/external/payment/create \
  -H "Content-Type: application/json" \
  -d '{"orderId":"TEST","amount":100000,"items":[],"customerDetails":{}}'
```

---

### "E2E test - Element not found"

**Solusi:**

```javascript
// Increase wait timeout
await page.waitForSelector("article", { timeout: 10000 });

// Or wait for network idle
await page.waitForLoadState("networkidle");

// Add explicit wait
await page.waitForTimeout(1000);
```

---

## Tips Sukses

1. **Ensure Services Running** - Backend + Frontend + MongoDB
2. **Start with Unit Tests** - Easiest & fastest
3. **Then Integration** - Test API endpoints
4. **Finally E2E** - Most complex but most realistic
5. **Read Error Messages** - They tell exactly what failed
6. **Use Playwright UI Mode** - See tests execute visually
7. **Check Coverage** - Aim for 85%+
8. **Compare when stuck** - Check finished-project

---

## Resources

**Documentation:**

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Supertest Guide](https://github.com/ladjs/supertest)
- [Playwright Docs](https://playwright.dev/)
- [Testing Library](https://testing-library.com/)

**Tutorials:**

- [Jest Crash Course](https://www.youtube.com/watch?v=7r4xVDI2vho)
- [Playwright Tutorial](https://www.youtube.com/watch?v=wawbt1cATsk)
- [API Testing Guide](https://www.postman.com/api-testing/)

**Tools:**

- [Playwright Test Generator](https://playwright.dev/docs/codegen) - Record actions
- [Jest Coverage Reports](https://jestjs.io/docs/cli#--coverageboolean) - HTML reports

---

## Next Steps

After completing this module:

1.  **All 44 tests passing** - Complete test suite
2.  **85%+ coverage** - Quality threshold
3.  **E2E tests working** - Automated UI testing
4.  **Common Modul 2** - GitHub Workflow (automate tests in CI/CD)
5.  **Final Project** - Complete integration & deployment

---

**Test early, test often! **

_Modul 1 - Testing Suite (Unit, Integration & Automation)_  
_Part of Health E-Commerce Common Series_

---

** Repository Info:**

- **Name:** `komdigi-fsd-intermediate-modul-1-common-health-ecommerce-complete-testing`
- **Type:** Testing Suite
- **Tests:** Health E-Commerce system (Backend + Frontend)
- **Structure:** 1 Repo, 2 Folders (starter + finished)
