/**
 * Integration Tests - Products API (STARTER)
 * TODO: Complete the API tests below
 *
 * Prerequisites: Backend must be running on http://localhost:5000
 * Run: npm run test:integration
 *
 * Learning objectives:
 * - Test real API endpoints
 * - Use Supertest untuk HTTP requests
 * - Verify response structure dan data
 */

const request = require("supertest");

const BASE_URL = process.env.BACKEND_URL || "http://localhost:5000";

describe("Products API - Integration Tests (STARTER)", () => {
  //  Example test (already complete)
  test("GET /health returns server status", async () => {
    const response = await request(BASE_URL).get("/health").expect(200);

    expect(response.body).toHaveProperty("success", true);
    expect(response.body).toHaveProperty("message");
  });

  // TODO 1: Test get all products
  test("GET /api/products returns all products", async () => {
    // TODO: Send GET request ke /api/products
    // TODO: Expect status 200
    // TODO: Verify response has 'success' dan 'data' properties
    // TODO: Verify data is an array
    // HINT: const response = await request(BASE_URL).get('/api/products').expect(200);
    // HINT: expect(response.body).toHaveProperty('success', true);
    // HINT: expect(Array.isArray(response.body.data)).toBe(true);
  });

  // TODO 2: Test filter by category
  test("GET /api/products?category=Vitamin filters correctly", async () => {
    // TODO: Send GET request dengan query parameter category=Vitamin
    // TODO: Verify semua products returned punya category 'Vitamin'
    // HINT: .get('/api/products?category=Vitamin')
    // HINT: response.body.data.forEach(product => { ... })
  });

  // TODO 3: Test search functionality
  test("GET /api/products?search=vitamin finds products", async () => {
    // TODO: Send GET request dengan search parameter
    // TODO: Verify response success dan data is array
  });

  // TODO 4: Test get product by ID
  test("GET /api/products/:id returns single product", async () => {
    // TODO: First, get list of products
    // TODO: Extract first product ID
    // TODO: Send GET request untuk that specific ID
    // TODO: Verify response contains product dengan ID yang sama
    // HINT: First call: await request(BASE_URL).get('/api/products')
    // HINT: Get ID: const productId = listResponse.body.data[0]._id
    // HINT: Second call: await request(BASE_URL).get(`/api/products/${productId}`)
  });

  // TODO 5: Test 404 for non-existent ID
  test("GET /api/products/:id with non-existent ID returns 404", async () => {
    // TODO: Use fake but valid MongoDB ObjectId
    // TODO: Expect status 404
    // TODO: Verify success is false
    // HINT: const fakeId = '507f1f77bcf86cd799439011';
    // HINT: .expect(404)
  });

  // TODO 6: Test invalid ID format
  test("GET /api/products/:id with invalid format returns 400", async () => {
    // TODO: Use invalid ID format (e.g., 'invalid-id-123')
    // TODO: Expect status 400
  });
});

// ==========================================
// LEARNING RESOURCES
// ==========================================

/*
SUPERTEST CHEAT SHEET:

request(baseURL)
  .get('/path')                    - GET request
  .post('/path')                   - POST request
  .send({ data })                  - Send JSON body
  .set('Header', 'value')          - Set header
  .expect(200)                     - Expect status code
  .expect('Content-Type', /json/)  - Expect header

COMMON PATTERNS:

// GET request
const response = await request(BASE_URL)
  .get('/api/products')
  .expect(200);

// POST request dengan body
const response = await request(BASE_URL)
  .post('/api/products')
  .send({ name: 'Test', price: 100 })
  .expect(201);

JEST ASSERTIONS:

expect(response.body).toHaveProperty('success', true)
expect(response.body.data).toBeInstanceOf(Array)
expect(response.body.data.length).toBeGreaterThan(0)

NEXT STEPS:
1. Complete TODOs 1-6
2. Run: npm run test:integration (ensure backend running!)
3. All tests should pass!
4. Compare dengan finished-project jika stuck
*/
