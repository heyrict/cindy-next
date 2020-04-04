import {
  scope,
  rootSelector,
  actionTypes,
  actions,
  initialState,
  reducer,
} from '../addReplay';
import {
  AddReplayPanelType,
  ReplayKeywordType,
  ReplayDialogueType,
} from '../types';

const kw = (name: string) =>
  ({
    name,
    tfidf_index: 1,
  } as ReplayKeywordType);

const defaultDialogue: ReplayDialogueType = {
  id: -1,
  good: false,
  true: false,
  question: '',
  answer: '',
  question_keywords: [],
  milestones: [],
  dependency: '',
};

describe('addReplay reducer', () => {
  // {{{ skip actions with helpers
  it.each([
    actionTypes.MODE,
    actionTypes.KEYWORD_MANIPULATE_PANEL,
    actionTypes.KEYWORD_COUNTER,
    actionTypes.KEYWORD_FILTER,
    actionTypes.REPLAY_DIALOGUES,
    actionTypes.KUROMOJI_PROGRESS,
    actionTypes.RENAME_TO,
    actionTypes.MERGE_TO,
  ])('handle %s correctly', actionType => {
    const action = {
      type: actionType,
      payload: {},
    } as any;
    expect(reducer(initialState, action)).toStrictEqual(initialState);
  });
  // }}}

  // {{{ toggleSelectedKeyword
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
  });
  // }}}

  // {{{ removeKeyword
  describe('handle removeKeyword correctly', () => {
    let currentState: typeof initialState = initialState;
    beforeEach(() => {
      currentState = {
        ...initialState,
        replayDialogues: [
          {
            ...defaultDialogue,
            id: 1,
            question: 'Q1',
            question_keywords: [kw('A'), kw('B')],
          },
          {
            ...defaultDialogue,
            id: 2,
            question: 'Q2',
            question_keywords: [kw('A'), kw('C')],
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
            question_keywords: [kw('A')],
          },
          {
            id: 2,
            question: 'Q2',
            question_keywords: [kw('B'), kw('C')],
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
            question_keywords: [kw('A')],
          },
          {
            id: 2,
            question: 'Q2',
            question_keywords: [kw('C')],
          },
        ],
      };
      expect(reducer(currentState, action)).toStrictEqual(expectedState);
    });
  });
  // }}}

  // {{{ renameKeyword
  describe('handle renameKeyword correctly', () => {
    let currentState: typeof initialState = initialState;
    beforeEach(() => {
      currentState = {
        ...initialState,
        renameTo: 'D',
        replayDialogues: [
          {
            ...defaultDialogue,
            id: 1,
            question: 'Q1',
            question_keywords: [kw('A'), kw('B')],
          },
          {
            ...defaultDialogue,
            id: 2,
            question: 'Q2',
            question_keywords: [kw('B'), kw('C')],
          },
        ],
      };
    });

    it('with fromQuestionId', () => {
      const action = actions.renameKeyword('B', 1);
      const expectedState = {
        ...initialState,
        renameTo: 'D',
        replayDialogues: [
          {
            id: 1,
            question: 'Q1',
            question_keywords: [kw('A'), kw('D')],
          },
          {
            id: 2,
            question: 'Q2',
            question_keywords: [kw('B'), kw('C')],
          },
        ],
      };
      expect(reducer(currentState, action)).toStrictEqual(expectedState);
    });

    it('without fromQuestionId', () => {
      const action = actions.renameKeyword('B');
      const expectedState = {
        ...initialState,
        renameTo: 'D',
        replayDialogues: [
          {
            id: 1,
            question: 'Q1',
            question_keywords: [kw('A'), kw('D')],
          },
          {
            id: 2,
            question: 'Q2',
            question_keywords: [kw('D'), kw('C')],
          },
        ],
      };
      expect(reducer(currentState, action)).toStrictEqual(expectedState);
    });

    it('skip empty renameTo', () => {
      const action = actions.renameKeyword('B');
      const expectedState = {
        ...initialState,
        renameTo: '',
        replayDialogues: [
          {
            id: 1,
            question: 'Q1',
            question_keywords: [kw('A'), kw('B')],
          },
          {
            id: 2,
            question: 'Q2',
            question_keywords: [kw('B'), kw('C')],
          },
        ],
      };
      expect(reducer(currentState, action)).toStrictEqual(expectedState);
    });
  });
  // }}}

  // {{{ mergeKeyword
  describe.only('handle mergeKeyword correctly', () => {
    let currentState: typeof initialState = initialState;
    beforeEach(() => {
      currentState = {
        ...initialState,
        keywordToMerge: ['A', 'B'],
        mergeTo: 'E',
        replayDialogues: [
          {
            ...defaultDialogue,
            id: 1,
            question: 'Q1',
            question_keywords: [kw('A'), kw('B')],
          },
          {
            ...defaultDialogue,
            id: 2,
            question: 'Q2',
            question_keywords: [kw('A'), kw('B'), kw('A'), kw('B')],
          },
          {
            ...defaultDialogue,
            id: 3,
            question: 'Q3',
            question_keywords: [kw('D'), kw('A'), kw('B'), kw('C')],
          },
        ],
      };
    });

    it('with fromQuestionId', () => {
      const action = actions.mergeKeyword(1);
      const expectedState = {
        ...initialState,
        keywordToMerge: ['A', 'B'],
        mergeTo: 'E',
        replayDialogues: [
          {
            ...defaultDialogue,
            id: 1,
            question: 'Q1',
            question_keywords: [kw('E')],
          },
          {
            ...defaultDialogue,
            id: 2,
            question: 'Q2',
            question_keywords: [kw('A'), kw('B'), kw('A'), kw('B')],
          },
          {
            ...defaultDialogue,
            id: 3,
            question: 'Q3',
            question_keywords: [kw('D'), kw('A'), kw('B'), kw('C')],
          },
        ],
      };
      expect(reducer(currentState, action)).toStrictEqual(expectedState);
    });

    it('without fromQuestionId', () => {
      const action = actions.mergeKeyword();
      const expectedState = {
        ...initialState,
        keywordToMerge: ['A', 'B'],
        mergeTo: 'E',
        replayDialogues: [
          {
            ...defaultDialogue,
            id: 1,
            question: 'Q1',
            question_keywords: [kw('E')],
          },
          {
            ...defaultDialogue,
            id: 2,
            question: 'Q2',
            question_keywords: [kw('E'), kw('E')],
          },
          {
            ...defaultDialogue,
            id: 3,
            question: 'Q3',
            question_keywords: [kw('D'), kw('E'), kw('C')],
          },
        ],
      };
      expect(reducer(currentState, action)).toStrictEqual(expectedState);
    });
  });
  // }}}

  it('ignores unknown actions', () => {
    const action = {
      type: 'UNKNOWN',
    } as any;
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
