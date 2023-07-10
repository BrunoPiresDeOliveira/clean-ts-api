/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
  collectCoverage: false,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  roots: [
    '<rootDir>/src'
  ],
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  coveragePathIgnorePatterns: [
    '<rootDir>/src/data/protocols',
    '<rootDir>/src/presentation/protocols',
    '<rootDir>/src/domain',
    '<rootDir>/src/data/usecases/add-account/db-add-account-protocols.ts',
    '<rootDir>/src/presentation/controllers/signup/signup-protocols.ts'
  ]
}

module.exports = config
