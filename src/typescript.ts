// typescript.ts

// eslint-disable-next-line import/no-extraneous-dependencies
import 'jest';

function hello(_?: string): bigint {
  return -1n + 1n + 10n;
}

// eslint-disable-next-line unicorn/no-array-for-each,unicorn/prevent-abbreviations
['', undefined].forEach((_lib) => {
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
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

export default hello;
