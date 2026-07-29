// typescript.spec.ts

import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';

// it's ok to import test files from test code
import testHello from './typescript.test.ts';
testHello();

describe('suite', () => {
  // eslint-disable-next-line sonarjs/assertions-in-tests
  it('test', () => {
    testHello();
  });

  function callService() {
    const url = 'https://example.com';
    return fetch(url);
  }
  // eslint-disable-next-line sonarjs/assertions-in-tests
  it('test service calls', async () => {
    await callService();
    await fetch('https://example.com');
  });
});

// linting error is not reported because unicorn/no-anonymous-default-export is disabled
export default function (): string {
  return 'hello';
}

const sql = `WITH
  parameters AS (
    SELECT
      '2026-01-01T00:00:00.000Z' AS p_from,
      '2026-12-31T23:59:59.999Z' AS p_to
  )
  SELECT
    *
  FROM
    non_existent_table
`;
// eslint-disable-next-line sonarjs/no-trivial-assertions
assert.ok(sql);
