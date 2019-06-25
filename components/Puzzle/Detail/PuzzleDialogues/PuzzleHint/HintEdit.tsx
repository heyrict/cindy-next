import React, { useState, useEffect, useRef } from 'react';

import { Mutation } from 'react-apollo';
import { EDIT_HINT_MUTATION } from 'graphql/Mutations/Hint';

import { Flex, ButtonTransparent, Img } from 'components/General';
import PreviewEditor from 'components/PreviewEditor';
import crossIcon from 'svgs/cross.svg';
import tickIcon from 'svgs/tick.svg';

import { HintEditProps } from './types';
import {
  EditHintMutation,
  EditHintMutationVariables,
} from 'graphql/Mutations/generated/EditHintMutation';

const HintEdit = ({ hint, setEdit }: HintEditProps) => {
  const [text, setText] = useState(hint.content);
  const editorRef = useRef<PreviewEditor>(null);
  useEffect(() => {
    setText(hint.content);
  }, [hint.content]);

  return (
    <Mutation<EditHintMutation, EditHintMutationVariables>
      mutation={EDIT_HINT_MUTATION}
    >
      {editHint => (
        <React.Fragment>
          <PreviewEditor initialValue={text} ref={editorRef} />
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
                      update_sui_hei_hint: {
                        __typename: 'sui_hei_hint_mutation_response',
                        returning: [
                          {
                            __typename: 'sui_hei_hint',
                            ...hint,
                            content: newHint,
                          },
                        ],
                      },
                    },
                  })
                    .then(result => {
                      if (!result) return;
                      const { errors } = result;
                      if (errors) {
                        console.log(errors);
                        setEdit(true);
                        setText(hint.content);
                      }
                    })
                    .catch(error => {
                      console.log(error);
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
