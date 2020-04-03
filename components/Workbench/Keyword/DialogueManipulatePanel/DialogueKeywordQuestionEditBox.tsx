import React, { useState, useRef, useEffect } from 'react';

import { Input, ButtonTransparent, Img } from 'components/General';
import { DialogueKeywordQuestionEditBoxProps } from './types';
import KeywordQuestionBox from '../shared/KeywordQuestionBox';
import tickIcon from 'svgs/tick.svg';
import crossIcon from 'svgs/cross.svg';
import pencilIcon from 'svgs/pencil.svg';

const DialogueKeywordQuestionEditBox = ({
  prefix,
  content,
  onSubmit,
  children,
}: DialogueKeywordQuestionEditBoxProps) => {
  const [edit, setEdit] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    inputRef.current.value = content;
  }, [content]);

  return edit ? (
    <KeywordQuestionBox prefix={prefix}>
      <Input ref={inputRef} />
      <ButtonTransparent
        onClick={() => {
          setEdit(false);
          const newContent = inputRef.current.value;
          onSubmit(newContent);
        }}
      >
        <Img height="1em" src={tickIcon} alt="ok" />
      </ButtonTransparent>
      <ButtonTransparent onClick={() => setEdit(false)} height="1.2em">
        <Img height="1em" src={crossIcon} alt="cancel" />
      </ButtonTransparent>
      {children}
    </KeywordQuestionBox>
  ) : (
    <KeywordQuestionBox prefix={prefix}>
      <Input hidden ref={inputRef} />
      <span>
        {content}
        <ButtonTransparent
          onClick={() => {
            setEdit(true);
          }}
        >
          <Img height="1em" src={pencilIcon} alt="edit" />
        </ButtonTransparent>
      </span>
      {children}
    </KeywordQuestionBox>
  );
};

export default DialogueKeywordQuestionEditBox;
