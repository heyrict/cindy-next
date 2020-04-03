import React, { useRef, useEffect } from 'react';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import * as addReplayReducer from 'reducers/addReplay';

import { Input, ButtonTransparent, Img } from 'components/General';
import KeywordBox from 'components/Workbench/Keyword/shared/KeywordBox';
import { KeywordType } from 'components/Workbench/Keyword/shared/types';
import tickIcon from 'svgs/tick.svg';
import crossIcon from 'svgs/cross.svg';

import {
  KeywordsEditProps,
  DialogueManipulateProps,
  DialogueManipulateModeType,
} from './types';
import {
  StateType,
  ReplayDialogueType,
  ActionContentType,
} from 'reducers/types';

const SPLIT_RE = new RegExp('[ ,　、]+');

const KeywordsEdit = ({
  dialogueId,
  keywordsString,
  setMode,
  setKeywords,
}: KeywordsEditProps) => {
  const inputRef = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    inputRef.current.value = keywordsString;
  }, [keywordsString]);

  return (
    <KeywordBox keywordType={KeywordType.DEFAULT}>
      <Input ref={inputRef} />
      <ButtonTransparent
        onClick={() => {
          setMode(DialogueManipulateModeType.NORMAL);
          const keywordsString = inputRef.current.value;
          setKeywords(dialogueId, keywordsString);
        }}
        height="1.2em"
      >
        <Img height="1em" src={tickIcon} alt="ok" />
      </ButtonTransparent>
      <ButtonTransparent
        onClick={() => setMode(DialogueManipulateModeType.NORMAL)}
        height="1.2em"
      >
        <Img height="1em" src={crossIcon} alt="cancel" />
      </ButtonTransparent>
    </KeywordBox>
  );
};

const keywordsSelector = createSelector(
  (state: StateType) => addReplayReducer.rootSelector(state).replayDialogues,
  (_state: StateType, ownProps: Pick<DialogueManipulateProps, 'dialogueId'>) =>
    ownProps.dialogueId,
  (dialogues, dialogueId) =>
    (dialogues.find(
      dialogue => dialogue.id === dialogueId,
    ) as ReplayDialogueType).question_keywords
      .map(kw => kw.name)
      .join('、'),
);

const mapStateToProps = (
  state: StateType,
  ownProps: Pick<DialogueManipulateProps, 'dialogueId'>,
) => ({
  keywordsString: keywordsSelector(state, ownProps),
});

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  setKeywords: (dialogueId: number, keywordsString: string) =>
    dispatch(
      addReplayReducer.actions.replayDialogues.update(null, prev =>
        prev.id === dialogueId
          ? {
              ...prev,
              question_keywords: keywordsString
                .split(SPLIT_RE)
                .filter(v => v && v.length != 0)
                .map(name => ({ name, tfidf_index: 1 })),
            }
          : prev,
      ),
    ),
});

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRedux(KeywordsEdit);
