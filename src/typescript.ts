// typescript.ts

// eslint-disable-next-line import/no-extraneous-dependencies
import 'typescript';

// eslint-disable-next-line unicorn/prefer-node-protocol
import { strict as assert } from 'assert';

// eslint-disable-next-line no-warning-comments
// TODO: hello
import fs from 'node:fs';

// eslint-disable-next-line n/prefer-global/url-search-params, @checkdigit/no-duplicated-imports
import { URLSearchParams } from 'node:url';
// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions,@checkdigit/require-assert-message, @checkdigit/no-side-effects
assert.ok(URLSearchParams);

import { format } from 'node:url';
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition,@checkdigit/require-assert-message, @checkdigit/no-side-effects
assert.ok(format !== undefined);

// eslint-disable-next-line @checkdigit/no-test-import
import testHello from './typescript.test.ts';
// eslint-disable-next-line @checkdigit/no-side-effects
testHello();

// eslint-disable-next-line n/no-sync, @checkdigit/no-side-effects
assert.ok(fs.existsSync('.'), 'cwd does not exist?');

// eslint-disable-next-line n/no-process-env,@checkdigit/require-assert-message, @checkdigit/no-side-effects
assert.ok(process.env['DEBUG'] !== undefined);

function hello(_?: string): bigint {
  return -1n + 1n + 10n;
}

// eslint-disable-next-line unicorn/no-array-for-each,unicorn/prevent-abbreviations
['', undefined].forEach((_lib) => {
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing,@typescript-eslint/strict-boolean-expressions
  const thing = _lib || {};
  // this is a comment for the regex below
  assert.ok(/^[a-z]+$/u.test('hello'), 'regex');
  // eslint-disable-next-line  @checkdigit/no-type-assertion-as
  hello(thing as string);
  // do nothing
});

// eslint-disable-next-line @checkdigit/no-uuid
// uuid: 'c73bcdcc-2669-4bf6-81d3-e4ae73fb11fd' <- not ok since this is a non-test file
// eslint-disable-next-line @checkdigit/no-side-effects
hello();

// eslint-disable-next-line require-yield
async function* paginator() {
  throw new Error('should not be called');
}
// eslint-disable-next-line @checkdigit/no-side-effects
paginator();

// eslint-disable-next-line @typescript-eslint/no-for-in-array,guard-for-in,no-magic-numbers
for (const value in [1, 2, 3]) {
  // eslint-disable-next-line no-console
  console.log(value);
}

// eslint-disable-next-line no-eval, @checkdigit/no-side-effects
eval('console.log("no-no");');

// eslint-disable-next-line no-invalid-this,@typescript-eslint/strict-boolean-expressions,@checkdigit/require-assert-message, @checkdigit/no-side-effects
assert.ok(this);

// eslint-disable-next-line sonarjs/pseudo-random, @checkdigit/no-side-effects
if (Math.random()) {
  // ...
} else {
  // eslint-disable-next-line sonarjs/pseudo-random, no-lonely-if
  if (Math.random()) {
    // ...
  }
}

// eslint-disable-next-line sonarjs/pseudo-random,@checkdigit/require-assert-message, @checkdigit/no-side-effects
assert.ok(Math.random() === 2);

// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-unnecessary-type-parameters
const foo = <T>(argument: T) => (argument ? 1 : 0);
// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions,@checkdigit/require-assert-message, @checkdigit/no-side-effects
assert.ok(foo);

// eslint-disable-next-line @typescript-eslint/no-base-to-string,@checkdigit/require-assert-message, @checkdigit/no-side-effects
assert.ok({}.toString());

export default hello;

const numberValue = 1;
const booleanValue = true;
const objectValue = { key: 'value' };
// linting error is not reported because @typescript-eslint/restrict-template-expressions is configured to allow number and boolean
// eslint-disable-next-line @checkdigit/no-side-effects
assert.ok(`I'm a number, ${numberValue}`, 'number?');
// eslint-disable-next-line @checkdigit/no-side-effects
assert.ok(`I'm a boolean, ${booleanValue}`, 'boolean?');
// eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-base-to-string,unicorn/consistent-assert, @checkdigit/no-side-effects
assert(`I'm a object, ${objectValue}`, 'object?');

// linting error is not reported because n/no-unsupported-features/node-builtins is disabled
// eslint-disable-next-line @checkdigit/no-side-effects, @checkdigit/require-service-call-response-declaration
await fetch('https://example.com');

// test rule @checkdigit/invalid-json-stringify
const objectToSerialize = { key: 'value' };
// eslint-disable-next-line @checkdigit/require-assert-message, @checkdigit/no-side-effects
assert.equal(JSON.stringify(objectToSerialize), '{"key":"value"}');
// eslint-disable-next-line @checkdigit/no-side-effects
const newError = new Error('error');
// eslint-disable-next-line @checkdigit/invalid-json-stringify,@checkdigit/require-assert-message, @checkdigit/no-side-effects
assert.equal(JSON.stringify(newError), '{}'); // serialization of Error object is losing information, hance the error
// eslint-disable-next-line @checkdigit/no-side-effects
try {
  //
} catch (caughtError) {
  // eslint-disable-next-line no-console, @checkdigit/invalid-json-stringify
  console.log(JSON.stringify(caughtError));
}

export async function testNoPromiseInstanceMethodRule(): Promise<void> {
  // eslint-disable-next-line @checkdigit/no-promise-instance-method
  return fetch('https://example.com')
    .then((response) => {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions,@checkdigit/require-assert-message
      assert.ok(response);
    })
    .catch(() => {
      //
    });
}
