import React from 'react';
import { toast } from 'react-toastify';

import { Flex, Box } from 'components/General';
import Loading from 'components/General/Loading';
import PuzzleTagBubble from './PuzzleTagBubble';
import PuzzleTagAddButton from './PuzzleTagAddButton';

import { useQuery } from '@apollo/client';
import { PUZZLE_PAGE_TAGS_QUERY } from 'graphql/Queries/Tag';

import { FormattedMessage } from 'react-intl';
import puzzleMessages from 'messages/components/puzzle';

import { PuzzleTagsProps } from './types';
import {
  PuzzlePageTagsQuery,
  PuzzlePageTagsQueryVariables,
} from 'graphql/Queries/generated/PuzzlePageTagsQuery';

const PuzzleTags = ({ puzzleId, puzzleUserId, userId }: PuzzleTagsProps) => {
  const { loading, error, data } = useQuery<
    PuzzlePageTagsQuery,
    PuzzlePageTagsQueryVariables
  >(PUZZLE_PAGE_TAGS_QUERY, {
    variables: { puzzleId },
  });

  if (!data || !data.puzzleTags) {
    if (loading) return <Loading centered />;
    return null;
  }
  if (error) {
    toast.error(error.message);
    return null;
  }

  return (
    <Flex flexWrap="wrap" alignItems="center" mb={3}>
      <Box>
        <FormattedMessage {...puzzleMessages.tags} />:
      </Box>
      {data.puzzleTags.map(puzzleTag => (
        <PuzzleTagBubble
          key={puzzleTag.id}
          puzzleId={puzzleId}
          puzzleTag={puzzleTag}
          canDelete={puzzleUserId === userId || puzzleTag.user.id === userId}
        />
      ))}
      {userId !== undefined && <PuzzleTagAddButton puzzleId={puzzleId} />}
    </Flex>
  );
};

export default PuzzleTags;
