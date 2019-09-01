import { ToolbarResponsiveMenuType } from 'reducers/types';

export type FixedButtonBaseProps = {
  position?: 'left' | 'right';
  show: boolean;
};

export type FixedButtonProps = {
  children: React.ReactNode;
  position?: 'left' | 'right';
  [buttonProp: string]: any;
};

export type ChatBoxInnerProps = {
  open: boolean;
};

export type ChatBoxProps = {
  children: React.ReactNode;
  aside: boolean;
  chatHasnew: boolean;
  setTrueAside: () => void;
  setFalseAside: () => void;
};

export type ToolbarBoxBaseProps = {
  show: boolean;
};

export type LayoutProps = {
  children: React.ReactElement;
  pushNotification: boolean;
  route: string;
  setFalsePushNotification: () => void;
  appInit: () => void;
  [prop: string]: any;
};

export type ToolbarBoxProps = {
  toolbarMenu: ToolbarResponsiveMenuType;
};

export type FooterProps = {
  children: React.ReactElement;
};
