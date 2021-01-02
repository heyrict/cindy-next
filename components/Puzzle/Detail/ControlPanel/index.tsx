import React, { useState } from 'react';
import { widthSplits } from '../constants';

import { Flex } from 'components/General';
import SetPanelToolbar from './SetPanelToolbar';
import SolutionEditPanel from './SolutionEditPanel';
import MemoEditPanel from './MemoEditPanel';
import PuzzleEditPanel from './PuzzleEditPanel';
import HintAddPanel from './HintAddPanel';

import { ControlPanelProps, ControlPanelPanelType } from './types';
import { PuzzleType } from '../types';
import {Status, Yami} from 'generated/globalTypes';

const getInitialPanel = (puzzle: PuzzleType): ControlPanelPanelType => {
  if (puzzle.status === Status.UNDERGOING) {
    if (puzzle.yami === Yami.LONGTERM) return ControlPanelPanelType.MEMO_EDIT;
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
      <PuzzleEditPanel
        puzzleId={puzzle.id}
        yami={puzzle.yami}
        genre={puzzle.genre}
        grotesque={puzzle.grotesque}
        status={puzzle.status}
        dazedOn={puzzle.dazedOn}
        show={currentPanel === ControlPanelPanelType.PUZZLE_EDIT}
      />
    </Flex>
  );
};

export default ControlPanel;
