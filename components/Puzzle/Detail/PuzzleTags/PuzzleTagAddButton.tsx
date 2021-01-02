import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';

import { ApolloError, useMutation } from '@apollo/client';
import {
  ADD_PUZZLE_TAG_MUTATION,
  ADD_PUZZLE_TAG_WITH_TAG_MUTATION,
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
import {
  PuzzlePageTagsQuery,
  PuzzlePageTagsQueryVariables,
} from 'graphql/Queries/generated/PuzzlePageTagsQuery';
import {
  AddPuzzleTagWithTagMutation,
  AddPuzzleTagWithTagMutationVariables,
} from 'graphql/Mutations/generated/AddPuzzleTagWithTagMutation';

const PuzzleTagAddButton = ({ puzzleId }: PuzzleTagAddButtonProps) => {
  const [edit, setEdit] = useState(false);
  const inputRef = useRef<PuzzleTagInput>(null);

  const [addPuzzleTag] = useMutation<
    AddPuzzleTagMutation,
    AddPuzzleTagMutationVariables
  >(ADD_PUZZLE_TAG_MUTATION, {
    update: (proxy, { data }) => {
      if (!data || !data.createPuzzleTag) return;
      const newPuzzleTag = data.createPuzzleTag;
      const queryData = proxy.readQuery<
        PuzzlePageTagsQuery,
        PuzzlePageTagsQueryVariables
      >({
        query: PUZZLE_PAGE_TAGS_QUERY,
        variables: { puzzleId },
      });
      if (!queryData) return;
      const { puzzleTags } = queryData;
      proxy.writeQuery<PuzzlePageTagsQuery, PuzzlePageTagsQueryVariables>({
        query: PUZZLE_PAGE_TAGS_QUERY,
        variables: { puzzleId },
        data: {
          ...queryData,
          puzzleTags: [...puzzleTags, newPuzzleTag],
        },
      });
    },
  });

  const [addPuzzleTagWithTag] = useMutation<
    AddPuzzleTagWithTagMutation,
    AddPuzzleTagWithTagMutationVariables
  >(ADD_PUZZLE_TAG_WITH_TAG_MUTATION, {
    update: (proxy, { data }) => {
      if (!data || !data.createPuzzleTagWithTag) return;
      const newPuzzleTag = data.createPuzzleTagWithTag;
      const queryData = proxy.readQuery<
        PuzzlePageTagsQuery,
        PuzzlePageTagsQueryVariables
      >({
        query: PUZZLE_PAGE_TAGS_QUERY,
        variables: { puzzleId },
      });
      if (!queryData) return;
      const { puzzleTags } = queryData;
      proxy.writeQuery<PuzzlePageTagsQuery, PuzzlePageTagsQueryVariables>({
        query: PUZZLE_PAGE_TAGS_QUERY,
        variables: { puzzleId },
        data: {
          ...queryData,
          puzzleTags: [...puzzleTags, newPuzzleTag],
        },
      });
    },
  });

  return (
    <PuzzleTagBubbleBox>
      {edit ? (
        <React.Fragment>
          <PuzzleTagInput ref={inputRef} />
          <ButtonTransparent
            p={1}
            onClick={() => {
              if (!inputRef.current) return;
              const tag = inputRef.current.getValue();
              if (!tag) return;

              if (tag.__isNew__) {
                addPuzzleTagWithTag({
                  variables: {
                    puzzleId,
                    tag: {
                      name: tag.value,
                      created: new Date().toUTCString(),
                    },
                  },
                  optimisticResponse: {
                    createPuzzleTagWithTag: {
                      __typename: 'PuzzleTag',
                      id: -1,
                      tag: {
                        __typename: 'Tag',
                        id: -1,
                        name: tag.value,
                        created: new Date().toISOString(),
                      },
                      user: {
                        __typename: 'User',
                        id: -1,
                        icon: null,
                        nickname: '...',
                        username: '...',
                        currentAward: null,
                      },
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
                addPuzzleTag({
                  variables: {
                    puzzleId,
                    tagId: tag.id,
                  },
                  optimisticResponse: {
                    createPuzzleTag: {
                      __typename: 'PuzzleTag',
                      id: -1,
                      tag: {
                        __typename: 'Tag',
                        id: tag.id,
                        name: tag.value,
                        created: tag.created || new Date().toISOString(),
                      },
                      user: {
                        __typename: 'User',
                        id: -1,
                        icon: null,
                        nickname: '...',
                        username: '...',
                        currentAward: null,
                      },
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
