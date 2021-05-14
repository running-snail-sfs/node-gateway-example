module.exports = {
  printWidth: 100,
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  arrowParens: 'always',
  endOfLine: 'auto',
  overrides: [
    {
      files: ['*.css', '*.less'],
      options: {
        singleQuote: false,
      },
    },
  ],
};
