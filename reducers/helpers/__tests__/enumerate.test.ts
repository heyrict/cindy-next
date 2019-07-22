import { actions, helper } from '../enumerate';

let initialState: any = null;

describe('string helper', () => {
  it("action 'set' sets value correctly", () => {
    expect(helper(initialState, actions.set('foo'))).toBe('foo');
    expect(helper(initialState, actions.set(null))).toBe(null);
  });

  it("action 'toggle' toggles value correctly", () => {
    expect(helper(null, actions.toggle('A'))).toBe('A');
    expect(helper('A', actions.toggle('A'))).toBe(null);
    expect(helper('A', actions.toggle('A', 'N'))).toBe('N');
  });

  it('helper should ignore unknown actions', () => {
    expect(helper(initialState, { type: 'UNKNOWN' } as any)).toBe(initialState);
  });
});
