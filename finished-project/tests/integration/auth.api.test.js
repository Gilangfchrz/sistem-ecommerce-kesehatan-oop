/**
 * Integration Tests - Authentication API
 * Testing Health E-Commerce Auth endpoints (JWT)
 * Backend: http://localhost:5000
 */

const request = require('supertest');
const BASE_URL = process.env.BACKEND_URL || 'http://localhost:5000';

describe('Health E-Commerce - Authentication API', () => {
  
  let authToken;

  describe('POST /api/auth/register', () => {
    test('should register new user successfully', async () => {
      const uniqueEmail = `test${Date.now()}@example.com`;
      
      const userData = {
        email: uniqueEmail,
        password: 'SecurePass123!',
        name: 'Test User'
      };

      const response = await request(BASE_URL)
        .post('/api/auth/register')
        .send(userData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.user.email).toBe(uniqueEmail);
      expect(response.body.user).toHaveProperty('name', 'Test User');
      expect(response.body.user.password).toBeUndefined(); // Password tidak boleh di-return
    });

    test('should reject registration dengan email yang sudah terdaftar', async () => {
      const response = await request(BASE_URL)
        .post('/api/auth/register')
        .send({
          email: 'aila@example.com', // Email dari seed data
          password: 'SecurePass123!',
          name: 'Duplicate User'
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toMatch(/already exists|sudah terdaftar/i);
    });

    test('should validate email format', async () => {
      const response = await request(BASE_URL)
        .post('/api/auth/register')
        .send({
          email: 'invalid-email',
          password: 'SecurePass123!',
          name: 'Test'
        })
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    test('should validate password strength', async () => {
      const response = await request(BASE_URL)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          password: '123', // Too weak
          name: 'Test'
        })
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe('POST /api/auth/login', () => {
    test('should login dengan credentials yang benar', async () => {
      const credentials = {
        email: process.env.TEST_EMAIL || 'aila@example.com',
        password: process.env.TEST_PASSWORD || 'Aila123!'
      };

      const response = await request(BASE_URL)
        .post('/api/auth/login')
        .send(credentials)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty('token');
      expect(typeof response.body.token).toBe('string');
      expect(response.body.token.length).toBeGreaterThan(20);

      // Save token untuk test selanjutnya
      authToken = response.body.token;
    });

    test('should reject login dengan password salah', async () => {
      const response = await request(BASE_URL)
        .post('/api/auth/login')
        .send({
          email: 'aila@example.com',
          password: 'WrongPassword123!'
        })
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toMatch(/invalid|salah|incorrect/i);
    });

    test('should reject login untuk user yang tidak terdaftar', async () => {
      const response = await request(BASE_URL)
        .post('/api/auth/login')
        .send({
          email: 'notexist@example.com',
          password: 'AnyPassword123!'
        })
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/auth/profile', () => {
    beforeAll(async () => {
      // Login to get token
      const loginResponse = await request(BASE_URL)
        .post('/api/auth/login')
        .send({
          email: 'aila@example.com',
          password: 'Aila123!'
        });
      
      authToken = loginResponse.body.token;
    });

    test('should get user profile dengan valid token', async () => {
      const response = await request(BASE_URL)
        .get('/api/auth/profile')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.user).toHaveProperty('email', 'aila@example.com');
      expect(response.body.user).toHaveProperty('name');
      expect(response.body.user).toHaveProperty('role');
    });

    test('should reject request tanpa token', async () => {
      const response = await request(BASE_URL)
        .get('/api/auth/profile')
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toMatch(/token|unauthorized/i);
    });

    test('should reject request dengan invalid token', async () => {
      const response = await request(BASE_URL)
        .get('/api/auth/profile')
        .set('Authorization', 'Bearer invalid-token-here')
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });
});

