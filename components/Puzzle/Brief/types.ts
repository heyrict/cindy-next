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

type StarsAggregateAggregateSum = {
  value: number | null;
};
type StarsAggregateAggregate = {
  count: number | null;
  sum: StarsAggregateAggregateSum | null;
};
type StarsAggregate = {
  aggregate: StarsAggregateAggregate | null;
};

type CommentsAggregateAggregate = {
  count: number | null;
};
type CommentsAggregate = {
  aggregate: CommentsAggregateAggregate | null;
};

type BookmarksAggregateAggregate = {
  count: number | null;
};
type BookmarksAggregate = {
  aggregate: BookmarksAggregateAggregate | null;
};

type DialoguesAggregateAggregateMax = {
  answeredtime: string | number | null;
  created: string | number | null;
};
type DialoguesAggregateAggregate = {
  count: number | null;
  max?: DialoguesAggregateAggregateMax | null;
};
type DialoguesAggregate = {
  aggregate: DialoguesAggregateAggregate | null;
};

export type PuzzleType = {
  id: number;
  genre: number;
  title: string;
  status: number;
  yami: number;
  anonymous?: boolean;
  created: string;
  modified: string;
  sui_hei_user: InlineUser;
  sui_hei_stars_aggregate?: StarsAggregate | null;
  sui_hei_comments_aggregate?: CommentsAggregate | null;
  sui_hei_bookmarks_aggregate?: BookmarksAggregate | null;
  sui_hei_dialogues_aggregate?: DialoguesAggregate | null;
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
  dialogueMaxAnsweredtime?: string;
  dialogueMaxCreated?: string;
  showGenreImage: boolean;
};

export type CommentProps = {
  count: number;
  puzzleId: number;
};
