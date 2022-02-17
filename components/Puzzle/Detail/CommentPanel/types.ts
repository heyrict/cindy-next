import { PuzzleCommentQuery_comments } from 'graphql/Queries/generated/PuzzleCommentQuery';
import { PreviousCommentValueQuery_comments } from 'graphql/Queries/generated/PreviousCommentValueQuery';

export type CommentPanelProps = {
  puzzleId: number;
  canAddComment: boolean;
  userId: number | null;
};

export type CommentModalCommentsProps = {
  puzzleId: number;
};

export type CommentModalCommentContentProps = {
  blurred?: boolean;
};

export type CommentModalAddPanelProps = {
  puzzleId: number;
  userId: number;
};

export type CommentModalAddPanelRendererProps = {
  comments: PreviousCommentValueQuery_comments[];
} & CommentModalAddPanelProps;

export type CommentModalCommentProps = {
  comment: PuzzleCommentQuery_comments;
};
