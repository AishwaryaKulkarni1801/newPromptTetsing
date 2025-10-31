const { pathsToModuleNameMapper } = require('ts-jest');

module.exports = {
  preset: 'jest-preset-angular',
  
  // Use jsdom environment for Angular component testing
  testEnvironment: 'jsdom',
  
  // Setup files to run before tests
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  
  // Module name mapping for Angular imports and paths
  moduleNameMapper: {
    '@src/(.*)': '<rootDir>/src/$1',
    '@app/(.*)': '<rootDir>/src/app/$1',
    '@assets/(.*)': '<rootDir>/src/assets/$1',
    // Handle CSS and SCSS imports
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    // Handle image and other asset imports
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': 'jest-transform-stub',
  },
  
  // File extensions to consider for tests
  moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
  
  // Transform files with ts-jest and jest-preset-angular
  transform: {
    '^.+\\.(ts|js|mjs|html|svg)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.html$',
      },
    ],
  },
  
  // Files to ignore during transformation
  transformIgnorePatterns: [
    'node_modules/(?!(.*\\.mjs$|@angular|@ngrx|ngx-.*|@ngx-.*))',
  ],
  
  // Test file patterns
  testMatch: [
    '<rootDir>/src/**/*.spec.ts'
  ],
  
  // Coverage configuration
  collectCoverage: false, // Set to true to collect coverage by default
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/main.ts',
    '!src/polyfills.ts',
    '!src/**/*.module.ts',
    '!src/**/environment*.ts',
    '!src/**/*.stories.ts',
  ],
  
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'text-summary', 'lcov'],
  
  // Thresholds for coverage (optional)
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  
  // Clear mocks between tests
  clearMocks: true,
  
  // Restore mocks after each test
  restoreMocks: true,
  
  // Verbose output (set to true for more detailed test output)
  verbose: false,
  
  // Error handling
  errorOnDeprecated: true,
  
  // Cache directory
  cacheDirectory: '<rootDir>/node_modules/.cache/jest',
};