import { PuzzleTag } from 'graphql/Fragments/generated/PuzzleTag';

export type PuzzleTagsProps = {
  puzzleId: number;
  puzzleUserId: number;
  userId?: number;
};

export type PuzzleTagBubbleProps = {
  puzzleId: number;
  puzzleTag: PuzzleTag;
  canDelete?: boolean;
};

export type PuzzleTagAddButtonProps = {
  puzzleId: number;
};

export type PuzzleTagInputOptionType = {
  id: number;
  value: string;
  label: React.ReactNode;
  created?: string;
  __isNew__?: boolean;
};
