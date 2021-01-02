import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

import { Mutation } from '@apollo/react-components';
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
import { ApolloError } from '@apollo/client';

const HintEdit = ({ hint, setEdit }: HintEditProps) => {
  const [text, setText] = useState(hint.content);
  const editorRef = useRef<LegacyEditor>(null);
  useEffect(() => {
    setText(hint.content);
  }, [hint.content]);

  return (
    <Mutation<EditHintMutation, EditHintMutationVariables>
      mutation={EDIT_HINT_MUTATION}
    >
      {editHint => (
        <React.Fragment>
          <LegacyEditor initialValue={text} ref={editorRef} />
          <Flex
            width={1}
            borderWidth="3px"
            borderColor="red.7"
            borderStyle="solid"
          >
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
                  })
                    .then(result => {
                      if (!result) return;
                      const { errors } = result;
                      if (errors) {
                        toast.error(JSON.stringify(errors));
                        setEdit(true);
                        setText(hint.content);
                      }
                    })
                    .catch((error: ApolloError) => {
                      toast.error(error.message);
                      setEdit(true);
                      setText(hint.content);
                    });
                  setEdit(false);
                }
              }}
            >
              <Img size="xs" src={tickIcon} />
            </ButtonTransparent>
          </Flex>
        </React.Fragment>
      )}
    </Mutation>
  );
};

export default HintEdit;
