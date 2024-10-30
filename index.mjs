/*
 * Copyright (c) 2021-2024 Check Digit, LLC
 *
 * This code is licensed under the MIT license (see LICENSE.txt for details).
 */

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promises as fs } from 'node:fs';

import { fixupConfigRules } from '@eslint/compat';
import checkdigit from '@checkdigit/eslint-plugin';
import ts from 'typescript-eslint';
import sonarjs from 'eslint-plugin-sonarjs';
import importPlugin from 'eslint-plugin-import';
import noOnlyTests from 'eslint-plugin-no-only-tests';
import noSecrets from 'eslint-plugin-no-secrets';
import n from 'eslint-plugin-n';
import tsParser from '@typescript-eslint/parser';
import jest from 'eslint-plugin-jest';
import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import { FlatCompat } from '@eslint/eslintrc';
import unicorn from 'eslint-plugin-unicorn';
import json from '@eslint/json';
import markdown from '@eslint/markdown';
import yaml from 'eslint-plugin-yml';

const ignores = [
  ...(await fs.readFile('.gitignore', 'utf-8')).split('\n').filter((path) => path.trim() !== ''),
  'eslint.config.mjs',
];
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const tsConfigurations = [
  js.configs.all,
  ...ts.configs.strictTypeChecked,
  ...ts.configs.stylisticTypeChecked,
  unicorn.configs['flat/recommended'],
  sonarjs.configs.recommended,
  prettier,
  n.configs['flat/recommended-module'],
  importPlugin.flatConfigs.typescript,
  ...fixupConfigRules(compat.extends('plugin:eslint-comments/recommended')),
  checkdigit.configs.all,
  {
    plugins: {
      'no-only-tests': noOnlyTests,
      'no-secrets': noSecrets,
      import: importPlugin,
    },
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        projectService: true,
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

      // Per require-await docs:
      // If you are throwing an error inside an asynchronous function for this purpose, then you may want to disable this rule.
      'require-await': 'off',
      '@typescript-eslint/require-await': 'off',

      // sonarjs doesn't implement the no-big-function rule probably because this rule already exists within stock eslint
      // set to 200 because that is sonar's default
      'max-lines-per-function': ['error', 200],

      // enforce use of curly braces around if statements and discourage one-line ifs
      curly: 'error',

      // undefined can be used
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

      // turn on node-specific stylistic rules
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

      // this doesn't work for our style of imports
      'n/no-missing-import': 'off',
      'n/no-extraneous-import': 'off',

      // this doesn't seem to work
      'n/no-unpublished-import': 'off',

      // duplicated by unicorn/no-process-exit
      'n/no-process-exit': 'off',

      // import-specific rules
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: ['**/*.spec.ts', '**/*.test.ts'],
        },
      ],
      'import/no-deprecated': 'error',
      'import/namespace': 'off',

      // has a bug, throws an exception in some cases
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

      // sometimes fails on valid interface names like ISO8583
      '@typescript-eslint/interface-name-prefix': 'off',

      // typeof any === "evil".
      '@typescript-eslint/no-explicit-any': 'error',

      // We're smarter than the default (15). Right?
      'sonarjs/cognitive-complexity': ['error', 24],
      'no-only-tests/no-only-tests': 'error',

      // eslint:all rules to modify
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

      // this should use the default (3) but would currently cause too much pain
      'max-params': ['error', 8],

      // this should be turned on if the ignoreTopLevelFunctions option starts working
      'max-statements': 'off',
      'consistent-return': 'off',
      'init-declarations': 'off',
      'no-inline-comments': 'off',
      'line-comment-position': 'off',
      'prefer-destructuring': 'off',

      // use the sonarjs version instead
      complexity: 'off',

      // thanks to Prettier, we don't rely on automatic semicolon insertion, so this can remain off
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

      // this doesn't make sense in Typescript code, we can rely on type checking to catch it
      'unicorn/no-array-callback-reference': 'off',

      // regardless of merits, these rules contradict prettier so cannot be
      'unicorn/no-nested-ternary': 'off',
      'unicorn/number-literal-case': 'off',

      // require 4 separate conditions before an error
      'unicorn/prefer-switch': [
        'error',
        {
          minimumCases: 4,
          emptyDefaultCase: 'do-nothing-comment',
        },
      ],

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

      // most of the time it makes sense, but sometimes it's bad to have to come up with a name
      'unicorn/no-anonymous-default-export': 'off',

      // having this restriction for number/boolean literals forces unnecessary changes
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        {
          allowNumber: true,
          allowBoolean: true,
        },
      ],

      // we are seriously using many new features such as fetch, etc.
      'n/no-unsupported-features/node-builtins': 'off',

      '@checkdigit/no-test-import': 'error',

      // disable this now that we have a similar but better solution with auto-fix from @checkdigit/eslint-plugin
      'no-duplicate-imports': 'off',

      // at this point, it's allowed to use in production code
      '@checkdigit/no-serve-runtime': 'off',
    },
  },
  {
    files: ['**/*.spec.ts', '**/*.test.ts'],
    rules: {
      '@checkdigit/no-uuid': 'off',
      '@checkdigit/no-test-import': 'off',
      '@checkdigit/no-serve-runtime': 'error',
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
  {
    files: ['**/*.spec.ts'],
    ...jest.configs['flat/recommended'],
    rules: {
      ...jest.configs['flat/recommended'].rules,
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
  {
    files: ['src/plugin/**'],
    rules: {
      '@checkdigit/no-full-response': 'off',
    },
  },
].map((config) => ({
  ...config,
  files: config.files ?? ['**/*.ts'],
}));

const jsonConfigurations = [
  {
    ignores: ['package-lock.json'],
    language: 'json/json',
    ...json.configs.recommended,
  },
].map((config) => ({
  ...config,
  files: config.files ?? ['**/*.json'],
}));

const yamlConfigurations = yaml.configs['flat/recommended'].map((config) => ({
  ...config,
  files: config.files ?? ['**/*.yml', '**/*.yaml'],
}));

const markdownConfigurations = markdown.configs.recommended.map((config) => ({
  ...config,
  files: config.files ?? ['**/*.md'],
}));

export default [
  { ignores },
  {
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
    },
  },
  ...tsConfigurations,
  ...markdownConfigurations,
  ...jsonConfigurations,
  ...yamlConfigurations,
];
