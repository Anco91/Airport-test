module.exports = {
    testMatch: ['**/*.test.mjs'],
  
    testPathIgnorePatterns: ['/node_modules/'],
  
    testEnvironment: 'node',
  
    moduleFileExtensions: ['js', 'mjs'],
  
    transform: {
      '^.+\\.mjs$': 'babel-jest',
    },
  };
  