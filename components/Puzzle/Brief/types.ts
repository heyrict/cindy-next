import { InlineUser } from 'components/User/types';

export enum YamiType {
  NotYami,
  Yami,
  LongtermYami,
}

export enum GenreType {
  Classic,
  TwentyQuestions,
  LittleAlbat,
  Others,
}

export enum StatusType {
  Undergoing,
  Solved,
  Dazed,
  Hidden,
  Forbidden,
}

export type PuzzleType = {
  id: number;
  genre: number;
  title: string;
  status: number;
  yami: number;
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
  status: number;
};

export type PuzzleBriefProps = {
  puzzle: PuzzleType;
  bookmarkCount?: number;
  commentCount?: number;
  starCount?: number;
  starSum?: number;
  dialogueCount?: number;
  dialogueNewCount?: number;
  dialogueMaxAnsweredtime?: string;
  showGenreImage: boolean;
};

export type CommentProps = {
  count: number;
  puzzleId: number;
};
