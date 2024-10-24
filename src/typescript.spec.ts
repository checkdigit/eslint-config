// typescript.spec.ts

import { strict as assert } from 'node:assert';
import { describe, it } from '@jest/globals';
// it's ok to import test files from test code
import testHello from './typescript.test';
testHello();

// linting error is not reported because unicorn/no-anonymous-default-export is disabled
// eslint-disable-next-line jest/no-export
export default function (): string {
  return 'hello';
}

describe('Sample Test Suite', () => {
  it('should return hello', () => {
    const result = testHello();
    assert.equal(result, 'hello');
  });
});
