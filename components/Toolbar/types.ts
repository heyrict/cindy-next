import { GlobalUserType, ToolbarResponsiveMenuType } from 'reducers/types';
import { WithLogoutProps } from 'components/Auth/types';

export type ToolbarProps = {
  user: GlobalUserType;
};

export type ToolbarResponsiveProps = {
  user: GlobalUserType;
  toolbarMenu: ToolbarResponsiveMenuType;
  toggleToolbarMenu: (value: ToolbarResponsiveMenuType) => void;
};

export type LogoutButtonProps = WithLogoutProps;
