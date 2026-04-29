/**
 * Unit Tests - Currency Utilities (STARTER)
 * TODO: Complete the test cases below
 *
 * Learning objectives:
 * - Understand AAA pattern (Arrange, Act, Assert)
 * - Write unit tests untuk utility functions
 * - Use Jest matchers (toBe, toThrow, etc.)
 */

// Helper functions yang akan ditest
const formatCurrency = (amount) => {
  if (typeof amount !== "number") {
    throw new Error("Amount must be a number");
  }
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

const calculateTax = (price, taxRate = 0.1) => {
  if (price < 0) {
    throw new Error("Price cannot be negative");
  }
  return price * taxRate;
};

const calculateTotal = (price, quantity, taxRate = 0.1) => {
  const subtotal = price * quantity;
  const tax = calculateTax(subtotal, taxRate);
  return subtotal + tax;
};

// ==========================================
// UNIT TESTS - COMPLETE THE TODOs!
// ==========================================

describe("Currency Utils - Unit Tests", () => {
  describe("formatCurrency", () => {
    //  Example test (already complete)
    test("formats Indonesian Rupiah correctly", () => {
      const result = formatCurrency(85000);
      expect(result).toBe("Rp85.000");
    });

    // TODO 1: Test large numbers
    test("handles large numbers", () => {
      // TODO: Test formatCurrency dengan input 1000000
      // Expected result: 'Rp1.000.000'
      // HINT: const result = formatCurrency(1000000);
      // HINT: expect(result).toBe('Rp1.000.000');
    });

    // TODO 2: Test zero value
    test("handles zero", () => {
      // TODO: Test formatCurrency dengan input 0
      // Expected result: 'Rp0'
    });

    // TODO 3: Test error handling
    test("throws error for non-number input", () => {
      // TODO: Test bahwa formatCurrency melempar error untuk input string
      // HINT: expect(() => formatCurrency('abc')).toThrow('Amount must be a number');
    });
  });

  describe("calculateTax", () => {
    // TODO 4: Test default tax rate (10%)
    test("calculates 10% tax by default", () => {
      // TODO: Test calculateTax(100000) returns 10000
    });

    // TODO 5: Test custom tax rate
    test("calculates custom tax rate", () => {
      // TODO: Test calculateTax(100000, 0.15) returns 15000
    });

    // TODO 6: Test negative price validation
    test("throws error for negative price", () => {
      // TODO: Test bahwa calculateTax melempar error untuk negative price
    });
  });

  describe("calculateTotal", () => {
    // TODO 7: Test total calculation with tax
    test("calculates total with tax", () => {
      // TODO: Test calculateTotal(100000, 2, 0.1)
      // Price: 100000, Quantity: 2, Tax: 10%
      // Subtotal: 200000, Tax: 20000, Total: 220000
    });

    // TODO 8: Test with large quantities
    test("handles large quantities", () => {
      // TODO: Test calculateTotal(50000, 10, 0.1)
      // Expected: 550000 (500000 + 50000 tax)
    });
  });
});

// ==========================================
// HINTS & LEARNING RESOURCES
// ==========================================

/*
JEST MATCHERS CHEAT SHEET:

expect(value).toBe(expected)           - Exact equality
expect(value).toEqual(expected)        - Deep equality
expect(value).toBeGreaterThan(n)       - Greater than
expect(value).toBeLessThan(n)          - Less than
expect(fn).toThrow(error)              - Function throws error
expect(value).toBeTruthy()             - Truthy value
expect(value).toBeFalsy()              - Falsy value
expect(array).toContain(item)          - Array contains item
expect(object).toHaveProperty(key)     - Object has property

RUNNING TESTS:
npm run test:unit                      - Run unit tests
npm run test:watch                     - Watch mode
npm run test:coverage                  - With coverage report

NEXT STEPS:
1. Complete TODOs di atas
2. Run: npm run test:unit
3. All 8 tests should pass!
4. Check finished-project untuk reference
*/
