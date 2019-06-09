import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import { FormattedMessage } from 'react-intl';
import puzzleMessages from 'messages/components/puzzle';

import { Query } from 'react-apollo';
import {
  PuzzleStarQuery,
  PuzzleStarAggregateQuery,
} from 'graphql/Queries/Star';

import { Waypoint } from 'react-waypoint';
import { Box, Flex, Img, Button } from 'components/General';

import starIcon from 'svgs/puzzleDetailStar.svg';

const StarButton = styled(Button)`
  background: transparent;
  &:hover {
    background: rgb(0, 0, 0, 0.05);
  }
  &:active {
    background: rgb(0, 0, 0, 0.1);
  }
`;

const StarPanel = ({ puzzleId }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
  }, [puzzleId]);

  return (
    <React.Fragment>
      <Waypoint key="puzzle-star-panel" onEnter={() => setLoaded(true)} />
      {loaded && (
        <Query
          query={PuzzleStarAggregateQuery}
          variables={{
            puzzleId,
          }}
        >
          {({ loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) return `Error: ${JSON.stringify(error)}`;
            if (!data || !data.sui_hei_star_aggregate) return null;
            const agg = data.sui_hei_star_aggregate.aggregate;
            return (
              <Box width={[1, 1 / 2]} mb={2}>
                <Box px={2}>
                  <StarButton
                    width={1}
                    height="4em"
                    borderWidth={2}
                    borderRadius={3}
                    bg="transparent"
                    borderColor="violet.6"
                    borderStyle="solid"
                  >
                    <Flex alignItems="center" justifyContent="center" p={2}>
                      <Img mr={2} size="xs" src={starIcon} />
                      <Box fontSize={3} color="violet.6">
                        {agg.count || 0} ({agg.sum.value || 0}){' '}
                        <FormattedMessage {...puzzleMessages.star} />
                      </Box>
                    </Flex>
                  </StarButton>
                </Box>
              </Box>
            );
          }}
        </Query>
      )}
    </React.Fragment>
  );
};

export default StarPanel;
