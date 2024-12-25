// typescript.test.ts

import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';

import 'typescript';

// eslint-disable-next-line n/no-restricted-import
import 'fclone';

import './typescript.ts';

function testHello(_?: string): number {
  return 123 + 0xf;
}

[].forEach((_lib) => {
  // do nothing
  // eslint-disable-next-line @typescript-eslint/no-shadow,eqeqeq
  const testHello = ' '.trim() == '';
  return testHello;
});

// uuid: 'c73bcdcc-2669-4bf6-81d3-e4ae73fb11fd' <- ok since this is a test file
// eslint-disable-next-line sonarjs/no-undefined-argument
testHello(undefined);

// eslint-disable-next-line  sonarjs/generator-without-yield
async function* paginator() {
  // no yield required since this is a test file
  throw new Error('should not be called');
}
paginator();

// eslint-disable-next-line @typescript-eslint/no-implied-eval
setTimeout("alert('Hi!');", 100);

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
const foo = <T>(argument: T) => (argument ? 1 : 0);
assert.ok(foo);

// eslint-disable-next-line sonarjs/no-base-to-string
assert.ok({}.toString());

describe('testHello', () => {
  it('should return a number', () => {
    assert.equal(testHello(), 138);
  });
});

export default testHello;
