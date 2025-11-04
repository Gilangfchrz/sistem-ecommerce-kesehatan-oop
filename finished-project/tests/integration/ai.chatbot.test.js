/**
 * Integration Tests - AI Chatbot (Google Gemini)
 * Testing backend endpoint: POST /api/external/ai/chat
 * 
 * Prerequisites:
 * - Backend must be running on http://localhost:5000
 * - GEMINI_API_KEY must be configured in backend
 * 
 * Run: npm run test:integration
 */

const request = require('supertest');

const BASE_URL = process.env.BACKEND_URL || 'http://localhost:5000';

describe('AI Chatbot API - Integration Tests', () => {
  
  // Test 1: AI chatbot responds to product recommendation request
  test('POST /api/external/ai/chat returns product recommendations', async () => {
    const response = await request(BASE_URL)
      .post('/api/external/ai/chat')
      .send({
        message: 'Rekomendasi vitamin untuk daya tahan tubuh',
        context: 'health_product_recommendation'
      })
      .expect(200);

    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveProperty('response');
    expect(typeof response.body.data.response).toBe('string');
    expect(response.body.data.response.length).toBeGreaterThan(0);
  }, 15000); // AI requests can take longer

  // Test 2: Empty message rejected
  test('POST /api/external/ai/chat rejects empty message', async () => {
    const response = await request(BASE_URL)
      .post('/api/external/ai/chat')
      .send({
        message: '',
        context: 'health_product_recommendation'
      })
      .expect(400);

    expect(response.body.success).toBe(false);
    expect(response.body.message).toMatch(/message|required/i);
  });

  // Test 3: AI handles health-related queries
  test('POST /api/external/ai/chat responds to health queries', async () => {
    const response = await request(BASE_URL)
      .post('/api/external/ai/chat')
      .send({
        message: 'Apa manfaat vitamin C?',
        context: 'health_product_recommendation'
      })
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data.response).toMatch(/vitamin|kesehatan|manfaat/i);
  }, 15000);

  // Test 4: AI response is relevant to health products
  test('POST /api/external/ai/chat provides relevant product suggestions', async () => {
    const response = await request(BASE_URL)
      .post('/api/external/ai/chat')
      .send({
        message: 'Suplemen untuk menjaga kesehatan jantung',
        context: 'health_product_recommendation'
      })
      .expect(200);

    expect(response.body.success).toBe(true);
    
    const aiResponse = response.body.data.response.toLowerCase();
    // Should mention relevant products or health terms
    const hasRelevantContent = 
      aiResponse.includes('omega') ||
      aiResponse.includes('jantung') ||
      aiResponse.includes('suplemen') ||
      aiResponse.includes('kesehatan');
    
    expect(hasRelevantContent).toBe(true);
  }, 15000);

});
