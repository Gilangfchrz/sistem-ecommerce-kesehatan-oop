/**
 * Integration Tests - Products API
 * Testing backend endpoints: GET /api/products
 * 
 * Prerequisites: Backend must be running on http://localhost:5000
 * Run: npm run test:integration
 */

const request = require('supertest');

const BASE_URL = process.env.BACKEND_URL || 'http://localhost:5000';

describe('Products API - Integration Tests', () => {
  
  // Test 1: Health check
  test('GET /health returns server status', async () => {
    const response = await request(BASE_URL)
      .get('/health')
      .expect(200);

    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('message');
  });

  // Test 2: Get all products
  test('GET /api/products returns all products', async () => {
    const response = await request(BASE_URL)
      .get('/api/products')
      .expect(200);

    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('data');
    expect(Array.isArray(response.body.data)).toBe(true);
    
    // Verify product structure
    if (response.body.data.length > 0) {
      const product = response.body.data[0];
      expect(product).toHaveProperty('_id');
      expect(product).toHaveProperty('name');
      expect(product).toHaveProperty('price');
      expect(product).toHaveProperty('category');
    }
  });

  // Test 3: Filter by category
  test('GET /api/products?category=Vitamin filters correctly', async () => {
    const response = await request(BASE_URL)
      .get('/api/products?category=Vitamin')
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
    
    // All products should be Vitamin category
    response.body.data.forEach(product => {
      expect(product.category).toBe('Vitamin');
    });
  });

  // Test 4: Search products
  test('GET /api/products?search=vitamin finds products', async () => {
    const response = await request(BASE_URL)
      .get('/api/products?search=vitamin')
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  // Test 5: Filter by price range
  test('GET /api/products with price range filters correctly', async () => {
    const response = await request(BASE_URL)
      .get('/api/products?minPrice=50000&maxPrice=150000')
      .expect(200);

    expect(response.body.success).toBe(true);
    
    // Verify prices are within range
    response.body.data.forEach(product => {
      expect(product.price).toBeGreaterThanOrEqual(50000);
      expect(product.price).toBeLessThanOrEqual(150000);
    });
  });

  // Test 6: Get product by ID
  test('GET /api/products/:id returns single product', async () => {
    // First get a product ID
    const listResponse = await request(BASE_URL)
      .get('/api/products')
      .expect(200);

    if (listResponse.body.data.length > 0) {
      const productId = listResponse.body.data[0]._id;

      const response = await request(BASE_URL)
        .get(`/api/products/${productId}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data._id).toBe(productId);
    }
  });

  // Test 7: Invalid product ID returns 404
  test('GET /api/products/:id with non-existent ID returns 404', async () => {
    const fakeId = '507f1f77bcf86cd799439011'; // Valid ObjectId format but doesn't exist
    
    const response = await request(BASE_URL)
      .get(`/api/products/${fakeId}`)
      .expect(404);

    expect(response.body.success).toBe(false);
  });

  // Test 8: Invalid ID format returns 400
  test('GET /api/products/:id with invalid format returns 400', async () => {
    const response = await request(BASE_URL)
      .get('/api/products/invalid-id-123')
      .expect(400);

    expect(response.body.success).toBe(false);
  });

  // Test 9: Multiple filters combined
  test('GET /api/products with multiple filters works', async () => {
    const response = await request(BASE_URL)
      .get('/api/products?category=Supplement&minPrice=100000')
      .expect(200);

    expect(response.body.success).toBe(true);
    
    response.body.data.forEach(product => {
      expect(product.category).toBe('Supplement');
      expect(product.price).toBeGreaterThanOrEqual(100000);
    });
  });

});
