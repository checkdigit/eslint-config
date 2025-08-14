// deprecated-rules.spec.ts

import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';

/* eslint-disable @checkdigit/require-ts-extension-imports-exports */
// @ts-expect-error: Importing ESM config in a test file is intentional
import config from '../index.mjs';
/* eslint-enable @checkdigit/require-ts-extension-imports-exports */

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

const desiredPlugins = new Set([
  '@typescript-eslint/eslint-plugin',
  'eslint-plugin-unicorn',
  'eslint-plugin-sonarjs',
  'eslint-plugin-n',
]);

async function findDeprecatedBuiltinRules(): Promise<string[]> {
  // eslint-disable-next-line sonarjs/deprecation
  const { builtinRules } = await import('eslint/use-at-your-own-risk');
  const deprecatedRules: string[] = [];
  for (const [ruleName, rule] of builtinRules) {
    if (rule.meta?.deprecated) {
      deprecatedRules.push(ruleName);
    }
  }
  return deprecatedRules;
}

async function findDeprecatedRulesFromPlugins(
  pluginNames: string[],
): Promise<string[]> {
  const deprecatedRules: string[] = [];
  for (const pluginName of pluginNames) {
    const plugin = await import(pluginName);
    const pluginRules: ESLintPluginRules = plugin.default.rules ?? plugin.rules;
    deprecatedRules.push(
      ...Object.entries(pluginRules)
        .filter(([, rule]) => rule.meta?.deprecated)
        .map(([ruleName]) => ruleName),
    );
  }
  return deprecatedRules;
}

function extractPluginNamesFromConfig(
  eslintConfig: ESLintConfigEntry[],
): string[] {
  const pluginNames = new Set<string>();
  for (const entry of eslintConfig) {
    if (
      typeof entry === 'object' &&
      !Array.isArray(entry) &&
      entry.plugins &&
      typeof entry.plugins === 'object' &&
      !Array.isArray(entry.plugins)
    ) {
      for (const plugin of Object.keys(entry.plugins)) {
        if (plugin.startsWith('@')) {
          pluginNames.add(`${plugin}/eslint-plugin`);
        } else {
          pluginNames.add(`eslint-plugin-${plugin}`);
        }
      }
    }
  }

  return Array.from(pluginNames).filter((plugin) => desiredPlugins.has(plugin));
}

function getAllExplicitRulesFromConfig(
  eslintConfig: ESLintConfigEntry[],
): ESLintRules {
  const rules: ESLintRules = {};

  for (const entry of eslintConfig) {
    if (
      typeof entry === 'object' &&
      !Array.isArray(entry) &&
      entry.rules &&
      entry.plugins
    ) {
      Object.assign(rules, entry.rules);
    }
  }

  return rules;
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

describe('No deprecated rules are explicitly enabled in config', () => {
  it('should not explicitly enable any deprecated rules', async () => {
    const pluginNames = extractPluginNamesFromConfig(config);

    const allDeprecated = new Set([
      ...(await findDeprecatedRulesFromPlugins(pluginNames)),
      ...(await findDeprecatedBuiltinRules()),
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
