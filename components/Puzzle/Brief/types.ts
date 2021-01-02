import { InlineUser } from 'components/User/types';
import { Status, Genre, Yami } from 'generated/globalTypes';

export type PuzzleType = {
  id: number;
  genre: Genre;
  title: string;
  status: Status;
  yami: Yami;
  anonymous?: boolean;
  created: string;
  modified: string;
  user: InlineUser;
  starCount?: number;
  starSum?: number;
  commentCount?: number;
  bookmarkCount?: number;
  dialogueCount?: number;
  dialogueNewCount?: number;
  dialogueMaxAnsweredtime?: string;
};

export type PuzzlePaneProps = {
  status: Status;
};

export type PuzzleBriefProps = {
  puzzle: PuzzleType;
  bookmarkCount?: number;
  commentCount?: number;
  starCount?: number;
  starSum?: number;
  dialogueCount?: number;
  dialogueNewCount?: number;
  dialogueMaxAnsweredTime?: string;
  showGenreImage: boolean;
};

export type CommentProps = {
  count: number;
  puzzleId: number;
};
