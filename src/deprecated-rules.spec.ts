// deprecated-rules.spec.ts

import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';

// eslint-disable-next-line sonarjs/deprecation
import { builtinRules } from 'eslint/use-at-your-own-risk';
import { rules as sonarjsRules } from 'eslint-plugin-sonarjs';
import unicornRules from 'eslint-plugin-unicorn';
import nPlugin from 'eslint-plugin-n';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';

/* eslint-disable @checkdigit/require-ts-extension-imports-exports */
// @ts-expect-error: Importing ESM config in a test file is intentional
import config from '../index.mjs';
/* eslint-enable @checkdigit/require-ts-extension-imports-exports */

const { rules: nRules } = nPlugin;
const { rules: typescriptEslintRules } = typescriptEslintPlugin;

interface ESLintRuleMeta {
  meta?: {
    deprecated?: boolean | object | undefined;
  };
}
type ESLintPluginRules = Record<string, ESLintRuleMeta>;
type ESLintRuleSetting =
  | 'off'
  | 'warn'
  | 'error'
  | 0
  | 1
  | 2
  | [string | number, ...unknown[]];
type ESLintRules = Record<string, ESLintRuleSetting>;
interface ESLintConfigEntry {
  rules?: ESLintRules;
  plugins?: unknown;
  settings?: unknown;
  languageOptions?: unknown;
  [key: string]: unknown;
}

function findDeprecatedRules(
  pluginRules: ESLintPluginRules | undefined,
): string[] {
  if (!pluginRules) {
    return [];
  }
  return Object.entries(pluginRules)
    .filter(([, rule]) => rule.meta?.deprecated)
    .map(([ruleName]) => ruleName);
}

function getAllExplicitRulesFromConfig(
  eslintConfig: ESLintConfigEntry[],
): ESLintRules {
  return eslintConfig.reduce<ESLintRules>((rules, entry) => {
    if (
      typeof entry === 'object' &&
      !Array.isArray(entry) &&
      entry.rules &&
      entry.plugins
    ) {
      Object.assign(rules, entry.rules);
    }
    return rules;
  }, {});
}

function isRuleEnabled(setting: ESLintRuleSetting): boolean {
  if (setting === 'off' || setting === 0) {
    return false;
  }
  return !(
    Array.isArray(setting) &&
    (setting[0] === 'off' || setting[0] === 0)
  );
}

// Test suite
describe('No deprecated rules are explicitly enabled in config', () => {
  it('should not explicitly enable any deprecated rules', () => {
    const allDeprecated = new Set([
      ...findDeprecatedRules(sonarjsRules),
      ...findDeprecatedRules(unicornRules.rules),
      ...findDeprecatedRules(nRules),
      ...findDeprecatedRules(typescriptEslintRules),
      // eslint-disable-next-line sonarjs/deprecation
      ...Array.from(builtinRules.entries())
        .filter(([, rule]) => rule.meta?.deprecated)
        .map(([ruleName]) => ruleName),
    ]);

    const configRules = getAllExplicitRulesFromConfig(config);
    const enabledDeprecated = Object.entries(configRules)
      .filter(
        ([rule, setting]) => allDeprecated.has(rule) && isRuleEnabled(setting),
      )
      .map(([rule]) => rule);

    assert.deepEqual(
      enabledDeprecated,
      [],
      `Deprecated rules explicitly enabled: ${enabledDeprecated.join(', ')}`,
    );
  });
});
