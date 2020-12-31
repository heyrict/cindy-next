import React, { useState } from 'react';
import { widthSplits } from '../constants';

import { Mutation } from '@apollo/react-components';
import {
  UPDATE_PUZZLE_MUTATION,
  UPDATE_PUZZLE_DAZED_ON_MUTATION,
} from 'graphql/Mutations/Puzzle';
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
import {
  UpdatePuzzleDazedOnMutationVariables,
  UpdatePuzzleDazedOnMutation,
} from 'graphql/Mutations/generated/UpdatePuzzleDazedOnMutation';

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
      />
      {currentPanel === ControlPanelPanelType.SOLUTION_EDIT && (
        <SolutionEditPanel
          puzzleId={puzzle.id}
          solution={puzzle.solution}
          status={puzzle.status}
          yami={puzzle.yami}
        />
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
          <Mutation<
            UpdatePuzzleDazedOnMutation,
            UpdatePuzzleDazedOnMutationVariables
          >
            mutation={UPDATE_PUZZLE_DAZED_ON_MUTATION}
          >
            {updatePuzzleDazedOn => (
              <PuzzleEditPanel
                updatePuzzle={updatePuzzle}
                updatePuzzleDazedOn={updatePuzzleDazedOn}
                puzzleId={puzzle.id}
                yami={puzzle.yami}
                genre={puzzle.genre}
                grotesque={puzzle.grotesque}
                status={puzzle.status}
                dazedOn={puzzle.dazedOn}
                show={currentPanel === ControlPanelPanelType.PUZZLE_EDIT}
              />
            )}
          </Mutation>
        )}
      </Mutation>
    </Flex>
  );
};

export default ControlPanel;
