import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';

import { FormattedMessage } from 'react-intl';
import puzzleMessages from 'messages/components/puzzle';

import { Query, QueryResult } from 'react-apollo';
import { PUZZLE_COMMENT_AGGREGATE_QUERY, } from 'graphql/Queries/Comment';

import { Waypoint } from 'react-waypoint';
import { Box, Flex, Img, Button } from 'components/General';

import commentIcon from 'svgs/puzzleDetailComment.svg';

import { CommentPanelProps } from './types';

const CommentButton = styled(Button)`
  background: transparent;
  &:hover {
    background: rgb(0, 0, 0, 0.05);
  }
  &:active {
    background: rgb(0, 0, 0, 0.1);
  }
`;

const CommentPanel = ({ puzzleId }: CommentPanelProps) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
  }, [puzzleId]);

  return (
    <React.Fragment>
      <Waypoint key="puzzle-comment-panel" onEnter={() => setLoaded(true)} />
      {loaded && (
        <Query
          query={PUZZLE_COMMENT_AGGREGATE_QUERY}
          variables={{
            puzzleId,
          }}
        >
          {({ loading, error, data }: QueryResult) => {
            if (loading) return 'Loading...';
            if (error) return `Error: ${JSON.stringify(error)}`;
            if (!data || !data.sui_hei_comment_aggregate) return null;
            const agg = data.sui_hei_comment_aggregate.aggregate;
            return (
              <Box width={[1, 1 / 2]} mb={2}>
                <Box px={2}>
                  <CommentButton
                    width={1}
                    height="4em"
                    borderWidth={2}
                    borderRadius={3}
                    bg="transparent"
                    borderColor="blue.6"
                    borderStyle="solid"
                  >
                    <Flex alignItems="center" justifyContent="center" p={2}>
                      <Img mr={2} size="xs" src={commentIcon} />
                      <Box fontSize={3} color="blue.6">
                        {agg.count || 0}{' '}
                        <FormattedMessage {...puzzleMessages.comment} />
                      </Box>
                    </Flex>
                  </CommentButton>
                </Box>
              </Box>
            );
          }}
        </Query>
      )}
    </React.Fragment>
  );
};

export default CommentPanel;
