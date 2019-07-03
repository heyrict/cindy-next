import React from 'react';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import * as addReplayReducer from 'reducers/addReplay';

import { Flex } from 'components/General';
import KeywordManipulate from './KeywordManipulate';
import KeywordAdd from './KeywordAdd';
import KeywordQuestionBox from '../shared/KeywordQuestionBox';

import { StateType, ReplayDialogueType } from 'reducers/types';
import { DialogueManipulateProps } from './types';

const DialogueManipulate = ({ dialogue }: DialogueManipulateProps) => (
  <Flex width={1} mb={2} flexWrap="wrap">
    <KeywordQuestionBox qno={dialogue.qno}>
      {dialogue.question}
    </KeywordQuestionBox>
    {dialogue.question_keywords.map((keyword, index) => (
      <KeywordManipulate
        key={`question-merge-keyword-${dialogue.id}-${index}-${keyword.name}`}
        dialogueId={dialogue.id}
        keyword={keyword}
        keywordIndex={index}
      />
    ))}
    <KeywordAdd dialogueId={dialogue.id} />
  </Flex>
);

const dialogueSelector = createSelector(
  (state: StateType) => addReplayReducer.rootSelector(state).replayDialogues,
  (_state: StateType, ownProps: DialogueManipulateProps) => ownProps.dialogueId,
  (dialogues, dialogueId) =>
    dialogues.find(
      dialogue => dialogue.id === dialogueId,
    ) as ReplayDialogueType,
);

const mapStateToProps = (
  state: StateType,
  ownProps: DialogueManipulateProps,
) => ({
  dialogue: dialogueSelector(state, ownProps),
});

const withRedux = connect(mapStateToProps);

export default withRedux(DialogueManipulate);
