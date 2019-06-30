import { actions, helper } from '../integer';

let initialState: number = 0;

describe('string helper', () => {
  it("action 'set' sets value correctly", () => {
    expect(helper(initialState, actions.set(3))).toBe(3);
  });

  describe('increase should work', () => {
    it('with no params', () => {
      expect(helper(initialState, actions.inc())).toBe(1);
    });
    it('with params', () => {
      expect(helper(initialState, actions.inc(2))).toBe(2);
    });
  });

  describe('decrease should work', () => {
    it('with no params', () => {
      expect(helper(initialState, actions.dec())).toBe(-1);
    });
    it('with params', () => {
      expect(helper(initialState, actions.dec(2))).toBe(-2);
    });
  });

  it('helper should ignore unknown actions', () => {
    expect(helper(initialState, { type: 'UNKNOWN' })).toBe(initialState);
  });
});
