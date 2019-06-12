import { InlineUser } from "components/User/types";

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
  value: number;
};
type StarsAggregateAggregate = {
  count: number;
  sum: StarsAggregateAggregateSum;
};
type StarsAggregate = {
  aggregate: StarsAggregateAggregate;
};

type CommentsAggregateAggregate = {
  count: number;
};
type CommentsAggregate = {
  aggregate: CommentsAggregateAggregate;
};

type BookmarksAggregateAggregate = {
  count: number;
};
type BookmarksAggregate = {
  aggregate: BookmarksAggregateAggregate;
};

type DialoguesAggregateAggregateMax = {
  answeredtime: number;
};
type DialoguesAggregateAggregate = {
  count: number;
  max: DialoguesAggregateAggregateMax;
};
type DialoguesAggregate = {
  aggregate: DialoguesAggregateAggregate;
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
  dazed_on: string;
  sui_hei_user: InlineUser;
  sui_hei_stars_aggregate?: StarsAggregate;
  sui_hei_comments_aggregate?: CommentsAggregate;
  sui_hei_bookmarks_aggregate?: BookmarksAggregate;
  sui_hei_dialogues_aggregate?: DialoguesAggregate;
};

export type PuzzleBriefProps = {
  puzzle: PuzzleType;
  bookmarkCount?: number;
  commentCount?: number;
  starCount?: number;
  starSum?: number;
  dialogueCount?: number;
  dialogueMaxAnsweredtime?: string;
  showGenreImage: boolean;
}
