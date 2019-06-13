import { getSubsetActions } from '../common';

const actionSubset = {
  actionOne: () => ({ type: 'ActionOneType' }),
  actionTwo: (params: any) => ({ type: 'ActionOneType', params }),
};

const actionType = 'test.Test';
const key = 'Test';
const params = {
  foo: 'bar',
};

describe('getSubsetActions(...)', () => {
  let transformedActions: { [x: string]: any };

  beforeAll(() => {
    transformedActions = getSubsetActions(actionSubset)(key, actionType);
  });

  it('correctly passes parameters to subset', () => {
    expect(transformedActions[`actionOne${key}`]()).toStrictEqual({
      type: actionType,
      payload: actionSubset.actionOne(),
    });
    expect(transformedActions[`actionTwo${key}`](params)).toStrictEqual({
      type: actionType,
      payload: actionSubset.actionTwo(params),
    });
  });
});
