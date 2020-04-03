import React, { useState, useRef } from 'react';

import { connect } from 'react-redux';
import * as addReplayReducer from 'reducers/addReplay';

import { ButtonTransparent, Img, Input, Box } from 'components/General';
import KeywordBox from '../shared/KeywordBox';
import pencilIcon from 'svgs/pencil.svg';
import tickIcon from 'svgs/tick.svg';
import crossIcon from 'svgs/cross.svg';
import dustbinIcon from 'svgs/dustbin.svg';

import { KeywordType } from '../shared/types';
import { KeywordManipulateProps } from './types';
import { ActionContentType } from 'reducers/types';

const KeywordManipulate = ({
  dialogueId,
  keyword,
  keywordIndex,
  iRenameKeyword,
  iRemoveKeyword,
}: KeywordManipulateProps) => {
  const [edit, setEdit] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null!);

  return edit ? (
    <KeywordBox keywordType={KeywordType.DEFAULT}>
      <Input ref={inputRef} />
      <ButtonTransparent
        onClick={() => {
          setEdit(false);
          const renameTo = inputRef.current.value;
          if (renameTo === keyword.name || renameTo.trim() === '') return;
          iRenameKeyword(keywordIndex, renameTo, dialogueId);
        }}
        height="1.2em"
      >
        <Img height="1em" src={tickIcon} alt="edit" />
      </ButtonTransparent>
      <ButtonTransparent onClick={() => setEdit(false)} height="1.2em">
        <Img height="1em" src={crossIcon} alt="edit" />
      </ButtonTransparent>
    </KeywordBox>
  ) : (
    <KeywordBox keywordType={KeywordType.DEFAULT}>
      <Input display="none" ref={inputRef} />
      <Box px={1}>{keyword.name}</Box>
      <ButtonTransparent
        height="1.2em"
        onClick={() => {
          setEdit(true);
          inputRef.current.value = keyword.name;
        }}
      >
        <Img height="1em" src={pencilIcon} alt="edit" />
      </ButtonTransparent>
      <ButtonTransparent
        height="1.2em"
        onClick={() => iRemoveKeyword(keywordIndex, dialogueId)}
      >
        <Img height="1em" src={dustbinIcon} alt="delete" />
      </ButtonTransparent>
    </KeywordBox>
  );
};

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  iRemoveKeyword: (index: number, dialogueId: number) =>
    dispatch(addReplayReducer.actions.iRemoveKeyword(index, dialogueId)),
  iRenameKeyword: (index: number, renameTo: string, dialogueId: number) =>
    dispatch(
      addReplayReducer.actions.iRenameKeyword(index, renameTo, dialogueId),
    ),
});

const withRedux = connect(
  null,
  mapDispatchToProps,
);

export default withRedux(KeywordManipulate);
