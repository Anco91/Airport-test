module.exports = {
    // Spécifie les fichiers à tester.
    testMatch: ['**/*.test.mjs'],
  
    // Spécifie les dossiers à exclure des tests.
    testPathIgnorePatterns: ['/node_modules/'],
  
    // Spécifie l'environnement de test (par défaut, c'est "node").
    testEnvironment: 'node',
  
    // Spécifie les extensions de fichiers que Jest doit considérer comme des fichiers de test.
    moduleFileExtensions: ['js', 'mjs'],
  
    // Transformation des modules ECMAScript (ES6) avec Babel (si besoin).
    transform: {
      '^.+\\.mjs$': 'babel-jest',
    },
  };
  