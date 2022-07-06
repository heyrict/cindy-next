import { GlobalUserType, ToolbarResponsiveMenuType } from 'reducers/types';
import { WithLogoutProps } from 'components/Auth/types';
import { APPLOCALES } from 'settings';
import { InlineUser } from 'components/User/types';

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
  color: 'gray.1',
};

export type ChatroomButtonProps = typeof ChatroomButtonDefaultProps;

export const IconDisplayDefaultProps = {
  iconOnly: false,
};

export type IconDisplayProps = {
  user: GlobalUserType;
} & typeof IconDisplayDefaultProps;

export type UserIconDisplayProps = {
  user: InlineUser;
} & typeof IconDisplayDefaultProps;
