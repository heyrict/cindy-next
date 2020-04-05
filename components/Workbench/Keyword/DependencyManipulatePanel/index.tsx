import React from 'react';

import DependencyManipulate from './DependencyManipulate';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import * as addReplayReducer from 'reducers/addReplay';

import { DependencyManipulatePanelProps } from './types';
import { StateType } from 'reducers/types';

const DependencyManipulatePanel = ({
  replayDialogueIds,
}: DependencyManipulatePanelProps) => {
  return (
    <React.Fragment>
      {replayDialogueIds.map(dialogueId => (
        <DependencyManipulate key={dialogueId} dialogueId={dialogueId} />
      ))}
    </React.Fragment>
  );
};

const dialogueIdsSelector = createSelector(
  (state: StateType) => addReplayReducer.rootSelector(state).replayDialogues,
  dialogues =>
    dialogues
      // TODO Add option to filter good or true dialogues
      //.filter(dialogue => dialogue.good || dialogue.true)
      .map(dialogue => dialogue.id),
);

const mapStateToProps = (state: StateType) => ({
  replayDialogueIds: dialogueIdsSelector(state),
});

const withRedux = connect(mapStateToProps);

export default withRedux(DependencyManipulatePanel);
