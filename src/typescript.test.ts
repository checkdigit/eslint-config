// typescript.test.ts

function testHello(_?: string) {
  return 123 + 0xf;
}

[].forEach((_lib) => {
  // do nothing
});

testHello();

export default testHello;
