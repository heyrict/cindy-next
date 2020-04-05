import React from 'react';

import DialogueManipulate from './DialogueManipulate';
import DialogueAdd from './DialogueAdd';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import * as addReplayReducer from 'reducers/addReplay';

import { DialogueManipulatePanelProps } from './types';
import { StateType } from 'reducers/types';

const DialogueManipulatePanel = ({
  replayDialogueIds,
}: DialogueManipulatePanelProps) => {
  return (
    <React.Fragment>
      {replayDialogueIds.map(dialogueId => (
        <DialogueManipulate key={dialogueId} dialogueId={dialogueId} />
      ))}
      <DialogueAdd />
    </React.Fragment>
  );
};

const dialogueIdsSelector = createSelector(
  (state: StateType) => addReplayReducer.rootSelector(state).replayDialogues,
  dialogues => dialogues.map(dialogue => dialogue.id),
);

const mapStateToProps = (state: StateType) => ({
  replayDialogueIds: dialogueIdsSelector(state),
});

const withRedux = connect(mapStateToProps);

export default withRedux(DialogueManipulatePanel);
