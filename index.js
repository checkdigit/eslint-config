/*
 * Copyright (c) 2021 Check Digit, LLC
 *
 * This code is licensed under the MIT license (see LICENSE.txt for details).
 */

/**
 * This needs to be a Javascript file for a .eslintrc file like this to work:
 * {
 *    "extends": ["@checkdigit"]
 * }
 */

/* eslint-disable no-magic-numbers */
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@checkdigit', '@typescript-eslint', 'sonarjs', 'import', 'no-only-tests', 'no-secrets', 'deprecate'],
  parserOptions: {
    project: './tsconfig.json',
  },
  extends: [
    'eslint:all',
    'plugin:@checkdigit/all',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:sonarjs/recommended',
    'prettier',
    'plugin:eslint-comments/recommended',
  ],
  rules: {
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
      },
    ],
    'deprecate/function': 'error',
    'deprecate/member-expression': 'error',
    'deprecate/import': 'error',
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': ['error'],
    'func-names': 'off',
    'no-secrets/no-secrets': [
      'error',
      {
        tolerance: 4.2,
      },
    ],

    // Per require-await docs:
    // If you are throwing an error inside of an asynchronous function for this purpose, then you may want to disable this rule.
    'require-await': 'off',
    '@typescript-eslint/require-await': 'off',

    // sonarjs doesn't implement the no-big-function rule probably because this rule already exists within stock eslint
    // set to 200 because that is sonar's default
    'max-lines-per-function': ['error', 200],

    // enforce use of curly braces around if statements and discourage one-line ifs
    curly: 'error',

    // always use ===
    eqeqeq: 'error',

    // undefined can be used
    'no-undefined': 'off',

    // tslint does this and it feels like a good idea
    'guard-for-in': 'error',

    // we probably shouldn't be using eval
    'no-eval': 'error',
    'no-implied-eval': 'error',

    // disallow this keywords outside of classes or class-like objects. carl's gonna like this one
    'no-invalid-this': 'error',

    // sync methods are slow and we shouldn't be using them in production code
    'no-sync': 'error',

    // modules we don"t like
    'no-restricted-modules': ['error', 'url'],

    // prefer else-if
    'no-lonely-if': 'error',

    // make eslint feel just like the tslint days
    'no-unneeded-ternary': 'error',
    'one-var': ['error', 'never'],

    // these two configurations need to be kept in sync
    'sort-imports': [
      'error',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
      },
    ],
    'import/order': [
      'error',
      {
        'newlines-between': 'ignore',
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/*.spec.ts', '**/*.test.ts'],
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],
    'import/no-deprecated': 'error',
    'space-before-blocks': 'error',
    'space-unary-ops': 'error',
    'spaced-comment': 'error',
    'no-var': 'error',
    'prefer-const': 'error',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'require-yield': 'error',
    'no-console': 'error',
    'no-return-await': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/ban-ts-comment': 'error',
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-require-imports': 'error',

    // sometimes fails on valid interface names like ISO8583
    '@typescript-eslint/interface-name-prefix': 'off',

    // typeof any === "evil".
    '@typescript-eslint/no-explicit-any': 'error',

    // We're smarter than the default (15). Right?
    'sonarjs/cognitive-complexity': ['error', 24],
    'no-only-tests/no-only-tests': 'error',

    // eslint:all rules to modify
    'sort-keys': 'off',
    'capitalized-comments': 'off',
    'func-style': [
      'error',
      'declaration',
      {
        allowArrowFunctions: true,
      },
    ],
    'no-negated-condition': 'off',
    'multiline-comment-style': 'off',
    'no-magic-numbers': [
      'error',
      {
        ignore: [-1, 0, 1, 2, 4, 8, 10, 16, 32, 60, 64, 128, 256, 512, 1000, 1024],
      },
    ],
    'no-ternary': 'off',
    'max-params': ['error', 8],
    'max-statements': 'off',
    'consistent-return': 'off',
    'no-undef': 'off',
    'init-declarations': 'off',
    'no-inline-comments': 'off',
    'line-comment-position': 'off',
    'prefer-destructuring': 'off',
    'no-useless-return': 'off',
    complexity: 'off',
    'max-lines': [
      'error',
      {
        max: 500,
        skipBlankLines: true,
        skipComments: true,
      },
    ],
    'id-length': [
      'error',
      {
        properties: 'never',
        exceptions: ['_'],
      },
    ],
    // as long as we don't rely on ASI this can remain off
    'no-plusplus': 'off',
    'default-case': 'off',
    'no-continue': 'off',
    'callback-return': ['error', ['callback', 'cb']],
    'new-cap': [
      'error',
      {
        capIsNew: false,
      },
    ],
    'dot-notation': 'off',
  },
  overrides: [
    {
      files: ['*.spec.ts', '*.test.ts'],
      rules: {
        'no-magic-numbers': 'off',
        'no-undefined': 'off',
        'max-lines-per-function': 'off',
        'sonarjs/no-duplicate-string': 'off',
        'sonarjs/no-identical-functions': 'off',
        'sonarjs/cognitive-complexity': 'off',
        'max-lines': 'off',
        'no-await-in-loop': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off',
      },
    },
    {
      // in Check Digit code bases, swagger.ts files are large, generated files
      files: ['swagger.ts'],
      rules: {
        'max-lines': 'off',
      },
    },
  ],
};
/* eslint-enable no-magic-numbers */
