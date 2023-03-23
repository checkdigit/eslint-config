/*
 * Copyright (c) 2021-2023 Check Digit, LLC
 *
 * This code is licensed under the MIT license (see LICENSE.txt for details).
 */

/**
 * This needs to be a Javascript file for a .eslintrc file like this to work:
 * {
 *    "extends": ["@checkdigit"]
 * }
 */

const eslintRulesWithError = {};

// eslint-disable-next-line @typescript-eslint/no-require-imports,@typescript-eslint/no-var-requires,unicorn/prefer-module
const eslintStrictRules = require('@typescript-eslint/eslint-plugin').configs['strict'].rules;
for (const [key, value] of Object.entries(eslintStrictRules)) {
  // eslint-disable-next-line sonarjs/no-duplicate-string
  if (key.startsWith('@typescript-eslint/') && value === 'warn') {
    eslintRulesWithError[key] = 'error';
  }
}

// eslint-disable-next-line @typescript-eslint/no-require-imports,@typescript-eslint/no-var-requires,unicorn/prefer-module
const eslintRecommendedRules = require('@typescript-eslint/eslint-plugin').configs['recommended'].rules;
for (const [key, value] of Object.entries(eslintRecommendedRules)) {
  if (key.startsWith('@typescript-eslint/') && value === 'warn') {
    eslintRulesWithError[key] = 'error';
  }
}

// eslint-disable-next-line @typescript-eslint/no-require-imports,@typescript-eslint/no-var-requires,unicorn/prefer-module
const eslintRecommendedRequiringTypeCheckingRules = require('@typescript-eslint/eslint-plugin').configs[
  'recommended-requiring-type-checking'
].rules;
for (const [key, value] of Object.entries(eslintRecommendedRequiringTypeCheckingRules)) {
  if (key.startsWith('@typescript-eslint/') && value === 'warn') {
    eslintRulesWithError[key] = 'error';
  }
}

// eslint-disable-next-line unicorn/prefer-module
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
    'plugin:@typescript-eslint/strict',
    'plugin:sonarjs/recommended',
    'prettier',
    'plugin:eslint-comments/recommended',
    'plugin:unicorn/recommended',
  ],
  rules: {
    ...eslintRulesWithError,
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_',
      },
    ],
    'no-underscore-dangle': 'off',
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
    // If you are throwing an error inside an asynchronous function for this purpose, then you may want to disable this rule.
    'require-await': 'off',
    '@typescript-eslint/require-await': 'off',

    // sonarjs doesn't implement the no-big-function rule probably because this rule already exists within stock eslint
    // set to 200 because that is sonar's default
    // eslint-disable-next-line no-magic-numbers
    'max-lines-per-function': ['error', 200],

    // enforce use of curly braces around if statements and discourage one-line ifs
    curly: 'error',

    // always use ===
    eqeqeq: 'error',

    // undefined can be used
    'no-undefined': 'off',

    // tslint does this and it feels like a good idea
    'guard-for-in': 'error',

    // we should never use eval
    'no-eval': 'error',
    'no-implied-eval': 'error',

    // disallow "this" outside of classes or class-like objects
    'no-invalid-this': 'error',

    // sync methods are slow and block the main event loop
    'no-sync': 'error',

    // modules we don't like
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
    '@typescript-eslint/explicit-module-boundary-types': 'error',
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
        ignore: [
          -1,
          0,
          1,
          2,
          4,
          7,
          8,
          10,
          12,
          16,
          24,
          30,
          31,
          32,
          60,
          64,
          128,
          256,
          512,
          1000,
          1024,
          2048,
          4096,
          8192,
          16_384,
          32_768,
          65_536,
          '-1n',
          '0n',
          '1n',
          '2n',
          '4n',
          '7n',
          '8n',
          '10n',
          '12n',
          '16n',
          '24n',
          '30n',
          '31n',
          '32n',
          '60n',
          '64n',
          '128n',
          '256n',
          '512n',
          '1000n',
          '1024n',
          '2048n',
          '4096n',
          '8192n',
          '16384n',
          '32768n',
          '65536n',
        ],
      },
    ],
    'no-ternary': 'off',
    'max-params': ['error', 8],
    'max-statements': 'off',
    'max-statements-per-line': 'off',
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
    'eslint-comments/no-unused-disable': 2,

    // this doesn't make sense in Typescript code, we can rely on type checking to catch it
    'unicorn/no-array-callback-reference': 'off',

    // regardless of merits, these rules contradict prettier so cannot be
    'unicorn/no-nested-ternary': 'off',
    'unicorn/number-literal-case': 'off',

    // require 4 separate conditions before an error
    'unicorn/prefer-switch': ['error', { minimumCases: 4, emptyDefaultCase: 'do-nothing-comment' }],

    // this seems excessive
    'unicorn/no-unreadable-array-destructuring': 'off',

    // duplicate of eslint-comments/no-unlimited-disable
    'unicorn/no-abusive-eslint-disable': 'off',

    // because of Typescript, we don't use null in our code unless we have to, which makes this annoying
    'unicorn/no-null': 'off',

    // there are a lot of cases where this doesn't help readability
    'unicorn/prefer-ternary': 'off',

    // a lot of our "useless" switch/cases are based on external specifications and are important documentation
    'unicorn/no-useless-switch-case': 'off',
  },
  overrides: [
    {
      files: ['*.spec.ts', '*.test.ts'],
      rules: {
        '@checkdigit/no-uuid': 'off',
        'no-magic-numbers': 'off',
        'no-undefined': 'off',
        'max-lines-per-function': 'off',
        'sonarjs/no-duplicate-string': 'off',
        'sonarjs/no-identical-functions': 'off',
        'sonarjs/cognitive-complexity': 'off',
        'max-lines': 'off',
        'no-await-in-loop': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'unicorn/no-useless-undefined': 'off',
        'unicorn/no-await-expression-member': 'off',
        'unicorn/consistent-function-scoping': 'off',
        'unicorn/no-array-reduce': 'off',
        'unicorn/error-message': 'off',
        'unicorn/prevent-abbreviations': 'off',
        'unicorn/no-array-for-each': 'off',
        'require-yield': 'off',
      },
    },
    {
      files: ['*.spec.ts'],
      plugins: ['jest'],
      extends: ['plugin:jest/recommended'],
      rules: {
        'jest/expect-expect': 'off',
        'jest/max-nested-describe': ['error', { max: 1 }],
        'jest/no-duplicate-hooks': ['error'],
        'jest/prefer-hooks-in-order': ['error'],
        'jest/prefer-hooks-on-top': ['error'],
        'jest/no-disabled-tests': ['error'],
        'jest/no-commented-out-tests': ['error'],
        'jest/require-top-level-describe': [
          'error',
          {
            maxNumberOfTopLevelDescribes: 1,
          },
        ],
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
