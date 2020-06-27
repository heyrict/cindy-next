import React from 'react';
import { shallow } from 'enzyme';

import {
  PuzzleDialoguesRenderer,
  PuzzleDialoguesRendererInner,
} from '../PuzzleDialoguesRenderer';
import PuzzleHint from '../PuzzleHint';
import PuzzleDialogue from '../PuzzleDialogue';

import { puzzle, dialogues, hints } from './constants';

describe.skip('<PuzzleDialoguesRenderer />', () => {
  const setParticipantsFn = jest.fn();
  const subscribeFn = jest.fn();
  const incGoodQuestionsFn = jest.fn();
  const incTrueAnswersFn = jest.fn();
  const setTrueSolvedLongtermYamiFn = jest.fn();

  const defaultProps = {
    pushNotification: true,
    subscribeToMore: subscribeFn,
    data: {
      dialogue: dialogues,
      hint: hints,
    },
    variables: {
      puzzleId: puzzle.id,
    },
    user: {
      id: undefined,
      nickname: undefined,
      username: undefined,
    },
    puzzleUser: puzzle.user,
    puzzleStatus: puzzle.status,
    anonymous: puzzle.anonymous,
    shouldSubscribe: true,
    setParticipants: setParticipantsFn,
    incGoodQuestions: incGoodQuestionsFn,
    incTrueAnswers: incTrueAnswersFn,
    setTrueSolvedLongtermYami: setTrueSolvedLongtermYamiFn,
    // unused required props
    loading: false,
    error: null as any,
    startPolling: (): any => {},
    stopPolling: (): any => {},
    updateQuery: (): any => {},
    refetch: (): any => {},
    client: null as any,
    networkStatus: 0,
    fetchMore: (): any => {},
    called: false,
  };

  it('Should render', () => {
    shallow(<PuzzleDialoguesRenderer {...defaultProps} />);
  });
});

describe('<PuzzleDialoguesRendererInner />', () => {
  it('Should render all dialogues and hints in combination', () => {
    const node = shallow(
      <PuzzleDialoguesRendererInner
        dialogues={dialogues}
        hints={hints}
        puzzleUser={puzzle.user}
        puzzleStatus={puzzle.status}
        anonymous={puzzle.anonymous}
      />,
    );
    expect(node.find(PuzzleDialogue).length).toBe(dialogues.length);
    expect(node.find(PuzzleHint).length).toBe(hints.length);
  });
});
