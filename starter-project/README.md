# 🧪 Health E-Commerce Testing - Starter Project

> **Learn testing with basic setup & TODOs**

**Practice writing tests untuk Health E-Commerce system!** ✅

---

## 🎯 Learning Objectives

Learn to write:
- ✅ Unit tests dengan Jest
- ✅ Integration tests dengan Supertest
- ✅ E2E tests dengan Playwright

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Install Playwright
npx playwright install chromium

# 3. Ensure backend running
# cd ../../Backend/Modul_5.../finished-project
# npm run dev

# 4. Run tests
npm test
```

---

## ⚠️ TODOs

**Your Tasks:**

- [ ] Complete unit test examples
- [ ] Write integration tests untuk products API
- [ ] Write integration tests untuk auth API
- [ ] Create Playwright E2E test
- [ ] Achieve 80%+ coverage

---

## 💡 Hints

**Unit Test Pattern:**
```javascript
describe('Function Name', () => {
  test('should do something', () => {
    // Arrange
    const input = 'test';
    
    // Act
    const result = functionToTest(input);
    
    // Assert
    expect(result).toBe('expected');
  });
});
```

**Integration Test Pattern:**
```javascript
const request = require('supertest');
const BASE_URL = 'http://localhost:5000';

test('GET /api/products', async () => {
  const res = await request(BASE_URL)
    .get('/api/products')
    .expect(200);
    
  expect(res.body.success).toBe(true);
});
```

---

**Start testing! 🧪**

_Starter Project - Practice Testing_

