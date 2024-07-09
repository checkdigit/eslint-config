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

// eslint-disable-next-line @checkdigit/no-test-import
import testHello from './typescript.test';
testHello();

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
  // this is a comment for the regex below
  assert.ok(/^[a-z]+$/u.test('hello'));
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

const numberValue = 1;
const booleanValue = true;
const objectValue = { key: 'value' };
// linting error is not reported because @typescript-eslint/restrict-template-expressions is configured to allow number and boolean
assert(`I'm a number, ${numberValue}`);
assert(`I'm a boolean, ${booleanValue}`);
// eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-base-to-string
assert(`I'm a object, ${objectValue}`);

// linting error is not reported because n/no-unsupported-features/node-builtins is disabled
await fetch('https://example.com');

// test rule @checkdigit/invalid-json-stringify
const objectToSerialize = { key: 'value' };
assert.deepEqual(JSON.stringify(objectToSerialize), '{"key":"value"}');
const newError = new Error('error');
// eslint-disable-next-line @checkdigit/invalid-json-stringify
assert.equal(JSON.stringify(newError), '{}'); // serialization of Error object is losing information, hance the error
try {
  //
} catch (caughtError) {
  // eslint-disable-next-line no-console, @checkdigit/invalid-json-stringify
  console.log(JSON.stringify(caughtError));
}
