import React, { useRef } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';

import { FormattedMessage } from 'react-intl';
import commonMessages from 'messages/common';
import puzzlePageMessages from 'messages/pages/puzzle';

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
import { ApolloError } from 'apollo-client/errors/ApolloError';

const ButtonTransparentA = ButtonTransparent.withComponent('a');

const PuzzleTagBubble = ({
  puzzleId,
  puzzleTag,
  canDelete,
}: PuzzleTagBubbleProps) => {
  const warnHdl = useRef<React.ReactText | null>(null);

  return (
    <PuzzleTagBubbleBox>
      <Box>
        <Link href="/tag/[id]" as={`/tag/${puzzleTag.sui_hei_tag.id}`} passHref>
          <ButtonTransparentA pl={1} pr={canDelete ? 0 : 1}>
            {puzzleTag.sui_hei_tag.name}
          </ButtonTransparentA>
        </Link>
      </Box>
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
                if (warnHdl.current) toast.dismiss(warnHdl.current);
                warnHdl.current = toast.warn(
                  <Box>
                    <FormattedMessage
                      {...puzzlePageMessages.deleteTagConfirm}
                      values={{
                        tag: puzzleTag.sui_hei_tag.name,
                      }}
                    />
                    <Box
                      bg="red.4"
                      border="3px solid"
                      borderColor="red.7"
                      borderRadius={2}
                    >
                      <ButtonTransparent
                        p={2}
                        width={1}
                        color="red.1"
                        fontWeight="bold"
                        onClick={() => {
                          deletePuzzleTag({
                            variables: {
                              puzzleTagId: puzzleTag.id,
                            },
                            optimisticResponse: {
                              delete_sui_hei_puzzle_tag: {
                                __typename:
                                  'sui_hei_puzzle_tag_mutation_response',
                                affected_rows: 1,
                              },
                            },
                          })
                            .then(res => {
                              if (!res) return;
                              const { errors } = res;
                              if (errors) {
                                toast.error(JSON.stringify(errors));
                              }
                            })
                            .catch((e: ApolloError) => {
                              toast.error(e.message);
                            });
                          if (warnHdl.current) toast.dismiss(warnHdl.current);
                        }}
                      >
                        <FormattedMessage {...commonMessages.continue} />
                      </ButtonTransparent>
                    </Box>
                  </Box>,
                );
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
