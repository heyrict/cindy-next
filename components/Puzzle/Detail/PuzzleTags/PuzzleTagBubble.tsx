import React, { useRef } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';

import { FormattedMessage } from 'react-intl';
import commonMessages from 'messages/common';
import puzzlePageMessages from 'messages/pages/puzzle';

import { useMutation } from '@apollo/client';
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

const ButtonTransparentA = ButtonTransparent.withComponent('a');

const PuzzleTagBubble = ({
  puzzleId,
  puzzleTag,
  canDelete,
}: PuzzleTagBubbleProps) => {
  const warnHdl = useRef<React.ReactText | null>(null);

  const [deletePuzzleTag] = useMutation<
    DeletePuzzleTagMutation,
    DeletePuzzleTagMutationVariables
  >(DELETE_PUZZLE_TAG_MUTATION, {
    update: (proxy, { data }) => {
      if (!data || !data.deletePuzzleTag) return null;
      const puzzleTag = data.deletePuzzleTag;

      const prevData = proxy.readQuery<
        PuzzlePageTagsQuery,
        PuzzlePageTagsQueryVariables
      >({
        query: PUZZLE_PAGE_TAGS_QUERY,
        variables: { puzzleId },
      });
      if (!prevData) return null;
      proxy.writeQuery<PuzzlePageTagsQuery, PuzzlePageTagsQueryVariables>({
        query: PUZZLE_PAGE_TAGS_QUERY,
        variables: { puzzleId },
        data: {
          puzzleTags: prevData.puzzleTags.filter(pt => pt.id !== puzzleTag.id),
        },
      });
    },
    onError: error => {
      toast.error(`${error.name}: ${error.message}`);
    },
  });

  return (
    <PuzzleTagBubbleBox>
      <Box>
        <Link href="/tag/[id]" as={`/tag/${puzzleTag.tag.id}`} passHref>
          <ButtonTransparentA pl={1} pr={canDelete ? 0 : 1}>
            {puzzleTag.tag.name}
          </ButtonTransparentA>
        </Link>
      </Box>
      {canDelete && (
        <ButtonTransparent
          p={1}
          onClick={() => {
            if (warnHdl.current) toast.dismiss(warnHdl.current);
            warnHdl.current = toast.warn(
              <Box>
                <FormattedMessage
                  {...puzzlePageMessages.deleteTagConfirm}
                  values={{
                    tag: puzzleTag.tag.name,
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
                          deletePuzzleTag: {
                            __typename: 'PuzzleTag',
                            id: puzzleTag.id,
                          },
                        },
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
    </PuzzleTagBubbleBox>
  );
};

export default PuzzleTagBubble;
