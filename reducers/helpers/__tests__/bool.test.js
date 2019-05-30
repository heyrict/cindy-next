import { actionTypes, actions, getActions, helper } from '../bool';

let initialState = null;

describe('bool helper', () => {
  it("action 'set' sets value correctly", () => {
    expect(helper(initialState, actions.set(true))).toBe(true);
    expect(helper(initialState, actions.set(false))).toBe(false);
  });

  it("action 'toggle' toggles value correctly", () => {
    expect(helper(true, actions.toggle())).toBe(false);
    expect(helper(false, actions.toggle())).toBe(true);
  });

  it("action 'setTrue' sets value correctly", () => {
    expect(helper(initialState, actions.setTrue())).toBe(true);
  });

  it("action 'setFalse' sets value correctly", () => {
    expect(helper(initialState, actions.setFalse())).toBe(false);
  });

  it('helper should ignore unknown actions', () => {
    expect(helper(initialState, { type: 'UNKNOWN' })).toBe(initialState);
  });
});
