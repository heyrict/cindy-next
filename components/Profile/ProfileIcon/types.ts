import { GlobalUserType } from 'reducers/types';

export type ProfileIconProps = {
  userId: number;
  user: GlobalUserType;
  icon?: string | null;
  setUserIcon: (icon: string | null) => void;
};
