import React from 'react';
import { toast } from 'react-toastify';

import Loading from 'components/General/Loading';
import Flex from 'components/General/Flex';
import CommentModalComment from './CommentModalComment';

import { Query } from '@apollo/react-components';
import { PUZZLE_COMMENT_QUERY } from 'graphql/Queries/Comment';

import {
  PuzzleCommentQuery,
  PuzzleCommentQueryVariables,
} from 'graphql/Queries/generated/PuzzleCommentQuery';
import { CommentModalCommentsProps } from './types';

const CommentModalComments = ({ puzzleId }: CommentModalCommentsProps) => (
  <Query<PuzzleCommentQuery, PuzzleCommentQueryVariables>
    query={PUZZLE_COMMENT_QUERY}
    variables={{ puzzleId }}
  >
    {({ data, error, loading }) => {
      if (error) {
        toast.error(error.message);
        return null;
      }
      if (!data || !data.sui_hei_comment) {
        if (loading) return <Loading centered />;
        return null;
      }
      return (
        <Flex flexDirection="column">
          {data.sui_hei_comment.map(comment => (
            <CommentModalComment key={comment.id} comment={comment} />
          ))}
        </Flex>
      );
    }}
  </Query>
);

export default CommentModalComments;
