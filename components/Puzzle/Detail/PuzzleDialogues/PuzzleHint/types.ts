import { HintShared } from 'graphql/Fragments/generated/HintShared';
import { GlobalUserType } from 'reducers/types';
import { InlineUser } from 'components/User/types';

export type PuzzleHintProps = {
  hint: HintShared;
  user: GlobalUserType;
  puzzleUser: InlineUser;
};

export type HintDisplayProps = {
  hint: HintShared;
};

export type HintModeSelectorProps = {
  hint: HintShared;
};

export type HintEditProps = {
  hint: HintShared;
  setEdit: (edit: boolean) => void;
};
