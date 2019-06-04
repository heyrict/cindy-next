import { actionTypes, actions, getActions, helper } from '../array';

const initialState = [];

const scalarSample = 'foobar';
const arraySample = ['foo', 'bar'];

describe('array helper', () => {
  it('test action.SET', () => {
    expect(helper(initialState, actions.set(arraySample))).toStrictEqual(
      arraySample,
    );
  });

  describe('test action.PUSH', () => {
    it('scalar', () => {
      expect(helper(initialState, actions.push(scalarSample))).toStrictEqual(
        initialState.concat(scalarSample),
      );
    });
    it('array', () => {
      const toPush = ['foo', 'bar'];
      expect(helper(initialState, actions.push(arraySample))).toStrictEqual(
        initialState.concat(arraySample),
      );
    });
  });

  describe('test action.INSERT', () => {
    it('scalar', () => {
      const orig = ['a', 'b', 'c', 'e', 'f'];
      const index = 3;
      const value = 'd';
      const expected = ['a', 'b', 'c', 'd', 'e', 'f'];
      expect(helper(orig, actions.insert(index, value))).toStrictEqual(
        expected,
      );
    });
  });

  it('test action.POP', () => {
    const orig = ['a', 'b', 'c', 'd', 'e' , 'f'];
    const expected = ['a', 'b', 'c', 'd', 'e'];
    expect(helper(orig, actions.pop())).toStrictEqual(expected);
  })

  it('test action.DELETE', () => {
    const orig = ['a', 'b', 'c', 'd', 'e'];
    const expected = ['a', 'c', 'd', 'e'];
    expect(helper(orig, actions.delete(1))).toStrictEqual(expected);
  })

  it('test action.EMPTY', () => {
    expect(helper(arraySample, actions.empty())).toStrictEqual([]);
  })

  it('test action.SWAP', () => {
    const orig = ['a', 'b', 'c', 'd'];
    const expected = ['c', 'b', 'a', 'd'];
    expect(helper(orig, actions.swap(0, 2))).toStrictEqual(expected)
  })
});
