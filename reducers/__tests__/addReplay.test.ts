import {
  scope,
  rootSelector,
  actionTypes,
  actions,
  initialState,
  reducer,
} from '../addReplay';
import { AddReplayPanelType } from '../types';

describe('addReplay reducer', () => {
  it.each([
    actionTypes.KEYWORDS,
    actionTypes.REPLAY_DIALOGUES,
    actionTypes.KUROMOJI_PROGRESS,
    actionTypes.KEYWORD_MANIPULATE_PANEL,
  ])('handle %s correctly', actionType => {
    const action = {
      type: actionType,
      payload: {},
    };
    expect(reducer(initialState, action)).toStrictEqual(initialState);
  });

  describe('handle toggleSelectedKeyword action correctly', () => {
    it.each`
      current | value  | expected
      ${'A'}  | ${'A'} | ${null}
      ${'A'}  | ${'B'} | ${'B'}
      ${null} | ${'A'} | ${'A'}
    `('AddReplayPanelType.KEYWORD_EDIT', ({ current, value, expected }) => {
      const currentState = {
        ...initialState,
        keywordToEdit: current,
      };
      const expectedState = {
        ...initialState,
        keywordToEdit: expected,
      };
      const action = actions.toggleSelectedKeyword(
        value,
        AddReplayPanelType.KEYWORD_EDIT,
      );
      expect(reducer(currentState, action)).toStrictEqual(expectedState);
    });

    it.each`
      current | value  | expected
      ${'A'}  | ${'A'} | ${null}
      ${'A'}  | ${'B'} | ${'B'}
      ${null} | ${'A'} | ${'A'}
    `('AddReplayPanelType.KEYWORD_SELECT', ({ current, value, expected }) => {
      const currentState = {
        ...initialState,
        keywordToSelect: current,
      };
      const expectedState = {
        ...initialState,
        keywordToSelect: expected,
      };
      const action = actions.toggleSelectedKeyword(
        value,
        AddReplayPanelType.KEYWORD_SELECT,
      );
      expect(reducer(currentState, action)).toStrictEqual(expectedState);
    });

    it.each`
      current         | value  | expected
      ${['A', 'B']}   | ${'C'} | ${['B', 'C']}
      ${['A', 'B']}   | ${'A'} | ${[null, 'B']}
      ${['A', 'B']}   | ${'B'} | ${[null, 'A']}
      ${[null, 'A']}  | ${'B'} | ${['A', 'B']}
      ${[null, 'A']}  | ${'A'} | ${[null, null]}
      ${[null, null]} | ${'A'} | ${[null, 'A']}
    `('AddReplayPanelType.KEYWORD_MERGE', ({ current, value, expected }) => {
      const currentState = {
        ...initialState,
        keywordToMerge: current,
      };
      const expectedState = {
        ...initialState,
        keywordToMerge: expected,
      };
      const action = actions.toggleSelectedKeyword(
        value,
        AddReplayPanelType.KEYWORD_MERGE,
      );
      expect(reducer(currentState, action)).toStrictEqual(expectedState);
    });

    it('ignores unknown panels', () => {
      const action = actions.toggleSelectedKeyword('UNKNOWN', 'UNKNOWN');
      expect(reducer(initialState, action)).toStrictEqual(initialState);
    });
  });

  describe('handle removeKeyword correctly', () => {
    let currentState: typeof initialState = initialState;
    beforeEach(() => {
      currentState = {
        ...initialState,
        replayDialogues: [
          {
            id: 1,
            question: 'Q1',
            question_keywords: [{ name: 'A' }, { name: 'B' }],
          },
          {
            id: 2,
            question: 'Q2',
            question_keywords: [{ name: 'B' }, { name: 'C' }],
          },
        ],
      };
    });

    it('with fromQuestionId', () => {
      const action = actions.removeKeyword('B', 1);
      const expectedState = {
        ...initialState,
        replayDialogues: [
          {
            id: 1,
            question: 'Q1',
            question_keywords: [{ name: 'A' }],
          },
          {
            id: 2,
            question: 'Q2',
            question_keywords: [{ name: 'B' }, { name: 'C' }],
          },
        ],
      };
      expect(reducer(currentState, action)).toStrictEqual(expectedState);
    });

    it('without fromQuestionId', () => {
      const action = actions.removeKeyword('B');
      const expectedState = {
        ...initialState,
        replayDialogues: [
          {
            id: 1,
            question: 'Q1',
            question_keywords: [{ name: 'A' }],
          },
          {
            id: 2,
            question: 'Q2',
            question_keywords: [{ name: 'C' }],
          },
        ],
      };
      expect(reducer(currentState, action)).toStrictEqual(expectedState);
    });
  });

  it('ignores unknown actions', () => {
    const action = {
      type: 'UNKNOWN',
    };
    expect(reducer(undefined, action)).toBe(initialState);
  });
});

describe('addReplay selector', () => {
  const store = {
    [scope]: initialState,
  };

  it('to get state in store correctly', () => {
    expect(rootSelector(store)).toBe(initialState);
  });
});
