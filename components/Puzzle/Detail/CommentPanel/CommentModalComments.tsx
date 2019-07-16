import React from 'react';
import { toast } from 'react-toastify';

import Flex from 'components/General/Flex';
import CommentModalComment from './CommentModalComment';

import { Query } from 'react-apollo';
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
    {({ data, error }) => {
      if (error) {
        toast.error(error.message);
        return null;
      }
      if (!data || !data.sui_hei_comment) return null;
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
