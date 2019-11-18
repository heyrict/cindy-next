import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';

import { Mutation } from '@apollo/react-components';
import {
  ADD_PUZZLE_TAG_MUTATION,
  ADD_PUZZLE_TAG_BY_PK_MUTATION,
} from 'graphql/Mutations/Tag';
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
import {
  AddPuzzleTagByPkMutation,
  AddPuzzleTagByPkMutationVariables,
} from 'graphql/Mutations/generated/AddPuzzleTagByPkMutation';

const PuzzleTagAddButton = ({ puzzleId }: PuzzleTagAddButtonProps) => {
  const [edit, setEdit] = useState(false);
  const inputRef = useRef<PuzzleTagInput>(null);

  return (
    <PuzzleTagBubbleBox>
      {edit ? (
        <React.Fragment>
          <PuzzleTagInput ref={inputRef} />
          <Mutation<AddPuzzleTagByPkMutation, AddPuzzleTagByPkMutationVariables>
            mutation={ADD_PUZZLE_TAG_BY_PK_MUTATION}
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
                  sui_hei_puzzle_tag: [...sui_hei_puzzle_tag, newPuzzleTag[0]],
                },
              });
            }}
          >
            {addPuzzleTagByPk => (
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
                      sui_hei_puzzle_tag: [
                        ...sui_hei_puzzle_tag,
                        newPuzzleTag[0],
                      ],
                    },
                  });
                }}
              >
                {addPuzzleTag => (
                  <ButtonTransparent
                    p={1}
                    onClick={() => {
                      if (!inputRef.current) return;
                      const tag = inputRef.current.getValue();
                      if (!tag) return;

                      if (tag.__isNew__) {
                        addPuzzleTag({
                          variables: {
                            puzzleId,
                            newTagData: {
                              data: {
                                name: tag.value,
                              },
                            },
                          },
                          optimisticResponse: {
                            insert_sui_hei_puzzle_tag: {
                              __typename:
                                'sui_hei_puzzle_tag_mutation_response',
                              returning: [
                                {
                                  __typename: 'sui_hei_puzzle_tag',
                                  id: -1,
                                  sui_hei_tag: {
                                    __typename: 'sui_hei_tag',
                                    id: -1,
                                    name: tag.value,
                                    created: new Date().toISOString(),
                                  },
                                  sui_hei_user: {
                                    __typename: 'sui_hei_user',
                                    id: -1,
                                    icon: null,
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
                      } else {
                        addPuzzleTagByPk({
                          variables: {
                            puzzleId,
                            tagId: tag.id,
                          },
                          optimisticResponse: {
                            insert_sui_hei_puzzle_tag: {
                              __typename:
                                'sui_hei_puzzle_tag_mutation_response',
                              returning: [
                                {
                                  __typename: 'sui_hei_puzzle_tag',
                                  id: -1,
                                  sui_hei_tag: {
                                    __typename: 'sui_hei_tag',
                                    id: tag.id,
                                    name: tag.value,
                                    created:
                                      tag.created || new Date().toISOString(),
                                  },
                                  sui_hei_user: {
                                    __typename: 'sui_hei_user',
                                    id: -1,
                                    icon: null,
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
                      }
                      setEdit(false);
                    }}
                  >
                    <Img height="0.8em" alt="OK" src={tickIcon} />
                  </ButtonTransparent>
                )}
              </Mutation>
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
