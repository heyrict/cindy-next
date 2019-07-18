import { GlobalUserType, ToolbarResponsiveMenuType } from 'reducers/types';
import { WithLogoutProps } from 'components/Auth/types';

export type ToolbarProps = {
  user: GlobalUserType;
  setLanguage: (lang: string) => void;
};

export type ToolbarResponsiveProps = {
  user: GlobalUserType;
  toolbarMenu: ToolbarResponsiveMenuType;
  toggleToolbarMenu: (value: ToolbarResponsiveMenuType) => void;
  closeToolbarMenu: () => void;
  setLanguage: (lang: string) => void;
};

export type LogoutButtonProps = WithLogoutProps;
