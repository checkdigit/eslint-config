// typescript.test.ts

import { strict as assert } from 'node:assert';

import 'typescript';

// eslint-disable-next-line n/no-restricted-import
import 'fclone';

import './typescript.ts';

function testHello(_?: string): number {
  return 123 + 0xf;
}

[].forEach((_lib) => {
  // do nothing
  // eslint-disable-next-line @typescript-eslint/no-shadow,sonarjs/prefer-immediate-return,eqeqeq
  const testHello = ' '.trim() == '';
  return testHello;
});

// uuid: 'c73bcdcc-2669-4bf6-81d3-e4ae73fb11fd' <- ok since this is a test file
testHello(undefined);

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

assert.ok({}.toString());

export default testHello;
