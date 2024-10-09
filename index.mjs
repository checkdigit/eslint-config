import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import checkdigit from '@checkdigit/eslint-plugin';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import sonarjs from 'eslint-plugin-sonarjs';
import _import from 'eslint-plugin-import';
import noOnlyTests from 'eslint-plugin-no-only-tests';
import noSecrets from 'eslint-plugin-no-secrets';
// eslint-disable-next-line id-length
import n from 'eslint-plugin-n';
import tsParser from '@typescript-eslint/parser';
import jest from 'eslint-plugin-jest';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const compat = new FlatCompat({
  baseDirectory: __dirname,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  recommendedConfig: js.configs.recommended,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ['eslint.config.mjs', 'index.mjs', 'index.js', 'src/javascript.js', 'src/javascript.test.js'],
  },
  sonarjs.configs.recommended,
  ...fixupConfigRules(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    compat.extends(
      'eslint:all',
      'plugin:@checkdigit/all',
      'plugin:@typescript-eslint/strict-type-checked',
      'plugin:@typescript-eslint/stylistic-type-checked',
      'plugin:import/errors',
      'plugin:import/typescript',
      'plugin:n/recommended',
      'plugin:eslint-comments/recommended',
      'plugin:unicorn/recommended',
      'prettier',
    ),
  ),
  {
    plugins: {
      '@checkdigit': fixupPluginRules(checkdigit),
      '@typescript-eslint': fixupPluginRules(typescriptEslint),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      import: fixupPluginRules(_import),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      'no-only-tests': noOnlyTests,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      'no-secrets': noSecrets,
      n: fixupPluginRules(n),
    },

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },

    settings: {
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },

    rules: {
      'no-shadow': 'off',
      '@typescript-eslint/strict-boolean-expressions': 'error',
      '@typescript-eslint/no-shadow': 'error',

      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
        },
      ],

      'no-underscore-dangle': 'off',
      'no-useless-constructor': 'off',
      '@typescript-eslint/no-useless-constructor': ['error'],
      'func-names': 'off',

      'no-secrets/no-secrets': [
        'error',
        {
          tolerance: 4.2,
        },
      ],

      'require-await': 'off',
      '@typescript-eslint/require-await': 'off',
      // eslint-disable-next-line no-magic-numbers
      'max-lines-per-function': ['error', 200],
      curly: 'error',
      'no-undefined': 'off',

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

      'n/exports-style': 'error',

      'n/no-restricted-import': [
        'error',
        ['moment', 'clone', 'fclone', 'lodash', 'underscore', 'fs-extra', '@checkdigit/typescript'],
      ],

      'n/no-process-env': 'error',
      'n/no-sync': 'error',
      'n/prefer-global/buffer': 'error',
      'n/prefer-global/console': 'error',
      'n/prefer-global/process': 'error',
      'n/prefer-global/text-decoder': 'error',
      'n/prefer-global/text-encoder': 'error',
      'n/prefer-global/url': 'error',
      'n/prefer-global/url-search-params': 'error',
      'n/no-missing-import': 'off',
      'n/no-extraneous-import': 'off',
      'n/no-unpublished-import': 'off',
      'n/no-process-exit': 'off',

      'import/no-extraneous-dependencies': [
        'error',
        {
          // eslint-disable-next-line sonarjs/no-duplicate-string
          devDependencies: ['**/*.spec.ts', '**/*.test.ts'],
        },
      ],

      'import/no-deprecated': 'error',
      'import/namespace': 'off',
      'import/export': 'off',
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
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      'sonarjs/cognitive-complexity': ['error', 24],
      'no-only-tests/no-only-tests': 'error',
      'one-var': 'off',
      'default-case': 'off',
      'sort-keys': 'off',
      'capitalized-comments': 'off',

      'func-style': [
        'error',
        'declaration',
        {
          allowArrowFunctions: true,
        },
      ],

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
      'consistent-return': 'off',
      'init-declarations': 'off',
      'no-inline-comments': 'off',
      'line-comment-position': 'off',
      'prefer-destructuring': 'off',
      complexity: 'off',
      'no-plusplus': 'off',

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

      'new-cap': [
        'error',
        {
          capIsNew: false,
        },
      ],

      'dot-notation': 'off',
      'eslint-comments/no-unused-disable': 2,
      'unicorn/no-array-callback-reference': 'off',
      'unicorn/no-nested-ternary': 'off',
      'unicorn/number-literal-case': 'off',

      'unicorn/prefer-switch': [
        'error',
        {
          minimumCases: 4,
          emptyDefaultCase: 'do-nothing-comment',
        },
      ],

      'unicorn/no-unreadable-array-destructuring': 'off',
      'unicorn/no-abusive-eslint-disable': 'off',
      'unicorn/no-null': 'off',
      'unicorn/prefer-ternary': 'off',
      'unicorn/no-useless-switch-case': 'off',
      'unicorn/no-anonymous-default-export': 'off',

      '@typescript-eslint/restrict-template-expressions': [
        'error',
        {
          allowNumber: true,
          allowBoolean: true,
        },
      ],

      'n/no-unsupported-features/node-builtins': 'off',
      '@checkdigit/no-test-import': 'error',
    },
  },
  {
    files: ['**/*.spec.ts', '**/*.test.ts'],

    rules: {
      '@checkdigit/no-uuid': 'off',
      '@checkdigit/no-test-import': 'off',
      '@typescript-eslint/no-base-to-string': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
      '@typescript-eslint/no-confusing-void-expression': 'off',
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/unbound-method': 'off',
      'import/no-extraneous-dependencies': 'off',
      'n/no-process-env': 'off',
      'sonarjs/no-duplicate-string': 'off',
      'sonarjs/no-identical-functions': 'off',
      'sonarjs/cognitive-complexity': 'off',
      'unicorn/no-useless-undefined': 'off',
      'unicorn/no-await-expression-member': 'off',
      'unicorn/consistent-function-scoping': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/error-message': 'off',
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/no-array-for-each': 'off',
      'max-lines': 'off',
      'max-lines-per-function': 'off',
      'max-statements': 'off',
      'no-await-in-loop': 'off',
      'no-magic-numbers': 'off',
      'no-undefined': 'off',
      'prefer-promise-reject-errors': 'off',
      'require-yield': 'off',
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, strict, @typescript-eslint/no-unsafe-return
  ...compat.extends('plugin:jest/recommended').map((config) => ({
    ...config,
    files: ['**/*.spec.ts'],
  })),
  {
    files: ['**/*.spec.ts'],

    plugins: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      jest,
    },

    rules: {
      'jest/expect-expect': 'off',

      'jest/max-nested-describe': [
        'error',
        {
          max: 1,
        },
      ],

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
];
