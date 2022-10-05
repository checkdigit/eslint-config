// typescript.test.ts

function testHello(_?: string) {
  return 123 + 0xf;
}

[].forEach((_lib) => {
  // do nothing
});

// uuid: 'c73bcdcc-2669-4bf6-81d3-e4ae73fb11fd' <- ok since this is a test file
testHello();

export default testHello;
