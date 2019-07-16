import { PuzzleCommentQuery_sui_hei_comment } from 'graphql/Queries/generated/PuzzleCommentQuery';
import { GlobalUserType } from 'reducers/types';

export type CommentPanelProps = {
  puzzleId: number;
  canAddComment: boolean;
};

export type CommentModalCommentsProps = {
  puzzleId: number;
};

export type CommentModalCommentContentProps = {
  blurred?: boolean;
};

export type CommentModalAddPanelProps = {
  puzzleId: number;
  user: GlobalUserType;
};

export type CommentModalCommentProps = {
  comment: PuzzleCommentQuery_sui_hei_comment;
};
