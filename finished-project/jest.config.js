/**
 * Jest Configuration
 * Unit & Integration testing untuk Health E-Commerce
 * 
 * Docs: https://jestjs.io/docs/configuration
 */

module.exports = {
  // Test environment
  testEnvironment: 'node',
  
  // Coverage directory
  coverageDirectory: 'coverage',
  
  // Files to collect coverage from
  collectCoverageFrom: [
    'tests/**/*.js',
    '!tests/**/*.spec.js',
    '!tests/e2e/**/*.js', // Exclude Playwright tests
    '!**/node_modules/**'
  ],
  
  // Coverage thresholds
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 85,
      statements: 85
    }
  },
  
  // Test match patterns
  testMatch: [
    '**/tests/**/*.test.js',
    '!**/tests/e2e/**'
  ],
  
  // Setup files
  // setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  
  // Module paths
  modulePaths: ['<rootDir>'],
  
  // Verbose output
  verbose: true,
  
  // Test timeout
  testTimeout: 20000,
  
  // Clear mocks between tests
  clearMocks: true,
  
  // Restore mocks between tests
  restoreMocks: true,
};

