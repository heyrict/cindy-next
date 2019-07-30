import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import styled from 'theme/styled';

import { FormattedMessage } from 'react-intl';
import puzzleMessages from 'messages/components/puzzle';

import { Query } from 'react-apollo';
import { PUZZLE_BOOKMARK_AGGREGATE_QUERY } from 'graphql/Queries/Bookmark';

import { Waypoint } from 'react-waypoint';
import { Manager, Reference, Popper } from 'react-popper';
import { Box, Flex, Img, Button } from 'components/General';
import BookmarkPopoverContent from './BookmarkPopoverContent';

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
  const [show, setShow] = useState(false);
  let buttonRef = useRef<HTMLButtonElement | null>(null);

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
            const agg = {
              bookmarkCount:
                (data.sui_hei_bookmark_aggregate.aggregate &&
                  data.sui_hei_bookmark_aggregate.aggregate.count) ||
                0,
            };
            return (
              <Box width={[1, 1 / 2]} mb={2}>
                <Box px={2}>
                  <Manager>
                    <Reference>
                      {({ ref }) => (
                        <BookmarkButton
                          ref={(r: HTMLButtonElement | null) => {
                            ref(r);
                            buttonRef.current = r;
                          }}
                          width={1}
                          height="4em"
                          borderWidth={2}
                          borderRadius={3}
                          bg="transparent"
                          borderColor="green.6"
                          borderStyle="solid"
                          onClick={() => setShow(!show)}
                        >
                          <Flex
                            alignItems="center"
                            justifyContent="center"
                            p={2}
                          >
                            <Img mr={2} size="xs" src={bookmarkIcon} />
                            <Box fontSize={3} color="green.6">
                              {agg.bookmarkCount}{' '}
                              <FormattedMessage {...puzzleMessages.bookmark} />
                            </Box>
                          </Flex>
                        </BookmarkButton>
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
                            <BookmarkPopoverContent
                              puzzleId={puzzleId}
                              setShow={setShow}
                              buttonRef={buttonRef}
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

export default BookmarkPanel;