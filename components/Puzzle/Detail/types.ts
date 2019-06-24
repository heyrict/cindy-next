import { InlineUser } from 'components/User/types';

export type PuzzleType = {
  id: number;
  title: string;
  genre: number;
  yami: number;
  anonymous: boolean;
  grotesque: boolean;
  status: number;
  content: string;
  solution: string;
  memo: string;
  dazed_on: string;
  sui_hei_user: InlineUser;
  created: string;
  modified: string;
};

export type QuestionInputWidgetProps = {
  onSubmit: (text: string) => Promise<any>;
};

export type AddQuestionInputProps = {
  puzzleId: number;
  userId?: number;
};

export type BookmarkPanelProps = {
  puzzleId: number;
};

export type CommentPanelProps = {
  puzzleId: number;
};

export type StarPanelProps = {
  puzzleId: number;
};

export type ReplayPanelProps = {
  puzzleId: number;
};

export type ContentsFrameType = {
  text: React.ReactNode;
  anonymous?: boolean;
  status?: number;
  user?: InlineUser;
  created?: string;
  solved?: string;
};

export type MemoFrameType = {
  memo: string;
}

export type PuzzleTitleProps = {
  title: string;
  genre: number;
  yami: number;
};

export type PuzzleDetailProps = {
  puzzle: PuzzleType;
  userId?: number;
  solvedLongtermYami: boolean;
  setFalseSolvedLongtermYami: () => void;
  setPuzzleContent: (content: string) => void;
  setPuzzleMemo: (memo: string) => void;
};
