import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

import { useMutation } from '@apollo/client';
import { EDIT_HINT_MUTATION } from 'graphql/Mutations/Hint';

import { Flex, ButtonTransparent, Img } from 'components/General';
import { LegacyEditor } from 'components/PreviewEditor';

import crossIcon from 'svgs/cross.svg';
import tickIcon from 'svgs/tick.svg';

import { HintEditProps } from './types';
import {
  EditHintMutation,
  EditHintMutationVariables,
} from 'graphql/Mutations/generated/EditHintMutation';

const HintEdit = ({ hint, setEdit }: HintEditProps) => {
  const [text, setText] = useState(hint.content);
  const editorRef = useRef<LegacyEditor>(null);
  useEffect(() => {
    setText(hint.content);
  }, [hint.content]);

  const [editHint] = useMutation<EditHintMutation, EditHintMutationVariables>(
    EDIT_HINT_MUTATION,
    {
      onError: error => {
        toast.error(`${error.name}: ${error.message}`);
        setEdit(true);
        setText(hint.content);
      },
    },
  );

  return (
    <>
      <LegacyEditor initialValue={text} ref={editorRef} />
      <Flex width={1} borderWidth="3px" borderColor="red.7" borderStyle="solid">
        <ButtonTransparent
          width={1}
          p={1}
          borderLeft={0}
          borderTop={0}
          borderRight="3px"
          borderBottom={0}
          borderColor="red.7"
          borderStyle="solid"
          onClick={() => setEdit(false)}
        >
          <Img size="xs" src={crossIcon} />
        </ButtonTransparent>
        <ButtonTransparent
          width={1}
          p={1}
          onClick={() => {
            if (!editorRef.current) return;
            const newHint = editorRef.current.getText().trim();
            if (newHint === hint.content.trim()) {
              setEdit(false);
            } else {
              editHint({
                variables: {
                  hintId: hint.id,
                  content: newHint,
                },
                optimisticResponse: {
                  updateHint: {
                    ...hint,
                    content: newHint,
                  },
                },
              });
              setEdit(false);
            }
          }}
        >
          <Img size="xs" src={tickIcon} />
        </ButtonTransparent>
      </Flex>
    </>
  );
};

export default HintEdit;
