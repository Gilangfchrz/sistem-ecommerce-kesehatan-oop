/**
 * Integration Tests - Products API
 * Testing Health E-Commerce Products endpoints
 * Backend: http://localhost:5000
 */

const request = require("supertest");
const BASE_URL = process.env.BACKEND_URL || "http://localhost:5000";

describe("Health E-Commerce - Products API", () => {
  describe("GET /api/products", () => {
    test("should return all products dengan structure yang benar", async () => {
      const response = await request(BASE_URL).get("/api/products").expect(200);

      expect(response.body).toHaveProperty("success", true);
      expect(response.body).toHaveProperty("data");
      expect(Array.isArray(response.body.data)).toBe(true);

      // Verify product structure
      if (response.body.data.length > 0) {
        const product = response.body.data[0];
        expect(product).toHaveProperty("_id");
        expect(product).toHaveProperty("name");
        expect(product).toHaveProperty("price");
        expect(product).toHaveProperty("category");
        expect(product).toHaveProperty("stock");
      }
    });

    test("should filter products by category=Vitamin", async () => {
      const response = await request(BASE_URL)
        .get("/api/products?category=Vitamin")
        .expect(200);

      expect(response.body.success).toBe(true);

      // All products should be Vitamin category
      response.body.data.forEach((product) => {
        expect(product.category).toBe("Vitamin");
      });
    });

    test("should search products by keyword", async () => {
      const response = await request(BASE_URL)
        .get("/api/products?search=vitamin")
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);

      // Results should contain search keyword (case insensitive)
      response.body.data.forEach((product) => {
        const searchText =
          `${product.name} ${product.description}`.toLowerCase();
        expect(searchText).toContain("vitamin");
      });
    });

    test("should filter by price range", async () => {
      const response = await request(BASE_URL)
        .get("/api/products?minPrice=50000&maxPrice=150000")
        .expect(200);

      expect(response.body.success).toBe(true);

      // All products should be within price range
      response.body.data.forEach((product) => {
        expect(product.price).toBeGreaterThanOrEqual(50000);
        expect(product.price).toBeLessThanOrEqual(150000);
      });
    });
  });

  describe("GET /api/products/:id", () => {
    test("should return single product by valid ID", async () => {
      // First get all products to get valid ID
      const allProducts = await request(BASE_URL).get("/api/products");
      const productId = allProducts.body.data[0]._id;

      // Then get single product
      const response = await request(BASE_URL)
        .get(`/api/products/${productId}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data._id).toBe(productId);
      expect(response.body.data).toHaveProperty("manufacturer");
      expect(response.body.data).toHaveProperty("description");
    });

    test("should return 404 for non-existent product ID", async () => {
      const fakeId = "507f1f77bcf86cd799439011"; // Valid ObjectId format tapi tidak ada

      const response = await request(BASE_URL)
        .get(`/api/products/${fakeId}`)
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toMatch(/tidak ditemukan|not found/i);
    });

    test("should return 400 for invalid ID format", async () => {
      const response = await request(BASE_URL)
        .get("/api/products/invalid-id-format")
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe("GET /health", () => {
    test("should return health check status", async () => {
      const response = await request(BASE_URL).get("/health").expect(200);

      expect(response.body).toHaveProperty("success", true);
      expect(response.body).toHaveProperty("message");
      expect(response.body).toHaveProperty("timestamp");
    });
  });
});
