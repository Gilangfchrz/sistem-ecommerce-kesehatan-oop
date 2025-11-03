/**
 * Integration Tests - AI Chatbot
 * Testing Google Gemini AI integration di Health E-Commerce
 * Backend: http://localhost:5000/api/external/ai
 */

const request = require("supertest");
const BASE_URL = process.env.BACKEND_URL || "http://localhost:5000";

describe("Health E-Commerce - AI Chatbot (Google Gemini)", () => {
  describe("POST /api/external/ai/chat", () => {
    test("should get AI response untuk product recommendation", async () => {
      const response = await request(BASE_URL)
        .post("/api/external/ai/chat")
        .send({
          message: "Saya butuh vitamin untuk meningkatkan daya tahan tubuh",
          context: "health_product_recommendation",
        })
        .expect(200);

      expect(response.body).toHaveProperty("success", true);
      expect(response.body).toHaveProperty("message");
      expect(typeof response.body.message).toBe("string");
      expect(response.body.message.length).toBeGreaterThan(10);
    }, 20000); // Extended timeout untuk AI API call

    test("should reject empty message", async () => {
      const response = await request(BASE_URL)
        .post("/api/external/ai/chat")
        .send({
          message: "",
          context: "health_product_recommendation",
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toMatch(/message.*required|wajib/i);
    });

    test("should handle AI API errors gracefully", async () => {
      // Send malformed request
      const response = await request(BASE_URL)
        .post("/api/external/ai/chat")
        .send({
          // Missing required fields
        })
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    test("AI response should be relevant untuk health products", async () => {
      const response = await request(BASE_URL)
        .post("/api/external/ai/chat")
        .send({
          message: "Rekomendasi supplement untuk kesehatan jantung",
          context: "health_product_recommendation",
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBeTruthy();

      // AI response should mention health/supplement/product related terms
      const aiMessage = response.body.message.toLowerCase();
      const healthTerms = [
        "vitamin",
        "supplement",
        "kesehatan",
        "produk",
        "omega",
        "jantung",
      ];
      const hasHealthTerm = healthTerms.some((term) =>
        aiMessage.includes(term)
      );

      expect(hasHealthTerm).toBe(true);
    }, 20000);
  });
});
