import React from 'react';
import { shallow } from 'enzyme';

import {
  PuzzleDialoguesRenderer,
  PuzzleDialoguesRendererInner,
} from '../PuzzleDialoguesRenderer';
import PuzzleHint from '../PuzzleHint';
import PuzzleDialogue from '../PuzzleDialogue';

import { puzzle, dialogues, hints } from './constants';

describe('<PuzzleDialoguesRenderer />', () => {
  const setParticipantsFn = jest.fn();
  const subscribeFn = jest.fn();
  const defaultProps = {
    loading: false,
    error: null,
    subscribeToMore: subscribeFn,
    data: {
      sui_hei_dialogue: dialogues,
      sui_hei_hint: hints,
    },
    puzzleId: puzzle.id,
    puzzleUser: puzzle.sui_hei_user,
    puzzleStatus: puzzle.status,
    anonymous: puzzle.anonymous,
    shouldSubscribe: true,
    setParticipants: setParticipantsFn,
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
        puzzleUser={puzzle.sui_hei_user}
        puzzleStatus={puzzle.status}
        anonymous={puzzle.anonymous}
      />,
    );
    expect(node.find(PuzzleDialogue).length).toBe(dialogues.length);
    expect(node.find(PuzzleHint).length).toBe(hints.length);
  });
});
