import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import styled from 'theme/styled';

import { FormattedMessage } from 'react-intl';
import puzzleMessages from 'messages/components/puzzle';

import { Query } from 'react-apollo';
import { PUZZLE_BOOKMARK_AGGREGATE_QUERY } from 'graphql/Queries/Bookmark';

import { Waypoint } from 'react-waypoint';
import { Box, Flex, Img, Button } from 'components/General';

import bookmarkIcon from 'svgs/puzzleDetailBookmark.svg';

import { BookmarkPanelProps } from './types';
import {
  PuzzleBookmarkAggregateQuery,
  PuzzleBookmarkAggregateQueryVariables,
} from 'graphql/Queries/generated/PuzzleBookmarkAggregateQuery';

const BookmarkButton = styled(Button)`
  background: transparent;
  &:hover {
    background: rgb(0, 0, 0, 0.05);
  }
  &:active {
    background: rgb(0, 0, 0, 0.1);
  }
`;

const BookmarkPanel = ({ puzzleId }: BookmarkPanelProps) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
  }, [puzzleId]);

  return (
    <React.Fragment>
      <Waypoint key="puzzle-bookmark-panel" onEnter={() => setLoaded(true)} />
      {loaded && (
        <Query<
          PuzzleBookmarkAggregateQuery,
          PuzzleBookmarkAggregateQueryVariables
        >
          query={PUZZLE_BOOKMARK_AGGREGATE_QUERY}
          variables={{
            puzzleId,
          }}
        >
          {({ loading, error, data }) => {
            if (loading && !data) return null;
            if (error) {
              toast.error(error.message);
              return null;
            }
            if (!data || !data.sui_hei_bookmark_aggregate) return null;
            const agg = data.sui_hei_bookmark_aggregate.aggregate || {
              count: 0,
            };
            return (
              <Box width={[1, 1 / 2]} mb={2}>
                <Box px={2}>
                  <BookmarkButton
                    width={1}
                    height="4em"
                    borderWidth={2}
                    borderRadius={3}
                    bg="transparent"
                    borderColor="green.6"
                    borderStyle="solid"
                  >
                    <Flex alignItems="center" justifyContent="center" p={2}>
                      <Img mr={2} size="xs" src={bookmarkIcon} />
                      <Box fontSize={3} color="green.6">
                        {agg.count}{' '}
                        <FormattedMessage {...puzzleMessages.bookmark} />
                      </Box>
                    </Flex>
                  </BookmarkButton>
                </Box>
              </Box>
            );
          }}
        </Query>
      )}
    </React.Fragment>
  );
};

export default BookmarkPanel;
