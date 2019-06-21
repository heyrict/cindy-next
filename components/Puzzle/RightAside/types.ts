import { RightAsideType } from 'reducers/types';

export type RightAsideBoxBaseProps = {
  show: boolean;
};

export type RightAsideBoxButtonProps = {
  on: boolean;
  height?: string;
};

export type RightAsideBoxProps = {
  puzzleMemo: string;
  puzzleMemoHasnew: string;
  rightAside: RightAsideType;
  setRightAside: (rightAside: RightAsideType) => void;
};

export type RightAsideBoxState = {
  mini: boolean;
  showMini: boolean;
};

export type AsideContentsInnerProps = {
  open: boolean;
};

export type AsideContentsProps = {
  puzzleContent: string;
  puzzleMemo: string;
  rightAside: RightAsideType;
  setRightAside: (rightAside: RightAsideType) => void;
};

export type RightAsideProps = {
  route: string;
};
