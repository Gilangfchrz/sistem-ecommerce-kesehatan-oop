/**
 * Integration Tests - Payment API (Midtrans)
 * Testing backend endpoint: POST /api/external/payment/create
 * 
 * Prerequisites:
 * - Backend must be running on http://localhost:5000
 * - MIDTRANS_SERVER_KEY must be configured in backend
 * 
 * Run: npm run test:integration
 */

const request = require('supertest');

const BASE_URL = process.env.BACKEND_URL || 'http://localhost:5000';

describe('Payment API - Integration Tests', () => {
  
  const validPaymentData = {
    orderId: `ORDER-TEST-${Date.now()}`,
    amount: 250000,
    items: [
      {
        id: 'PROD-001',
        name: 'Vitamin C 1000mg',
        price: 85000,
        quantity: 2
      },
      {
        id: 'PROD-002',
        name: 'Vitamin D3 2000 IU',
        price: 120000,
        quantity: 1
      }
    ],
    customerDetails: {
      firstName: 'Aiman',
      lastName: 'Test',
      email: 'aiman.test@example.com',
      phone: '081234567890'
    }
  };

  // Test 1: Create payment with valid data
  test('POST /api/external/payment/create returns payment URL', async () => {
    const response = await request(BASE_URL)
      .post('/api/external/payment/create')
      .send(validPaymentData)
      .expect(200);

    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveProperty('paymentUrl');
    expect(response.body.data).toHaveProperty('token');
    expect(typeof response.body.data.paymentUrl).toBe('string');
    expect(response.body.data.paymentUrl).toMatch(/https?:\/\//);
  }, 10000);

  // Test 2: Negative amount rejected
  test('POST /api/external/payment/create rejects negative amount', async () => {
    const response = await request(BASE_URL)
      .post('/api/external/payment/create')
      .send({
        ...validPaymentData,
        amount: -100000
      })
      .expect(400);

    expect(response.body.success).toBe(false);
  });

  // Test 3: Missing customer details rejected
  test('POST /api/external/payment/create requires customer details', async () => {
    const response = await request(BASE_URL)
      .post('/api/external/payment/create')
      .send({
        orderId: `ORDER-${Date.now()}`,
        amount: 100000,
        items: []
      })
      .expect(400);

    expect(response.body.success).toBe(false);
  });

  // Test 4: Empty items array rejected
  test('POST /api/external/payment/create requires items', async () => {
    const response = await request(BASE_URL)
      .post('/api/external/payment/create')
      .send({
        ...validPaymentData,
        items: []
      })
      .expect(400);

    expect(response.body.success).toBe(false);
  });

  // Test 5: Payment notification webhook (mock)
  test('POST /api/external/payment/notification handles webhook', async () => {
    // Mock Midtrans notification payload
    const notificationPayload = {
      order_id: `ORDER-TEST-${Date.now()}`,
      status_code: '200',
      transaction_status: 'settlement',
      gross_amount: '250000.00'
    };

    const response = await request(BASE_URL)
      .post('/api/external/payment/notification')
      .send(notificationPayload)
      .expect(200);

    expect(response.body).toHaveProperty('success', true);
  });

});
