module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'sonarjs', 'import', 'no-only-tests'],
  parserOptions: {
    project: './tsconfig.json'
  },
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:sonarjs/recommended',
    'prettier',
    'prettier/@typescript-eslint'
  ],
  rules: {
    // 0 - off
    // 1 - warn
    // 2 - error

    // Per require-await docs:
    // If you are throwing an error inside of an asynchronous function for this purpose, then you may want to disable this rule.
    'require-await': 0,
    '@typescript-eslint/require-await': 0,

    // sonarjs doesn't implement the no-big-function rule probably because this rule already exists within stock eslint
    // set to 200 because that is sonar's default
    'max-lines-per-function': ['error', 200],

    // enforce use of curly braces around if statements and discourage one-line ifs
    'curly': 2,

    // always use ===
    'eqeqeq': 2,

    // undefined can be overwritten by assigning it to a variable (let undefined = 1)
    'no-undefined': 2,

    // We require single quotes (') because they look better.
    'quotes': ['error', 'single'],

    // tslint does this and it feels like a good idea
    'guard-for-in': 2,

    // we probably shouldn't be using eval
    'no-eval': 2,
    'no-implied-eval': 2,

    // disallow this keywords outside of classes or class-like objects. carl's gonna like this one
    'no-invalid-this': 2,

    // sync methods are slow and we shouldn't be using them in production code
    'no-sync': 2,

    // modules we don't like
    'no-restricted-modules': [2, 'url'],

    // prefer else-if
    'no-lonely-if': 2,

    // make eslint feel just like the tslint days
    'no-unneeded-ternary': 2,
    'one-var': [2, 'never'],

    // these two rules working together ain't nobody stopping
    'sort-imports': ['error', {
      'ignoreDeclarationSort': true,
    }],
    'import/order': ['error', {
      'newlines-between': 'ignore'
    }],

    'import/no-deprecated': 2,

    'space-before-blocks': 2,
    'space-unary-ops': 2,
    'spaced-comment': 2,
    'no-var': 2,
    'prefer-const': 2,
    'prefer-rest-params': 1,
    'prefer-spread': 1,
    'require-yield': 2,
    'no-console': 2,
    'no-return-await': 2,

    // having to manually type out the return type of all functions can get noisy
    // typescript does a good job at inferring types and detecting downstream errors
    '@typescript-eslint/explicit-function-return-type': 0,

    '@typescript-eslint/ban-ts-ignore': 2,
    '@typescript-eslint/no-floating-promises': 2,
    '@typescript-eslint/no-require-imports': 2,

    // sometimes fails on valid interface names like ISO8583
    '@typescript-eslint/interface-name-prefix': 0,

    // typeof any === 'evil'.
    '@typescript-eslint/no-explicit-any': 2,



    // We're smarter than the default (15). Right?
    'sonarjs/cognitive-complexity': ['error', 24],

    'no-only-tests/no-only-tests': 2
  },
  overrides: [
    {
      files: ['*.spec.ts'],
      rules: {
        'no-undefined': 0,
        'max-lines-per-function': 0,

        'sonarjs/no-duplicate-string': 0,
        'sonarjs/no-identical-functions': 0,
      }
    }
  ]
};
