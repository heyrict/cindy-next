import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import styled from 'theme/styled';

import { FormattedMessage } from 'react-intl';
import puzzleMessages from 'messages/components/puzzle';

import { Query } from '@apollo/react-components';
import { PUZZLE_STAR_AGGREGATE_QUERY } from 'graphql/Queries/Star';

import { Waypoint } from 'react-waypoint';
import { Manager, Reference, Popper } from 'react-popper';
import { Box, Flex, Img, Button } from 'components/General';
import Loading from 'components/General/Loading';
import StarPopupContent from './StarPopupContent';

import starIcon from 'svgs/puzzleDetailStar.svg';

import { StarPanelProps } from './types';
import {
  PuzzleStarAggregateQuery,
  PuzzleStarAggregateQueryVariables,
} from 'graphql/Queries/generated/PuzzleStarAggregateQuery';

const StarButton = styled(Button)`
  background: transparent;
  &:hover {
    background: rgb(0, 0, 0, 0.05);
  }
  &:active {
    background: rgb(0, 0, 0, 0.1);
  }
`;

const StarPanel = ({ puzzleId, canAddStar }: StarPanelProps) => {
  const [loaded, setLoaded] = useState(false);
  const [show, setShow] = useState(false);
  let buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setLoaded(false);
  }, [puzzleId]);

  return (
    <React.Fragment>
      <Waypoint key="puzzle-star-panel" onEnter={() => setLoaded(true)} />
      {loaded && (
        <Query<PuzzleStarAggregateQuery, PuzzleStarAggregateQueryVariables>
          query={PUZZLE_STAR_AGGREGATE_QUERY}
          variables={{
            puzzleId,
          }}
        >
          {({ error, data, loading }) => {
            if (error) {
              toast.error(error.message);
              return null;
            }
            if (!data || !data.starCount) {
              if (loading) return <Loading centered />;
              return null;
            }

            const agg = {
              starCount: data.starCount,
              starSum: data.starSum || 0,
            };

            return (
              <Box width={[1, 1 / 2]} mb={2}>
                <Box px={2}>
                  <Manager>
                    <Reference>
                      {({ ref }) => (
                        <StarButton
                          ref={(r: HTMLButtonElement | null) => {
                            ref(r);
                            buttonRef.current = r;
                          }}
                          width={1}
                          height="4em"
                          borderWidth={2}
                          borderRadius={3}
                          bg="transparent"
                          borderColor="violet.6"
                          borderStyle="solid"
                          onClick={() => setShow(!show)}
                        >
                          <Flex
                            alignItems="center"
                            justifyContent="center"
                            p={2}
                          >
                            <Img mr={2} size="xs" src={starIcon} />
                            <Box fontSize={3} color="violet.6">
                              {agg.starCount} ({agg.starSum}){' '}
                              <FormattedMessage {...puzzleMessages.star} />
                            </Box>
                          </Flex>
                        </StarButton>
                      )}
                    </Reference>
                    {show && (
                      <Popper placement="top">
                        {({ ref, style, placement }) => (
                          <Flex
                            flexWrap="wrap"
                            bg="orange.3"
                            borderRadius={1}
                            p={2}
                            maxWidth="500px"
                            ref={ref}
                            style={{
                              ...style,
                              zIndex: 12,
                            }}
                            data-placement={placement}
                          >
                            <StarPopupContent
                              puzzleId={puzzleId}
                              starCount={agg.starCount}
                              setShow={setShow}
                              buttonRef={buttonRef}
                              canAddStar={canAddStar}
                            />
                          </Flex>
                        )}
                      </Popper>
                    )}
                  </Manager>
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
