module.exports = {
  // Run Prettier on JavaScript, TypeScript, and other relevant files
  "*.{js,jsx,ts,tsx,json,css,scss,md}": [
    "prettier --write", // Auto-fix Prettier issues
    "eslint", // Check for ESLint errors
  ],
};
