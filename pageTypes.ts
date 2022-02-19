import { IntlShape } from 'react-intl';
import * as settingReducer from 'reducers/setting';

import { Genre, PuzzleOrder, TagAggrOrder, Yami } from 'generated/globalTypes';
import { CommentsQueryVariables } from 'graphql/Queries/generated/CommentsQuery';
import { GlobalUserType } from 'reducers/types';

export type SearchVariablesStates = {
  title: null | string;
  content: null | string;
  solution: null | string;
  userNickname: null | string;
  genre: null | Genre;
  yami: null | Yami;
  orderBy: Array<PuzzleOrder>;
};

export type AddReplayProps = {
  puzzleId: number;
  intl: IntlShape;
};

export type EULAProps = {
  language: typeof settingReducer.initialState.language;
};

export type LicenseHelpProps = {
  language: typeof settingReducer.initialState.language;
};

export type TagsVariablesStates = {
  name: null | string;
  orderBy: Array<TagAggrOrder>;
};

export type CommentsRendererProps = {
  variables: CommentsQueryVariables;
};

export type AddPuzzleProps = {
  user: GlobalUserType;
  intl: IntlShape;
  setTrueLoginModal: () => void;
  setTrueSignupModal: () => void;
};
