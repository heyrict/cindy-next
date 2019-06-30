import { GlobalUserType } from 'reducers/types';

export type ProfileContentProps = {
  userId: number;
  profile: string;
  user: GlobalUserType;
};

export type ProfileModeSelectorProps = {
  profile: string;
  userId: number;
};

export type ProfileDisplayProps = {
  profile: string;
};

export type ProfileEditProps = {
  profile: string;
  setEdit: (edit: boolean) => void;
  userId: number;
};

export const ProfileBarDefaultProps = {
  editable: false,
  onClick: () => {},
};

export type ProfileBarProps = typeof ProfileBarDefaultProps;
