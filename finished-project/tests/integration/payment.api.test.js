/**
 * Integration Tests - Payment API
 * Testing Midtrans payment integration di Health E-Commerce
 * Backend: http://localhost:5000/api/external/payment
 */

const request = require('supertest');
const BASE_URL = process.env.BACKEND_URL || 'http://localhost:5000';

describe('Health E-Commerce - Payment API (Midtrans)', () => {
  
  describe('POST /api/external/payment/create', () => {
    test('should create payment dengan data yang valid', async () => {
      const paymentData = {
        orderId: `TEST-ORDER-${Date.now()}`,
        amount: 150000,
        items: [
          {
            id: '1',
            name: 'Vitamin C 1000mg',
            price: 85000,
            quantity: 1
          },
          {
            id: '2',
            name: 'Vitamin D3 2000 IU',
            price: 65000,
            quantity: 1
          }
        ],
        customerDetails: {
          name: 'Aiman Test',
          email: 'aiman.test@example.com',
          phone: '08123456789',
          address: 'Jl. Sehat No. 123, Jakarta'
        }
      };

      const response = await request(BASE_URL)
        .post('/api/external/payment/create')
        .send(paymentData)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('paymentUrl');
      expect(response.body).toHaveProperty('orderId', paymentData.orderId);
      expect(response.body.paymentUrl).toMatch(/midtrans|snap/i);
    }, 15000); // Extended timeout untuk Midtrans API

    test('should reject payment dengan amount negatif', async () => {
      const response = await request(BASE_URL)
        .post('/api/external/payment/create')
        .send({
          orderId: 'INVALID-ORDER',
          amount: -100000, // Negative amount
          items: [],
          customerDetails: {
            name: 'Test',
            email: 'test@example.com',
            phone: '08123456789'
          }
        })
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    test('should validate customer details', async () => {
      const response = await request(BASE_URL)
        .post('/api/external/payment/create')
        .send({
          orderId: 'TEST-ORDER',
          amount: 100000,
          items: [],
          customerDetails: {
            // Missing name, email, phone
          }
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toMatch(/required|wajib/i);
    });

    test('should validate items array', async () => {
      const response = await request(BASE_URL)
        .post('/api/external/payment/create')
        .send({
          orderId: 'TEST-ORDER',
          amount: 100000,
          items: [], // Empty items
          customerDetails: {
            name: 'Test',
            email: 'test@example.com',
            phone: '08123456789'
          }
        })
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe('POST /api/external/payment/notification', () => {
    test('should handle payment webhook notification', async () => {
      const notification = {
        order_id: 'TEST-ORDER-123',
        transaction_status: 'settlement',
        gross_amount: '100000',
        signature_key: 'test_signature'
      };

      const response = await request(BASE_URL)
        .post('/api/external/payment/notification')
        .send(notification)
        .expect(200);

      expect(response.body).toHaveProperty('success');
    });
  });
});

