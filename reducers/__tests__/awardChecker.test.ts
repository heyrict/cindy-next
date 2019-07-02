import {
  scope,
  rootSelector,
  actionTypes,
  actions,
  initialState,
  reducer,
} from '../awardChecker';

describe('awardChecker reducer', () => {
  it.each([
    actionTypes.PUZZLES,
    actionTypes.GOOD_QUESTIONS,
    actionTypes.TRUE_ANSWERS,
    actionTypes.DIALOGUES,
  ])('handle %s correctly', actionType => {
    const action = {
      type: actionType,
      payload: {},
    };
    expect(reducer(initialState, action)).toStrictEqual(initialState);
  });

  it('handle INIT correctly', () => {
    const newState = {
      ...initialState,
      puzzles: 3,
      goodQuestions: 15,
      trueAnswers: 14,
      dialogues: 92,
    };
    const action = actions.initialize(newState);
    expect(reducer(initialState, action)).toStrictEqual(newState);
  });

  it('ignores unknown actions', () => {
    const action = {
      type: 'UNKNOWN',
    };
    expect(reducer(undefined, action)).toBe(initialState);
  });
});

describe('awardChecker selector', () => {
  const store = {
    [scope]: initialState,
  };

  it('to get state in store correctly', () => {
    expect(rootSelector(store)).toBe(initialState);
  });
});
