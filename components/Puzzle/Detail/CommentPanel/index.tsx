import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import styled from 'theme/styled';

import { FormattedMessage } from 'react-intl';
import puzzleMessages from 'messages/components/puzzle';

import { Query } from '@apollo/react-components';
import { PUZZLE_COMMENT_AGGREGATE_QUERY } from 'graphql/Queries/Comment';

import { Waypoint } from 'react-waypoint';
import { Box, Flex, Img, Button } from 'components/General';
import Loading from 'components/General/Loading';
import { Modal, ModalHeader, ModalCloseBtn } from 'components/Modal';
import CommentModalComments from './CommentModalComments';
import CommentModalAddPanel from './CommentModalAddPanel';

import commentIcon from 'svgs/puzzleDetailComment.svg';

import { CommentPanelProps } from './types';
import {
  PuzzleCommentAggregateQuery,
  PuzzleCommentAggregateQueryVariables,
} from 'graphql/Queries/generated/PuzzleCommentAggregateQuery';

const CommentButton = styled(Button)`
  background: transparent;
  &:hover {
    background: rgb(0, 0, 0, 0.05);
  }
  &:active {
    background: rgb(0, 0, 0, 0.1);
  }
`;

const CommentPanel = ({ puzzleId, canAddComment, userId }: CommentPanelProps) => {
  const [loaded, setLoaded] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setLoaded(false);
  }, [puzzleId]);

  return (
    <React.Fragment>
      <Waypoint
        key="puzzle-comment-panel"
        onEnter={() => !loaded && setLoaded(true)}
      />
      {loaded && (
        <Query<
          PuzzleCommentAggregateQuery,
          PuzzleCommentAggregateQueryVariables
        >
          query={PUZZLE_COMMENT_AGGREGATE_QUERY}
          variables={{
            puzzleId,
          }}
        >
          {({ error, data, loading }) => {
            if (error) {
              toast.error(error.message);
              return null;
            }
            if (!data || !data.commentCount) {
              if (loading) return <Loading centered />;
              return null;
            }
            return (
              <>
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
                      onClick={() => setShow(true)}
                    >
                      <Flex alignItems="center" justifyContent="center" p={2}>
                        <Img mr={2} size="xs" src={commentIcon} />
                        <Box fontSize={3} color="blue.6">
                          {data.commentCount}{' '}
                          <FormattedMessage {...puzzleMessages.comment} />
                        </Box>
                      </Flex>
                    </CommentButton>
                  </Box>
                </Box>
                <Modal show={show} closefn={() => setShow(false)}>
                  <ModalHeader>
                    <FormattedMessage {...puzzleMessages.comment} />
                    <ModalCloseBtn onClick={() => setShow(false)} />
                  </ModalHeader>
                  <Flex flexGrow={1} p={[2, 3]} flexDirection="column">
                    {canAddComment && userId && (
                      <CommentModalAddPanel puzzleId={puzzleId} userId={userId} />
                    )}
                    <CommentModalComments puzzleId={puzzleId} />
                  </Flex>
                </Modal>
              </>
            );
          }}
        </Query>
      )}
    </React.Fragment>
  );
};

export default CommentPanel;
