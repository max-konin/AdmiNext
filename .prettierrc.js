module.exports = {
  singleQuote: true,
  trailingComma: 'es5',
  tabWidth: 2,
  printWidth: 80,
  overrides: [
    {
      files: '*.json',
      options: {
        parser: 'json',
      },
    },
  ],
};
