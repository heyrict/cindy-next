import React, { useRef, useState, useEffect } from 'react';
import { upsertItem } from 'common/update';
import { toast } from 'react-toastify';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';

import { Query, Mutation } from '@apollo/react-components';
import { QueryResult } from '@apollo/react-common';
import {
  PREVIOUS_COMMENT_VALUE_QUERY,
  PUZZLE_COMMENT_QUERY,
} from 'graphql/Queries/Comment';
import { ADD_COMMENT_MUTATION } from 'graphql/Mutations/Comment';

import Loading from 'components/General/Loading';
import Flex from 'components/General/Flex';
import Box from 'components/General/Box';
import Textarea from 'components/General/Textarea';
import ButtonTransparent from 'components/General/ButtonTransparent';
import { Switch } from 'components/General/Switch';

import { FormattedMessage } from 'react-intl';
import puzzleMessages from 'messages/components/puzzle';
import commonMessages from 'messages/common';

import { CommentModalAddPanelProps } from './types';
import {
  PreviousCommentValueQuery,
  PreviousCommentValueQueryVariables,
} from 'graphql/Queries/generated/PreviousCommentValueQuery';
import {
  AddCommentMutationVariables,
  AddCommentMutation,
} from 'graphql/Mutations/generated/AddCommentMutation';
import { StateType } from 'reducers/types';
import {
  PuzzleCommentQuery,
  PuzzleCommentQueryVariables,
} from 'graphql/Queries/generated/PuzzleCommentQuery';
import { ApolloError } from '@apollo/client';

const CommentModalAddPanelRenderer = ({
  puzzleId,
  user,
  data,
  loading,
  error,
}: CommentModalAddPanelProps &
  QueryResult<
    PreviousCommentValueQuery,
    PreviousCommentValueQueryVariables
  >) => {
  const [spoiler, setSpoiler] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null!);
  const notifHdlRef = useRef<React.ReactText | null>(null);

  useEffect(() => {
    if (!data || !data.comments || data.comments.length === 0) return;
    setSpoiler(data.comments[0].spoiler);
    if (inputRef.current) inputRef.current.value = data.comments[0].content;
  }, [data]);

  if (error) {
    toast.error(error.message);
    return null;
  }
  if (!data || !data.comments) {
    if (loading) return <Loading centered />;
    return null;
  }

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
        {data.comments.length === 0 ? (
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
        <Mutation<AddCommentMutation, AddCommentMutationVariables>
          mutation={ADD_COMMENT_MUTATION}
          update={(proxy, { data }) => {
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
              proxy.writeQuery<PuzzleCommentQuery, PuzzleCommentQueryVariables>(
                {
                  query: PUZZLE_COMMENT_QUERY,
                  variables: {
                    puzzleId,
                  },
                  data: {
                    ...oldComments,
                    comments:
                      newComment.id === -1
                        ? [newComment, ...oldComments.comments]
                        : upsertItem(
                            oldComments.comments,
                            newComment,
                            'id',
                            'desc',
                          ),
                  },
                },
              );
            }

            // Update user comment
            if (!user.id) return;
            proxy.writeQuery<
              PreviousCommentValueQuery,
              PreviousCommentValueQueryVariables
            >({
              query: PREVIOUS_COMMENT_VALUE_QUERY,
              variables: {
                puzzleId,
                userId: user.id,
              },
              data: {
                comments: [newComment],
              },
            });
          }}
        >
          {addComment => (
            <ButtonTransparent
              p={2}
              width={1}
              onClick={() => {
                if (!inputRef.current) return;
                const content = inputRef.current.value.trim();
                addComment({
                  variables: {
                    puzzleId,
                    content,
                    spoiler,
                  },
                  optimisticResponse: {
                    createComment: {
                      __typename: 'Comment',
                      id: data.comments.length > 0 ? data.comments[0].id : -1,
                      content,
                      spoiler,
                      user: {
                        __typename: 'user',
                        id: user.id || -1,
                        icon: user.icon || null,
                        currentAward: null,
                        nickname: user.nickname || '...',
                        username: user.username || '...',
                      },
                    },
                  },
                })
                  .then(res => {
                    if (!res) return;
                    const { errors } = res;
                    if (errors) {
                      toast.error(JSON.stringify(errors));
                      setSpoiler(spoiler);
                      return;
                    }
                    if (notifHdlRef.current) toast.dismiss(notifHdlRef.current);
                    toast.info(<FormattedMessage {...commonMessages.saved} />);
                  })
                  .catch((e: ApolloError) => {
                    if (notifHdlRef.current) toast.dismiss(notifHdlRef.current);
                    toast.error(e.message);
                  });

                notifHdlRef.current = toast.info(
                  <FormattedMessage {...commonMessages.saving} />,
                );
              }}
            >
              {data.comments.length === 0 ? (
                <FormattedMessage {...commonMessages.send} />
              ) : (
                <FormattedMessage {...commonMessages.save} />
              )}
            </ButtonTransparent>
          )}
        </Mutation>
      </Box>
    </Flex>
  );
};

const CommentModalAddPanel = ({
  puzzleId,
  user,
}: CommentModalAddPanelProps) => {
  return user.id ? (
    <Query<PreviousCommentValueQuery, PreviousCommentValueQueryVariables>
      query={PREVIOUS_COMMENT_VALUE_QUERY}
      variables={{
        puzzleId,
        userId: user.id,
      }}
    >
      {params => (
        <CommentModalAddPanelRenderer
          puzzleId={puzzleId}
          user={user}
          {...params}
        />
      )}
    </Query>
  ) : null;
};

const mapStateToProps = (state: StateType) => ({
  user: globalReducer.rootSelector(state).user,
});

const withRedux = connect(mapStateToProps);

export default withRedux(CommentModalAddPanel);
