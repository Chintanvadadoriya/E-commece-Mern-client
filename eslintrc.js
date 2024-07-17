module.exports = {
    env: {
      browser: true, // Enables browser global variables
      es2021: true, // Enables ES2021 syntax and features
    },
    extends: [
      'react-app', // Extends default Create React App ESLint rules
      'airbnb', // Extends Airbnb's JavaScript style guide
      'plugin:react/recommended', // Extends recommended React rules
      'plugin:jsx-a11y/recommended', // Extends recommended accessibility rules for JSX
      'plugin:prettier/recommended', // Integrates Prettier with ESLint
    ],
    plugins: [
      'react', // Adds React-specific linting rules
      'jsx-a11y', // Adds accessibility linting rules for JSX
      'import', // Adds import/export linting rules
      'prettier', // Adds Prettier for code formatting
    ],
    rules: {
      'prettier/prettier': 'error', // Treats Prettier formatting issues as errors
      'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }], // Allows JSX in .js and .jsx files
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }], // Ensures proper dependency management
    },
  };
  