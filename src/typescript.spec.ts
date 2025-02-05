// typescript.spec.ts

import { describe, it } from 'node:test';

// it's ok to import test files from test code
import testHello from './typescript.test.ts';
testHello();

describe('suite', () => {
  it('test', () => {
    testHello();
  });

  function callService() {
    const url = 'https://example.com';
    return fetch(url);
  }
  it('test service calls', async () => {
    await callService();
    await fetch('https://example.com');
  });
});

// linting error is not reported because unicorn/no-anonymous-default-export is disabled
export default function (): string {
  return 'hello';
}
