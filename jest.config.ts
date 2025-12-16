export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  modulePaths: ['<rootDir>'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '\\.(scss)$': 'identity-obj-proxy',
    '\\.(png)$': '<rootDir>/src/tests/utils/image-mock.ts',
    '^@components(.*)$': '<rootDir>/src/components$1',
    '^@elements(.*)$': '<rootDir>/src/elements$1',
    '^@assets(.*)$': '<rootDir>/src/assets$1',
    '^@routes(.*)$': '<rootDir>/src/routes$1',
    '^@utils(.*)$': '<rootDir>/src/utils$1',
    '^@api(.*)$': '<rootDir>/src/api$1',
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.app.json',
      },
    ],
  },
};
