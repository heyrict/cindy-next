import { InlineUser } from 'components/User/types';
import { Genre, Yami, Status } from 'generated/globalTypes';

export type PuzzleType = {
  id: number;
  title: string;
  genre: Genre;
  yami: Yami;
  anonymous: boolean;
  grotesque: boolean;
  status: Status;
  content: string;
  memo: string;
  dazedOn: string;
  user: InlineUser;
  created: string;
  modified: string;
};

export type QuestionInputWidgetProps = {
  onSubmit: (text: string) => Promise<any>;
  sendQuestionTrigger: number;
};

export type AddQuestionInputProps = {
  puzzleId: number;
  userId?: number;
  incDialogues: () => void;
};

export type ReplayPanelProps = {
  puzzleId: number;
};

export type ContentsFrameType = {
  text: React.ReactNode;
  anonymous?: boolean;
  status?: Status;
  user?: InlineUser;
  created?: string;
  solved?: string;
};

export type MemoFrameType = {
  memo: string;
  toggleRightAsideMemo: () => void;
};

export type PuzzleTitleProps = {
  title: string;
  genre: Genre;
  yami: Yami;
};

export type PuzzleDetailProps = {
  puzzle: PuzzleType;
  userId?: number;
  solvedLongtermYami: boolean;
  showGrotesqueWarning: boolean;
  ignoredGrotesquePuzzles: Array<number>;
  pushIgnoredGrotesquePuzzles: (puzzleId: number) => void;
  setFalseSolvedLongtermYami: () => void;
  setPuzzleContent: (content: string) => void;
  setPuzzleMemo: (memo: string) => void;
};

export type NotLoggedInMessageProps = {
  setTrueLoginModal: () => void;
  setTrueSignupModal: () => void;
};

export type PuzzleTypeWithSolution = PuzzleType & {
  solution: string;
};

export type WithSolutionProps = {
  puzzleId: number;
  children: (solution: string) => JSX.Element;
};

export type ShareFrameType = {
  title: string;
  content: string;
  solved: boolean;
};

export type JumpButtonsProps = {
  puzzleId: number;
};
