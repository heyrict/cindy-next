import { GlobalUserType, ToolbarResponsiveMenuType } from 'reducers/types';
import { WithLogoutProps } from 'components/Auth/types';
import { APPLOCALES } from 'settings';

export type ToolbarProps = {
  user: GlobalUserType;
  setLanguage: (lang: typeof APPLOCALES[0]) => void;
};

export type ToolbarResponsiveProps = {
  user: GlobalUserType;
  toolbarMenu: ToolbarResponsiveMenuType;
  toggleToolbarMenu: (value: ToolbarResponsiveMenuType) => void;
  closeToolbarMenu: () => void;
  setLanguage: (lang: typeof APPLOCALES[0]) => void;
};

export type LogoutButtonProps = WithLogoutProps;

export type MessageBoxButtonProps = {
  setTrueDirectModal: () => void;
}
