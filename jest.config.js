module.exports = {
  modulePaths: ['<rootDir>/'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'babel-jest',
    '\\.svg$': '<rootDir>/internal/jest/__mocks__/svgTransformer.js',
  },
  setupFiles: ['<rootDir>/internal/jest/jest.setup.js'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
};
