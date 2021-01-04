import React, { useRef, useState, useEffect } from 'react';
import { upsertItem } from 'common/update';
import { toast } from 'react-toastify';

import { useQuery, useMutation } from '@apollo/client';
import {
  PREVIOUS_COMMENT_VALUE_QUERY,
  PUZZLE_COMMENT_QUERY,
} from 'graphql/Queries/Comment';
import {
  ADD_COMMENT_MUTATION,
  UPDATE_COMMENT_MUTATION,
} from 'graphql/Mutations/Comment';

import Loading from 'components/General/Loading';
import Flex from 'components/General/Flex';
import Box from 'components/General/Box';
import Textarea from 'components/General/Textarea';
import ButtonTransparent from 'components/General/ButtonTransparent';
import { Switch } from 'components/General/Switch';

import { FormattedMessage } from 'react-intl';
import puzzleMessages from 'messages/components/puzzle';
import commonMessages from 'messages/common';

import {
  CommentModalAddPanelProps,
  CommentModalAddPanelRendererProps,
} from './types';
import {
  PreviousCommentValueQuery,
  PreviousCommentValueQueryVariables,
} from 'graphql/Queries/generated/PreviousCommentValueQuery';
import {
  AddCommentMutationVariables,
  AddCommentMutation,
} from 'graphql/Mutations/generated/AddCommentMutation';
import {
  PuzzleCommentQuery,
  PuzzleCommentQueryVariables,
} from 'graphql/Queries/generated/PuzzleCommentQuery';
import {
  UpdateCommentMutation,
  UpdateCommentMutationVariables,
} from 'graphql/Mutations/generated/UpdateCommentMutation';

const CommentModalAddPanelRenderer = ({
  puzzleId,
  userId,
  comments,
}: CommentModalAddPanelRendererProps) => {
  const [spoiler, setSpoiler] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null!);
  const notifHdlRef = useRef<React.ReactText | null>(null);

  const [addComment] = useMutation<
    AddCommentMutation,
    AddCommentMutationVariables
  >(ADD_COMMENT_MUTATION, {
    update: (proxy, { data }) => {
      if (!data || !data.createComment) return;
      const newComment = data.createComment;

      // Update comment list
      const oldComments = proxy.readQuery<
        PuzzleCommentQuery,
        PuzzleCommentQueryVariables
      >({
        query: PUZZLE_COMMENT_QUERY,
        variables: {
          puzzleId,
        },
      });
      if (oldComments) {
        proxy.writeQuery<PuzzleCommentQuery, PuzzleCommentQueryVariables>({
          query: PUZZLE_COMMENT_QUERY,
          variables: {
            puzzleId,
          },
          data: {
            ...oldComments,
            comments:
              newComment.id === -1
                ? [newComment, ...oldComments.comments]
                : upsertItem(oldComments.comments, newComment, 'id', 'desc'),
          },
        });
      }

      // Update user comment
      if (!userId) return;
      proxy.writeQuery<
        PreviousCommentValueQuery,
        PreviousCommentValueQueryVariables
      >({
        query: PREVIOUS_COMMENT_VALUE_QUERY,
        variables: {
          puzzleId,
          userId,
        },
        data: {
          comments: [newComment],
        },
      });
    },
    onCompleted: () => {
      if (notifHdlRef.current) toast.dismiss(notifHdlRef.current);
      toast.info(<FormattedMessage {...commonMessages.saved} />);
    },
    onError: error => {
      toast.error(`${error.name}: ${error.message}`);
      setSpoiler(spoiler);
      return;
    },
  });

  const [updateComment] = useMutation<
    UpdateCommentMutation,
    UpdateCommentMutationVariables
  >(UPDATE_COMMENT_MUTATION);

  useEffect(() => {
    if (comments.length === 0) return;
    setSpoiler(comments[0].spoiler);
    if (inputRef.current) inputRef.current.value = comments[0].content;
  }, [comments]);

  return (
    <Flex
      flexGrow={1}
      flexWrap="wrap"
      border="3px solid"
      borderRadius={1}
      borderColor="yellow.4"
      bg="yellow.2"
      mb={2}
    >
      <Box bg="yellow.3" width={1} p={2} mb={2}>
        {comments.length === 0 ? (
          <FormattedMessage {...puzzleMessages.addComment} />
        ) : (
          <FormattedMessage {...puzzleMessages.yourComment} />
        )}
      </Box>
      <Flex width={1} mb={1} alignItems="center">
        <Box minWidth="6em" px={1}>
          <FormattedMessage {...puzzleMessages.comment} />
        </Box>
        <Box style={{ flexGrow: 1 }}>
          <Textarea
            bg="yellow.1"
            p="2px"
            minWidth="calc(100% - 6px)"
            border="2px solid"
            borderColor="yellow.4"
            ref={inputRef}
          />
        </Box>
      </Flex>
      <Box width={1} mb={1}>
        <Switch selected={spoiler} onClick={() => setSpoiler(!spoiler)} />
        <FormattedMessage {...puzzleMessages.spoiler} />
      </Box>
      <Box width={1} bg="yellow.4">
        <ButtonTransparent
          p={2}
          width={1}
          onClick={() => {
            if (!inputRef.current) return;
            const content = inputRef.current.value.trim();

            if (comments.length === 0) {
              addComment({
                variables: {
                  puzzleId,
                  content,
                  spoiler,
                },
                optimisticResponse: {
                  createComment: {
                    __typename: 'Comment',
                    id: comments.length > 0 ? comments[0].id : -1,
                    content,
                    spoiler,
                    user: {
                      __typename: 'User',
                      id: userId,
                      icon: null,
                      currentAward: null,
                      nickname: '...',
                      username: '...',
                    },
                  },
                },
              });
            } else {
              const comment = comments[0];
              updateComment({
                variables: {
                  id: comment.id,
                  content,
                  spoiler,
                },
              });
            }

            notifHdlRef.current = toast.info(
              <FormattedMessage {...commonMessages.saving} />,
            );
          }}
        >
          {comments.length === 0 ? (
            <FormattedMessage {...commonMessages.send} />
          ) : (
            <FormattedMessage {...commonMessages.save} />
          )}
        </ButtonTransparent>
      </Box>
    </Flex>
  );
};

const CommentModalAddPanel = ({
  puzzleId,
  userId,
}: CommentModalAddPanelProps) => {
  const { data, loading, error } = useQuery<
    PreviousCommentValueQuery,
    PreviousCommentValueQueryVariables
  >(PREVIOUS_COMMENT_VALUE_QUERY, {
    variables: {
      puzzleId,
      userId,
    },
  });

  if (error) {
    toast.error(error.message);
    return null;
  }
  if (!data || !data.comments) {
    if (loading) return <Loading centered />;
    return null;
  }

  return (
    <CommentModalAddPanelRenderer
      comments={data.comments}
      puzzleId={puzzleId}
      userId={userId}
    />
  );
};

export default CommentModalAddPanel;
