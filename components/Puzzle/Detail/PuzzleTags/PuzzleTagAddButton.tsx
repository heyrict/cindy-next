import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { upsertItem } from 'common/update';

import { Mutation } from 'react-apollo';
import { ADD_PUZZLE_TAG_MUTATION } from 'graphql/Mutations/Tag';
import { PUZZLE_PAGE_TAGS_QUERY } from 'graphql/Queries/Tag';

import { ButtonTransparent, Img } from 'components/General';
import { PuzzleTagBubbleBox } from './shared';
import PuzzleTagInput from './PuzzleTagInput';
import tickIcon from 'svgs/tick.svg';
import crossIcon from 'svgs/cross.svg';
import plusPlainIcon from 'svgs/plusPlain.svg';

import {
  AddPuzzleTagMutation,
  AddPuzzleTagMutationVariables,
} from 'graphql/Mutations/generated/AddPuzzleTagMutation';
import { PuzzleTagAddButtonProps } from './types';
import { ApolloError } from 'apollo-client/errors/ApolloError';
import {
  PuzzlePageTagsQuery,
  PuzzlePageTagsQueryVariables,
} from 'graphql/Queries/generated/PuzzlePageTagsQuery';

const PuzzleTagAddButton = ({ puzzleId }: PuzzleTagAddButtonProps) => {
  const [edit, setEdit] = useState(false);
  const inputRef = useRef<PuzzleTagInput>(null);

  return (
    <PuzzleTagBubbleBox>
      {edit ? (
        <React.Fragment>
          <PuzzleTagInput ref={inputRef} />
          <Mutation<AddPuzzleTagMutation, AddPuzzleTagMutationVariables>
            mutation={ADD_PUZZLE_TAG_MUTATION}
            update={(proxy, { data }) => {
              if (!data || !data.insert_sui_hei_puzzle_tag) return;
              const newPuzzleTag = data.insert_sui_hei_puzzle_tag.returning;
              const queryData = proxy.readQuery<
                PuzzlePageTagsQuery,
                PuzzlePageTagsQueryVariables
              >({
                query: PUZZLE_PAGE_TAGS_QUERY,
                variables: { puzzleId },
              });
              if (newPuzzleTag.length === 0) return;
              if (!queryData) return;
              const { sui_hei_puzzle_tag } = queryData;
              proxy.writeQuery<
                PuzzlePageTagsQuery,
                PuzzlePageTagsQueryVariables
              >({
                query: PUZZLE_PAGE_TAGS_QUERY,
                variables: { puzzleId },
                data: {
                  ...queryData,
                  sui_hei_puzzle_tag: upsertItem(
                    sui_hei_puzzle_tag,
                    newPuzzleTag[0],
                  ),
                },
              });
            }}
          >
            {addPuzzleTag => (
              <ButtonTransparent
                p={1}
                onClick={() => {
                  if (!inputRef.current) return;
                  const tagName = inputRef.current.getValue();
                  if (!tagName) return;

                  addPuzzleTag({
                    variables: {
                      puzzleId,
                      tagName,
                    },
                    optimisticResponse: {
                      insert_sui_hei_puzzle_tag: {
                        __typename: 'sui_hei_puzzle_tag_mutation_response',
                        returning: [
                          {
                            __typename: 'sui_hei_puzzle_tag',
                            id: -1,
                            sui_hei_tag: {
                              __typename: 'sui_hei_tag',
                              id: -1,
                              name: tagName,
                              created: new Date().toISOString(),
                            },
                            sui_hei_user: {
                              __typename: 'sui_hei_user',
                              id: -1,
                              nickname: '...',
                              username: '...',
                              sui_hei_current_useraward: null,
                            },
                          },
                        ],
                      },
                    },
                  })
                    .then(res => {
                      if (!res) return;
                      const { errors } = res;
                      if (errors) {
                        toast.error(JSON.stringify(errors));
                        setEdit(true);
                      }
                    })
                    .catch((error: ApolloError) => {
                      toast.error(error.message);
                      setEdit(true);
                    });
                  setEdit(false);
                }}
              >
                <Img height="0.8em" alt="OK" src={tickIcon} />
              </ButtonTransparent>
            )}
          </Mutation>
          <ButtonTransparent p={1} onClick={() => setEdit(false)}>
            <Img height="0.8em" alt="Cancel" src={crossIcon} />
          </ButtonTransparent>
        </React.Fragment>
      ) : (
        <ButtonTransparent p={1} onClick={() => setEdit(true)}>
          <Img height="0.8em" alt="Cancel" src={plusPlainIcon} />
        </ButtonTransparent>
      )}
    </PuzzleTagBubbleBox>
  );
};

export default PuzzleTagAddButton;
