// typescript.ts

// eslint-disable-next-line import/no-extraneous-dependencies
import 'jest';

// eslint-disable-next-line import/no-extraneous-dependencies
import 'typescript';

// eslint-disable-next-line unicorn/prefer-node-protocol
import { strict as assert } from 'assert';

import fs from 'node:fs';

// eslint-disable-next-line n/prefer-global/url-search-params
import { URLSearchParams } from 'node:url';

// eslint-disable-next-line n/no-sync
assert.ok(fs.existsSync('.'));
assert.ok(URLSearchParams);

// eslint-disable-next-line n/no-process-env
assert.ok(process.env['DEBUG']);

function hello(_?: string): bigint {
  return -1n + 1n + 10n;
}

// eslint-disable-next-line unicorn/no-array-for-each,unicorn/prevent-abbreviations
['', undefined].forEach((_lib) => {
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing,@typescript-eslint/strict-boolean-expressions
  const thing = _lib || {};
  hello(thing as string);
  // do nothing
});

// eslint-disable-next-line @checkdigit/no-uuid
// uuid: 'c73bcdcc-2669-4bf6-81d3-e4ae73fb11fd' <- not ok since this is a non-test file
hello();

// eslint-disable-next-line require-yield
async function* paginator() {
  throw new Error('should not be called');
}
paginator();

// eslint-disable-next-line @typescript-eslint/no-for-in-array,guard-for-in,no-magic-numbers
for (const value in [1, 2, 3]) {
  // eslint-disable-next-line no-console
  console.log(value);
}

// eslint-disable-next-line no-eval
eval('console.log("no-no");');

// eslint-disable-next-line no-invalid-this
assert.ok(this);

if (Math.random()) {
  // ...
} else {
  // eslint-disable-next-line no-lonely-if
  if (Math.random()) {
    // ...
  }
}

// eslint-disable-next-line no-unneeded-ternary
assert.ok(Math.random() === 2 ? true : false);

// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
const foo = <T>(argument: T) => (argument ? 1 : 0);
assert.ok(foo);

// eslint-disable-next-line @typescript-eslint/no-base-to-string
assert.ok({}.toString());

export default hello;
