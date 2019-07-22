import { actions, helper } from '../base';

let initialState: any = null;

describe('string helper', () => {
  it("action 'set' sets value correctly", () => {
    expect(helper(initialState, actions.set('foo'))).toBe('foo');
    expect(helper(initialState, actions.set(null))).toBe(null);
  });

  it('helper should ignore unknown actions', () => {
    expect(helper(initialState, { type: 'UNKNOWN' } as any)).toBe(initialState);
  });
});
