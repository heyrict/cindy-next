import React, { useState } from 'react';
import { widthSplits } from '../constants';

import { Mutation } from 'react-apollo';
import { UPDATE_PUZZLE_MUTATION } from 'graphql/Mutations/Puzzle';
import {
  UpdatePuzzleMutation,
  UpdatePuzzleMutationVariables,
} from 'graphql/Mutations/generated/UpdatePuzzleMutation';

import { Flex } from 'components/General';
import SetPanelToolbar from './SetPanelToolbar';
import SolutionEditPanel from './SolutionEditPanel';
import MemoEditPanel from './MemoEditPanel';
import PuzzleEditPanel from './PuzzleEditPanel';
import HintAddPanel from './HintAddPanel';

import { ControlPanelProps, ControlPanelPanelType } from './types';
import { PuzzleType } from '../types';

const getInitialPanel = (puzzle: PuzzleType): ControlPanelPanelType => {
  if (puzzle.status === 0) {
    if (puzzle.yami === 2) return ControlPanelPanelType.MEMO_EDIT;
    return ControlPanelPanelType.SOLUTION_EDIT;
  }
  return ControlPanelPanelType.MEMO_EDIT;
};

const ControlPanel = ({ puzzle }: ControlPanelProps) => {
  const [currentPanel, setCurrentPanel] = useState(getInitialPanel(puzzle));
  return (
    <Flex width={1} mx={widthSplits[2]} flexWrap="wrap">
      <SetPanelToolbar
        currentPanel={currentPanel}
        setCurrentPanel={setCurrentPanel}
        status={puzzle.status}
        yami={puzzle.yami}
      />
      {currentPanel === ControlPanelPanelType.SOLUTION_EDIT && (
        <SolutionEditPanel puzzleId={puzzle.id} solution={puzzle.solution} />
      )}
      {currentPanel === ControlPanelPanelType.MEMO_EDIT && (
        <MemoEditPanel puzzleId={puzzle.id} memo={puzzle.memo} />
      )}
      {currentPanel === ControlPanelPanelType.HINT_ADD && (
        <HintAddPanel puzzleId={puzzle.id} yami={puzzle.yami} />
      )}
      <Mutation<UpdatePuzzleMutation, UpdatePuzzleMutationVariables>
        mutation={UPDATE_PUZZLE_MUTATION}
      >
        {updatePuzzle => (
          <PuzzleEditPanel
            updatePuzzle={updatePuzzle}
            puzzleId={puzzle.id}
            yami={puzzle.yami}
            genre={puzzle.genre}
            grotesque={puzzle.grotesque}
            status={puzzle.status}
            dazed_on={puzzle.dazed_on}
            show={currentPanel === ControlPanelPanelType.PUZZLE_EDIT}
          />
        )}
      </Mutation>
    </Flex>
  );
};

export default ControlPanel;
