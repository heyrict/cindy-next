import { InlineUser } from 'components/User/types';
import { RightAsideType } from 'reducers/types';

export type PuzzleType = {
  id: number;
  title: string;
  genre: number;
  yami: number;
  anonymous: boolean;
  grotesque: boolean;
  status: number;
  content: string;
  memo: string;
  dazed_on: string;
  sui_hei_user: InlineUser;
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
  status?: number;
  user?: InlineUser;
  created?: string;
  solved?: string;
};

export type MemoFrameType = {
  memo: string;
  setRightAside: (rightAside: RightAsideType) => void;
};

export type PuzzleTitleProps = {
  title: string;
  genre: number;
  yami: number;
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
