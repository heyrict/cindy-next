import { InlineUser } from 'components/User/types';

export type HintType = {
  content: string;
  created: string;
};

export type PuzzleHintProps = {
  hint: HintType;
};
