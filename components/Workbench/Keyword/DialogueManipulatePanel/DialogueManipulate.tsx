import React, { useState } from 'react';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import * as addReplayReducer from 'reducers/addReplay';

import { FormattedMessage } from 'react-intl';
import puzzleMessages from 'messages/components/puzzle';

import { Flex, ButtonTransparent, Img, Box } from 'components/General';
import KeywordManipulate from './KeywordManipulate';
import KeywordAdd from './KeywordAdd';
import KeywordsEdit from './KeywordsEdit';
import KeywordQuestionEditBox from './DialogueKeywordQuestionEditBox';
import tickIcon from 'svgs/tick.svg';
import crossIcon from 'svgs/cross.svg';
import pencilIcon from 'svgs/pencil.svg';
import dustbinIcon from 'svgs/dustbin.svg';

import {
  StateType,
  ReplayDialogueType,
  ActionContentType,
} from 'reducers/types';
import { DialogueManipulateProps, DialogueManipulateModeType } from './types';
import KeywordBox from 'components/Workbench/Keyword/shared/KeywordBox';
import { KeywordType } from 'components/Workbench/Keyword/shared/types';

const NUM_RETAIN = 4;

const DialogueManipulate = ({
  dialogue,
  updateDialogue,
  deleteDialogue,
  iRemoveKeywordByThresh,
}: DialogueManipulateProps) => {
  let [mode, setMode] = useState(DialogueManipulateModeType.NORMAL);

  const can_filter = dialogue.question_keywords.length > NUM_RETAIN;
  const thresh = !can_filter
    ? null
    : [...dialogue.question_keywords].sort(kw => 1 - kw.tfidf_index)[
        NUM_RETAIN - 1
      ].tfidf_index;

  const should_show_add = mode === DialogueManipulateModeType.NORMAL;
  const should_show_edit = mode === DialogueManipulateModeType.NORMAL;
  const should_show_auto =
    can_filter && mode === DialogueManipulateModeType.NORMAL;
  const should_show_auto_control = mode === DialogueManipulateModeType.TFIDF;

  return (
    <Flex width={1} mb={2} flexWrap="wrap">
      <KeywordQuestionEditBox
        prefix={`Q${dialogue.qno}`}
        content={dialogue.question}
        onSubmit={text => {
          updateDialogue(dialogue.id, dialogue => ({
            ...dialogue,
            question: text,
          }));
        }}
      >
        <ButtonTransparent
          ml="3"
          onClick={() => {
            deleteDialogue(dialogue.id);
          }}
        >
          <Img height="1em" src={dustbinIcon} alt="delete" />
        </ButtonTransparent>
      </KeywordQuestionEditBox>
      <KeywordQuestionEditBox
        prefix={`A${dialogue.qno}`}
        content={dialogue.answer}
        onSubmit={text => {
          updateDialogue(dialogue.id, dialogue => ({
            ...dialogue,
            answer: text,
          }));
        }}
      >
        <Box display="inline-box" bg={dialogue.good ? 'lime.3' : 'orange.1'} borderRadius={1} mx={1}>
          <ButtonTransparent
            onClick={() => {
              updateDialogue(dialogue.id, dialogue => ({
                ...dialogue,
                good: !dialogue.good,
              }));
            }}
          >
            <FormattedMessage {...puzzleMessages.dialogue_good} />
          </ButtonTransparent>
        </Box>
        <Box display="inline-box" bg={dialogue.true ? 'lime.3' : 'orange.1'} borderRadius={1} mx={1}>
          <ButtonTransparent
            onClick={() => {
              updateDialogue(dialogue.id, dialogue => ({
                ...dialogue,
                true: !dialogue.true,
              }));
            }}
          >
            <FormattedMessage {...puzzleMessages.dialogue_true} />
          </ButtonTransparent>
        </Box>
      </KeywordQuestionEditBox>
      {mode === DialogueManipulateModeType.EDIT ? (
        <KeywordsEdit dialogueId={dialogue.id} setMode={setMode} />
      ) : mode === DialogueManipulateModeType.NORMAL ? (
        dialogue.question_keywords.map((keyword, index) => (
          <KeywordManipulate
            key={`question-merge-keyword-${dialogue.id}-${index}-${keyword.name}`}
            dialogueId={dialogue.id}
            keyword={keyword}
            keywordIndex={index}
          />
        ))
      ) : (
        dialogue.question_keywords.map((keyword, index) => (
          <KeywordManipulate
            key={`question-merge-keyword-${dialogue.id}-${index}-${keyword.name}`}
            dialogueId={dialogue.id}
            keyword={keyword}
            keywordIndex={index}
            keywordType={
              keyword.tfidf_index >= thresh!
                ? KeywordType.DEFAULT
                : KeywordType.TO_DELETE
            }
          />
        ))
      )}
      {should_show_add && <KeywordAdd dialogueId={dialogue.id} />}
      {should_show_auto && (
        <KeywordBox keywordType={KeywordType.DEFAULT}>
          <ButtonTransparent
            onClick={() => {
              setMode(DialogueManipulateModeType.TFIDF);
            }}
            height="1.2em"
          >
            Auto
          </ButtonTransparent>
        </KeywordBox>
      )}
      {should_show_auto_control && (
        <>
          <KeywordBox keywordType={KeywordType.DEFAULT}>
            <ButtonTransparent
              onClick={() => {
                setMode(DialogueManipulateModeType.NORMAL);
                iRemoveKeywordByThresh(thresh!, dialogue.id);
              }}
              height="1.2em"
            >
              <Img height="1em" src={tickIcon} alt="ok" />
            </ButtonTransparent>
          </KeywordBox>
          <KeywordBox keywordType={KeywordType.DEFAULT}>
            <ButtonTransparent
              onClick={() => {
                setMode(DialogueManipulateModeType.NORMAL);
              }}
              height="1.2em"
            >
              <Img height="1em" src={crossIcon} alt="cancel" />
            </ButtonTransparent>
          </KeywordBox>
        </>
      )}
      {should_show_edit && (
        <KeywordBox keywordType={KeywordType.DEFAULT}>
          <ButtonTransparent
            onClick={() => {
              setMode(DialogueManipulateModeType.EDIT);
            }}
            height="1.2em"
          >
            <Img height="1em" src={pencilIcon} alt="edit" />
          </ButtonTransparent>
        </KeywordBox>
      )}
    </Flex>
  );
};

