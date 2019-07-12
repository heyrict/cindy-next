import React from 'react';

import { Mutation } from 'react-apollo';
import { DELETE_PUZZLE_TAG_MUTATION } from 'graphql/Mutations/Tag';
import { PUZZLE_PAGE_TAGS_QUERY } from 'graphql/Queries/Tag';

import { ButtonTransparent, Img, Box } from 'components/General';
import { PuzzleTagBubbleBox } from './shared';
import denyPlainIcon from 'svgs/denyPlain.svg';

import { PuzzleTagBubbleProps } from './types';
import {
  DeletePuzzleTagMutation,
  DeletePuzzleTagMutationVariables,
} from 'graphql/Mutations/generated/DeletePuzzleTagMutation';
import {
  PuzzlePageTagsQuery,
  PuzzlePageTagsQueryVariables,
} from 'graphql/Queries/generated/PuzzlePageTagsQuery';

const PuzzleTagBubble = ({
  puzzleId,
  puzzleTag,
  canDelete,
}: PuzzleTagBubbleProps) => {
  return (
    <PuzzleTagBubbleBox>
      <Box pl={1}>{puzzleTag.sui_hei_tag.name}</Box>
      {canDelete && (
        <Mutation<DeletePuzzleTagMutation, DeletePuzzleTagMutationVariables>
          mutation={DELETE_PUZZLE_TAG_MUTATION}
          update={(proxy, { data }) => {
            if (!data || !data.delete_sui_hei_puzzle_tag) return null;
            const prevData = proxy.readQuery<
              PuzzlePageTagsQuery,
              PuzzlePageTagsQueryVariables
            >({
              query: PUZZLE_PAGE_TAGS_QUERY,
              variables: { puzzleId },
            });
            if (!prevData) return null;
            proxy.writeQuery<PuzzlePageTagsQuery, PuzzlePageTagsQueryVariables>(
              {
                query: PUZZLE_PAGE_TAGS_QUERY,
                variables: { puzzleId },
                data: {
                  ...prevData,
                  sui_hei_puzzle_tag: prevData.sui_hei_puzzle_tag.filter(
                    pt => pt.id !== puzzleTag.id,
                  ),
                },
              },
            );
          }}
        >
          {deletePuzzleTag => (
            <ButtonTransparent
              p={1}
              onClick={() => {
                deletePuzzleTag({
                  variables: {
                    puzzleTagId: puzzleTag.id,
                  },
                  optimisticResponse: {
                    delete_sui_hei_puzzle_tag: {
                      __typename: 'sui_hei_puzzle_tag_mutation_response',
                      affected_rows: 1,
                    },
                  },
                });
              }}
            >
              <Img src={denyPlainIcon} height="0.8em" alt="x" />
            </ButtonTransparent>
          )}
        </Mutation>
      )}
    </PuzzleTagBubbleBox>
  );
};

export default PuzzleTagBubble;
