// deprecated-rules.spec.ts

import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';
import { ESLint } from 'eslint';

/* eslint-disable @checkdigit/require-ts-extension-imports-exports */
// @ts-expect-error: Importing ESM config in a test file is intentional
import config from '../index.mjs';
/* eslint-enable @checkdigit/require-ts-extension-imports-exports */

describe('No deprecated rules are explicitly enabled in config', () => {
  it('should report error when deprecated rules are explicitly enabled', async () => {
    const badConfig = {
      rules: {
        'no-buffer-constructor': ['error'] as ['error'],
      },
    };
    const linter = new ESLint({ baseConfig: badConfig });
    const results = await linter.lintText('new Buffer("test")', {
      filePath: 'index.ts',
    });
    const deprecatedRules = results[0]?.usedDeprecatedRules ?? [];
    assert.ok(
      deprecatedRules.some((rule) => rule.ruleId === 'no-buffer-constructor'),
    );
  });

  it('should not explicitly enable any deprecated rules', async () => {
    const linter = new ESLint({ baseConfig: config });
    const results = await linter.lintFiles(['./src/index.ts']);
    const deprecatedRules = results[0]?.usedDeprecatedRules ?? [];
    assert.deepEqual(
      deprecatedRules,
      [],
      `Deprecated rules explicitly enabled: ${deprecatedRules.map((rule) => rule.ruleId).join(', ')}`,
    );
  });
});
