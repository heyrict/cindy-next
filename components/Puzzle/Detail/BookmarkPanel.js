import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import { FormattedMessage } from 'react-intl';
import puzzleMessages from 'messages/components/puzzle';

import { Query } from 'react-apollo';
import {
  PuzzleBookmarkQuery,
  PuzzleBookmarkAggregateQuery,
} from 'graphql/Queries/Bookmark';

import { Waypoint } from 'react-waypoint';
import { Box, Flex, Img, Button } from 'components/General';

import bookmarkIcon from 'svgs/puzzleDetailBookmark.svg';

const BookmarkButton = styled(Button)`
  background: transparent;
  &:hover {
    background: rgb(0, 0, 0, 0.05);
  }
  &:active {
    background: rgb(0, 0, 0, 0.1);
  }
`;

const BookmarkPanel = ({ puzzleId }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
  }, [puzzleId]);

  return (
    <React.Fragment>
      <Waypoint key="puzzle-bookmark-panel" onEnter={() => setLoaded(true)} />
      {loaded && (
        <Query
          query={PuzzleBookmarkAggregateQuery}
          variables={{
            puzzleId,
          }}
        >
          {({ loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) return `Error: ${JSON.stringify(error)}`;
            if (!data || !data.sui_hei_bookmark_aggregate) return null;
            const agg = data.sui_hei_bookmark_aggregate.aggregate;
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
                        {agg.count || 0}{' '}
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
