import { GlobalUserType, ToolbarResponsiveMenuType } from 'reducers/types';
import { WithLogoutProps } from 'components/Auth/types';
import { APPLOCALES } from 'settings';

export type ToolbarProps = {
  user: GlobalUserType;
  setLanguage: (lang: typeof APPLOCALES[0]) => void;
  directHasnew: boolean;
};

export type ToolbarResponsiveProps = {
  user: GlobalUserType;
  directHasnew: boolean;
  toolbarMenu: ToolbarResponsiveMenuType;
  toggleToolbarMenu: (value: ToolbarResponsiveMenuType) => void;
  closeToolbarMenu: () => void;
  setLanguage: (lang: typeof APPLOCALES[0]) => void;
};

export type LogoutButtonProps = WithLogoutProps;

export type MessageBoxButtonProps = {
  setTrueDirectModal: () => void;
};

export const ChatroomButtonDefaultProps = {
  color: "gray.1"
}

export type ChatroomButtonProps = {
  channel: string;
} & typeof ChatroomButtonDefaultProps;
