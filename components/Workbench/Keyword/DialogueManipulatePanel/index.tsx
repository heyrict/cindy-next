import React from 'react';

import Box from 'components/General/Box';
import DialogueManipulate from './DialogueManipulate';
import DialogueAdd from './DialogueAdd';
import DialogueFilter from './DialogueFilter';

import { connect } from 'react-redux';

import { DialogueManipulatePanelProps } from './types';
import { StateType } from 'reducers/types';
import { dialogueIdsSelector } from './selectors';

const DialogueManipulatePanel = ({
  replayDialogueIds,
}: DialogueManipulatePanelProps) => {
  return (
    <React.Fragment>
      <Box width={1} my={2} mx={1}>
        <DialogueFilter />
      </Box>
      {replayDialogueIds.map(dialogueId => (
        <DialogueManipulate key={dialogueId} dialogueId={dialogueId} />
      ))}
      <DialogueAdd />
    </React.Fragment>
  );
};

const mapStateToProps = (state: StateType) => ({
  replayDialogueIds: dialogueIdsSelector(state),
});

const withRedux = connect(mapStateToProps);

export default withRedux(DialogueManipulatePanel);
