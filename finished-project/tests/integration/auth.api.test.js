/**
 * Integration Tests - Authentication API
 * Testing backend endpoints: POST /api/auth/register, /api/auth/login
 * 
 * Prerequisites: Backend must be running on http://localhost:5000
 * Run: npm run test:integration
 */

const request = require('supertest');

const BASE_URL = process.env.BACKEND_URL || 'http://localhost:5000';

// Generate random email untuk avoid duplicates
const generateTestEmail = () => {
  const timestamp = Date.now();
  return `test${timestamp}@example.com`;
};

describe('Authentication API - Integration Tests', () => {
  
  let testUser = {
    name: 'Test User',
    email: generateTestEmail(),
    password: 'Test123!@#'
  };

  let authToken = '';

  // Test 1: Register new user
  test('POST /api/auth/register creates new user', async () => {
    const response = await request(BASE_URL)
      .post('/api/auth/register')
      .send(testUser)
      .expect(201);

    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveProperty('token');
    expect(response.body.data).toHaveProperty('user');
    expect(response.body.data.user.email).toBe(testUser.email);
    
    // Save token for later tests
    authToken = response.body.data.token;
  });

  // Test 2: Duplicate email rejected
  test('POST /api/auth/register rejects duplicate email', async () => {
    const response = await request(BASE_URL)
      .post('/api/auth/register')
      .send(testUser)
      .expect(400);

    expect(response.body.success).toBe(false);
    expect(response.body.message).toMatch(/already|exists|duplicate/i);
  });

  // Test 3: Invalid email format
  test('POST /api/auth/register validates email format', async () => {
    const response = await request(BASE_URL)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'invalid-email',
        password: 'Test123!@#'
      })
      .expect(400);

    expect(response.body.success).toBe(false);
  });

  // Test 4: Weak password rejected
  test('POST /api/auth/register validates password strength', async () => {
    const response = await request(BASE_URL)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: generateTestEmail(),
        password: '123' // Too weak
      })
      .expect(400);

    expect(response.body.success).toBe(false);
  });

  // Test 5: Login with correct credentials
  test('POST /api/auth/login with correct credentials returns token', async () => {
    const response = await request(BASE_URL)
      .post('/api/auth/login')
      .send({
        email: testUser.email,
        password: testUser.password
      })
      .expect(200);

    expect(response.body).toHaveProperty('success', true);
    expect(response.body.data).toHaveProperty('token');
    expect(response.body.data).toHaveProperty('user');
  });

  // Test 6: Login with wrong password
  test('POST /api/auth/login with wrong password fails', async () => {
    const response = await request(BASE_URL)
      .post('/api/auth/login')
      .send({
        email: testUser.email,
        password: 'WrongPassword123'
      })
      .expect(401);

    expect(response.body.success).toBe(false);
  });

  // Test 7: Login with non-existent email
  test('POST /api/auth/login with non-existent email fails', async () => {
    const response = await request(BASE_URL)
      .post('/api/auth/login')
      .send({
        email: 'nonexistent@example.com',
        password: 'Test123!@#'
      })
      .expect(401);

    expect(response.body.success).toBe(false);
  });

  // Test 8: Get profile with valid token
  test('GET /api/auth/profile with valid token returns user data', async () => {
    const response = await request(BASE_URL)
      .get('/api/auth/profile')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty('email', testUser.email);
  });

  // Test 9: Get profile without token fails
  test('GET /api/auth/profile without token returns 401', async () => {
    const response = await request(BASE_URL)
      .get('/api/auth/profile')
      .expect(401);

    expect(response.body.success).toBe(false);
  });

});
