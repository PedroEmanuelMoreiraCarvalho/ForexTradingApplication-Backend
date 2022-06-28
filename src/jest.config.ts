export default {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  preset: "ts-jest",
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  transformIgnorePatterns: ['../node_modules/'],
};
