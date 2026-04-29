/**
 * Jest Configuration (STARTER)
 * Configuration untuk unit & integration testing
 */

module.exports = {
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  testMatch: [
    '**/tests/**/*.test.js',
    '!**/tests/e2e/**'
  ],
  verbose: true,
  testTimeout: 20000,
  clearMocks: true,
  restoreMocks: true,
};

