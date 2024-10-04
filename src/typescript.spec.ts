// typescript.spec.ts

import { strict as assert } from 'node:assert';

// it's ok to import test files from test code
import { describe, it } from '@jest/globals';
import testHello from './typescript.test';
import type { BodyResponseOptions, Configuration, Endpoint, InboundContext } from './typescript';
testHello();

// linting error is not reported because unicorn/no-anonymous-default-export is disabled
// eslint-disable-next-line jest/no-export
export default function (): string {
  return 'hello';
}

interface Fixture {
  config: Configuration;
}
const EMPTY_CONTEXT: InboundContext = {
  get: () => '',
};

const fixture: Fixture = {
  config: {
    service: {
      someService: (_request: InboundContext) =>
        ({
          async get(_url: string, _options?: BodyResponseOptions): Promise<unknown> {
            return '';
          },
        }) as unknown as Endpoint,
    },
  },
};

describe('eslint-config', () => {
  it('@checkdigit/require-resolve-full-response', () => {
    const someService = fixture.config.service['someService'];
    assert.ok(someService !== undefined);
    // eslint-disable-next-line @checkdigit/require-resolve-full-response
    assert.ok(someService(EMPTY_CONTEXT).get('/some-service/v1/ping'));
  });
});
