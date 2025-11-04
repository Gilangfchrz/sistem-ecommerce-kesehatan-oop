/**
 * Unit Tests - Currency Utilities
 * Testing helper functions untuk format currency
 * 
 * Run: npm run test:unit
 */

// Helper functions yang akan ditest
const formatCurrency = (amount) => {
  if (typeof amount !== 'number') {
    throw new Error('Amount must be a number');
  }
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount);
};

const calculateTax = (price, taxRate = 0.1) => {
  if (price < 0) {
    throw new Error('Price cannot be negative');
  }
  return price * taxRate;
};

const calculateTotal = (price, quantity, taxRate = 0.1) => {
  const subtotal = price * quantity;
  const tax = calculateTax(subtotal, taxRate);
  return subtotal + tax;
};

// ==========================================
// UNIT TESTS
// ==========================================

describe('Currency Utils - Unit Tests', () => {
  
  describe('formatCurrency', () => {
    
    test('formats Indonesian Rupiah correctly', () => {
      const result = formatCurrency(85000);
      expect(result).toBe('Rp85.000');
    });

    test('handles large numbers', () => {
      const result = formatCurrency(1000000);
      expect(result).toBe('Rp1.000.000');
    });

    test('handles zero', () => {
      const result = formatCurrency(0);
      expect(result).toBe('Rp0');
    });

    test('throws error for non-number input', () => {
      expect(() => formatCurrency('abc')).toThrow('Amount must be a number');
    });
  });

  describe('calculateTax', () => {
    
    test('calculates 10% tax by default', () => {
      const tax = calculateTax(100000);
      expect(tax).toBe(10000);
    });

    test('calculates custom tax rate', () => {
      const tax = calculateTax(100000, 0.15); // 15%
      expect(tax).toBe(15000);
    });

    test('throws error for negative price', () => {
      expect(() => calculateTax(-100)).toThrow('Price cannot be negative');
    });
  });

  describe('calculateTotal', () => {
    
    test('calculates total with tax', () => {
      // Price: 100000, Quantity: 2, Tax: 10%
      // Subtotal: 200000, Tax: 20000, Total: 220000
      const total = calculateTotal(100000, 2, 0.1);
      expect(total).toBe(220000);
    });

    test('handles large quantities', () => {
      const total = calculateTotal(50000, 10, 0.1);
      expect(total).toBe(550000); // 500000 + 50000
    });
  });
});