const dialogueSelector = createSelector(
  (state: StateType) => addReplayReducer.rootSelector(state).replayDialogues,
  (_state: StateType, ownProps: Pick<DialogueManipulateProps, 'dialogueId'>) =>
    ownProps.dialogueId,
  (dialogues, dialogueId) =>
    dialogues.find(
      dialogue => dialogue.id === dialogueId,
    ) as ReplayDialogueType,
);

const mapStateToProps = (
  state: StateType,
  ownProps: Pick<DialogueManipulateProps, 'dialogueId'>,
) => ({
  dialogue: dialogueSelector(state, ownProps),
});

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  iRemoveKeywordByThresh: (thresh: number, dialogueId: number) =>
    dispatch(
      addReplayReducer.actions.iRemoveKeywordBy(
        kw => kw.tfidf_index >= thresh,
        dialogueId,
      ),
    ),
  updateDialogue: (
    dialogueId: number,
    update: (dialogue: ReplayDialogueType) => ReplayDialogueType,
  ) =>
    dispatch(
      addReplayReducer.actions.replayDialogues.update(null, prev =>
        prev.id === dialogueId ? update(prev) : prev,
      ),
    ),
  deleteDialogue: (dialogueId: number) =>
    dispatch(
      addReplayReducer.actions.replayDialogues.deleteWhere(item =>
        item.id === dialogueId ? true : false,
      ),
    ),
});

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRedux(DialogueManipulate);
