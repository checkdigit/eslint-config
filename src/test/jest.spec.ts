// test/jest.spec.ts

import { strict as assert } from 'node:assert';

import { afterEach, beforeAll, beforeEach, describe, it, xit } from '@jest/globals';

// eslint-disable-next-line jest/require-top-level-describe
it('lonely it', () => {
  // do nothing
});

describe('top level describe', () => {
  beforeEach(() => {
    // do nothing
  });

  afterEach(() => {
    // do nothing
  });

  // eslint-disable-next-line jest/no-duplicate-hooks,jest/prefer-hooks-in-order
  beforeEach(() => {
    // do nothing
  });

  // eslint-disable-next-line jest/no-test-prefixes,jest/no-disabled-tests
  xit('disabled test', () => {
    // do nothing
  });

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('skipped test', () => {
    assert.equal(0n, 0n);
  });

  // eslint-disable-next-line no-only-tests/no-only-tests,jest/no-focused-tests
  it.only('focused test', () => {
    // do nothing
  });

  // eslint-disable-next-line jest/max-nested-describe
  describe('nested describe', () => {
    it('nested test', () => {
      assert.equal(0n, 0n);
    });
  });

  // eslint-disable-next-line jest/prefer-hooks-on-top
  beforeAll(() => {
    // do nothing
  });

  // eslint-disable-next-line jest/no-done-callback
  it('test', (done) => {
    done();
  });

  it('duplicate test name', () => {
    // do nothing
  });

  // eslint-disable-next-line jest/no-identical-title
  it('duplicate test name', () => {
    // do nothing
  });
});

// eslint-disable-next-line jest/require-top-level-describe
describe('second top level describe', () => {
  // do nothing
});
