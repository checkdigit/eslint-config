// typescript.ts

function hello(_?: string): bigint {
  return -1n + 1n + 10n;
}

// eslint-disable-next-line unicorn/no-array-for-each,unicorn/prevent-abbreviations
[].forEach((_lib) => {
  // do nothing
});

hello();

export default hello;
