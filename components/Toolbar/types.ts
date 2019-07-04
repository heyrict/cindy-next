import { GlobalUserType } from 'reducers/types';
import { WithLogoutProps } from 'components/Auth/types';

export type ToolbarProps = {
  user: GlobalUserType;
};

export enum ToolbarResponsiveMenuType {
  GENERAL_MENU,
  USER_MENU,
}

export type LogoutButtonProps = WithLogoutProps;
