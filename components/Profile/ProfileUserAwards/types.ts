import { UserAward } from 'graphql/Fragments/generated/UserAward';
import { GlobalUserType } from 'reducers/types';

export type ProfileUserAwardsProps = {
  currentUserAward?: UserAward | null;
  userAwards: Array<UserAward>;
  userId: number;
  user: GlobalUserType;
};

export type UserAwardsDisplayProps = {
  currentUserAward?: UserAward | null;
  userAwards: Array<UserAward>;
};

export type UserAwardsModeSelectorProps = {
  currentUserAward?: UserAward | null;
  userAwards: Array<UserAward>;
  userId: number;
};

export type UserAwardsEditProps = {
  currentUserAward?: UserAward | null;
  setEdit: (edit: boolean) => void;
  userAwards: Array<UserAward>;
  userId: number;
};

export const UserAwardsBarDefaultProps = {
  editable: false,
  onClick: () => {},
};

export type UserAwardsBarProps = typeof UserAwardsBarDefaultProps;
