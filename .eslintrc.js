module.exports = {
  env: {
    es6: true,
    node: true,
    browser: false,
  },
  extends: ['eslint:recommended', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'warn',
  },

  overrides: [
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
      plugins: ['prettier'],
      rules: {
        'prettier/prettier': 'warn',
      },
    },
  ],
};
