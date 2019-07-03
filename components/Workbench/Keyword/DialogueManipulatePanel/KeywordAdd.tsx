import React, { useState, useRef } from 'react';

import { connect } from 'react-redux';
import * as addReplayReducer from 'reducers/addReplay';

import KeywordBox from '../shared/KeywordBox';
import { ButtonTransparent, Input, Img } from 'components/General';
import tickIcon from 'svgs/tick.svg';
import crossIcon from 'svgs/cross.svg';

import { KeywordType } from '../shared/types';
import { ActionContentType } from 'reducers/types';
import { KeywordAddProps } from './types';

const KeywordAdd = ({ iAddKeyword, dialogueId }: KeywordAddProps) => {
  const [edit, setEdit] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null!);

  return edit ? (
    <KeywordBox keywordType={KeywordType.DEFAULT}>
      <Input ref={inputRef} />
      <ButtonTransparent
        onClick={() => {
          setEdit(false);
          const keywordName = inputRef.current.value;
          if (keywordName.trim() === '') return;
          iAddKeyword(keywordName, dialogueId);
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
      <Input ref={inputRef} display="none" />
      <ButtonTransparent
        height="1.2em"
        onClick={() => {
          setEdit(true);
          inputRef.current.value = '';
        }}
      >
        +
      </ButtonTransparent>
    </KeywordBox>
  );
};

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  iAddKeyword: (keyword: string, dialogueId: number) =>
    dispatch(addReplayReducer.actions.iAddKeyword(keyword, dialogueId)),
});

const withRedux = connect(
  null,
  mapDispatchToProps,
);

export default withRedux(KeywordAdd);
