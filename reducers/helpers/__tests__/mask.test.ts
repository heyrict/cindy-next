import { actions, helper } from '../mask';

let initialState: any = 0b0101;

describe('string helper', () => {
  it("action 'set' sets value correctly", () => {
    expect(helper(initialState, actions.set(0b0010))).toBe(0b0010);
  });

  it("action 'turnOn' turns on value correctly", () => {
    expect(helper(initialState, actions.turnOn(0b1000))).toBe(0b1101);
  });

  it("action 'turnOff' turns on value correctly", () => {
    expect(helper(initialState, actions.turnOff(0b0100))).toBe(0b0001);
  });

  it("action 'toggle' work correctly", () => {
    expect(helper(initialState, actions.toggle(0b1001))).toBe(0b1100);
  });

  it('helper should ignore unknown actions', () => {
    expect(helper(initialState, { type: 'UNKNOWN' })).toBe(initialState);
  });
});
