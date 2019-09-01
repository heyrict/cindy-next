import React from 'react';
import { toast } from 'react-toastify';

import { Flex, Box } from 'components/General';
import Loading from 'components/General/Loading';
import PuzzleTagBubble from './PuzzleTagBubble';
import PuzzleTagAddButton from './PuzzleTagAddButton';

import { Query } from 'react-apollo';
import { PUZZLE_PAGE_TAGS_QUERY } from 'graphql/Queries/Tag';

import { FormattedMessage } from 'react-intl';
import puzzleMessages from 'messages/components/puzzle';

import { PuzzleTagsProps } from './types';
import {
  PuzzlePageTagsQuery,
  PuzzlePageTagsQueryVariables,
} from 'graphql/Queries/generated/PuzzlePageTagsQuery';

const PuzzleTags = ({ puzzleId, puzzleUserId, userId }: PuzzleTagsProps) => {
  return (
    <Flex flexWrap="wrap" alignItems="center" mb={3}>
      <Box>
        <FormattedMessage {...puzzleMessages.tags} />:
      </Box>
      <Query<PuzzlePageTagsQuery, PuzzlePageTagsQueryVariables>
        query={PUZZLE_PAGE_TAGS_QUERY}
        variables={{ puzzleId }}
      >
        {({ loading, error, data }) => {
          if (!data || !data.sui_hei_puzzle_tag) {
            if (loading) return <Loading centered />;
            return null;
          }
          if (error) {
            toast.error(error.message);
            return null;
          }
          return (
            <React.Fragment>
              {data.sui_hei_puzzle_tag.map(puzzleTag => (
                <PuzzleTagBubble
                  key={puzzleTag.id}
                  puzzleId={puzzleId}
                  puzzleTag={puzzleTag}
                  canDelete={
                    puzzleUserId === userId ||
                    puzzleTag.sui_hei_user.id === userId
                  }
                />
              ))}
              {userId !== undefined && (
                <PuzzleTagAddButton puzzleId={puzzleId} />
              )}
            </React.Fragment>
          );
        }}
      </Query>
    </Flex>
  );
};

export default PuzzleTags;
