import React from 'react';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import * as addReplayReducer from 'reducers/addReplay';

import { FormattedMessage } from 'react-intl';
import commonMessages from 'messages/common';

import { Flex, Box } from 'components/General';
import ButtonSelect from 'components/ButtonSelect';
import KeywordQuestionBox from '../shared/KeywordQuestionBox';
import MilestoneLabel from './MilestoneLabel';

import {
  StateType,
  ReplayDialogueType,
  ActionContentType,
} from 'reducers/types';
import { DependencyManipulateProps } from './types';

const DependencyManipulate = ({
  dialogue,
  milestones,
  updateDialogue,
}: DependencyManipulateProps) => {
  return (
    <Flex width={1} mb={2} flexWrap="wrap">
      <KeywordQuestionBox prefix={`Q${dialogue.qno}`}>
        {dialogue.question}
      </KeywordQuestionBox>
      <KeywordQuestionBox prefix={`A${dialogue.qno}`}>
        {dialogue.answer}
      </KeywordQuestionBox>
      <Flex width={1} flexWrap="wrap" alignItems="center">
        <Box mr={2}>Milestones</Box>
        <ButtonSelect
          value={
            dialogue.milestones.length > 0 ? dialogue.milestones[0] : undefined
          }
          options={[
            {
              key: 'none',
              value: undefined,
              label: <FormattedMessage {...commonMessages.none} />,
            },
            ...milestones.map(milestone => ({
              key: milestone.handle,
              value: milestone.handle,
              label: <MilestoneLabel milestone={milestone} />,
            })),
          ]}
          onChange={option => {
            updateDialogue(prev => ({
              ...prev,
              milestones: option.value ? [option.value] : [],
            }));
          }}
        />
      </Flex>
      <Flex width={1} flexWrap="wrap" alignItems="center">
        <Box mr={2}>Dependencies</Box>
        <ButtonSelect
          value={dialogue.dependency}
          options={[
            {
              key: 'none',
              value: '',
              label: <FormattedMessage {...commonMessages.none} />,
            },
            ...milestones.map(milestone => ({
              key: milestone.handle,
              value: milestone.handle,
              label: <MilestoneLabel milestone={milestone} />,
            })),
          ]}
          onChange={option => {
            updateDialogue(prev => ({
              ...prev,
              dependency: option.value || '',
            }));
          }}
        />
      </Flex>
    </Flex>
  );
};

const dialogueSelector = createSelector(
  (state: StateType) => addReplayReducer.rootSelector(state).replayDialogues,
  (
    _state: StateType,
    ownProps: Pick<DependencyManipulateProps, 'dialogueId'>,
  ) => ownProps.dialogueId,
  (dialogues, dialogueId) =>
    dialogues.find(
      dialogue => dialogue.id === dialogueId,
    ) as ReplayDialogueType,
);

const mapStateToProps = (
  state: StateType,
  ownProps: Pick<DependencyManipulateProps, 'dialogueId'>,
) => ({
  dialogue: dialogueSelector(state, ownProps),
  milestones: addReplayReducer.rootSelector(state).milestones,
});

const mapDispatchToProps = (
  dispatch: (action: ActionContentType) => void,
  ownProps: Pick<DependencyManipulateProps, 'dialogueId'>,
) => ({
  updateDialogue: (
    update: (dialogue: ReplayDialogueType) => ReplayDialogueType,
  ) =>
    dispatch(
      addReplayReducer.actions.replayDialogues.update(null, prev =>
        prev.id === ownProps.dialogueId ? update(prev) : prev,
      ),
    ),
});

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRedux(DependencyManipulate);
