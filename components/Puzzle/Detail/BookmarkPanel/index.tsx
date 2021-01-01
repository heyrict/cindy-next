import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import styled from 'theme/styled';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';

import { FormattedMessage } from 'react-intl';
import puzzleMessages from 'messages/components/puzzle';

import { Query } from '@apollo/react-components';
import { PUZZLE_BOOKMARK_AGGREGATE_QUERY } from 'graphql/Queries/Bookmark';

import { Waypoint } from 'react-waypoint';
import { Manager, Reference, Popper } from 'react-popper';
import { Box, Flex, Img, Button } from 'components/General';
import Loading from 'components/General/Loading';
import BookmarkPopoverContent from './BookmarkPopoverContent';

import bookmarkIcon from 'svgs/puzzleDetailBookmark.svg';

import { BookmarkPanelProps } from './types';
import { StateType } from 'reducers/types';
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

const BookmarkPanel = ({ puzzleId, userId }: BookmarkPanelProps) => {
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
            if (error) {
              toast.error(error.message);
              return null;
            }
            if (!data || !data.bookmarkCount) {
              if (loading) return <Loading centered />;
              return null;
            }
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
                              {data.bookmarkCount}{' '}
                              <FormattedMessage {...puzzleMessages.bookmark} />
                            </Box>
                          </Flex>
                        </BookmarkButton>
                      )}
                    </Reference>
                    {show && userId && (
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
                              userId={userId}
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

const mapStateToProps = (state: StateType) => ({
  userId: globalReducer.rootSelector(state).user.id,
});

const withRedux = connect(mapStateToProps);

export default withRedux(BookmarkPanel);
