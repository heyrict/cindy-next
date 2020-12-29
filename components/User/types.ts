import { SpaceProps } from 'styled-system';
import {
  ColorProps,
  TypographyProps,
  LayoutProps,
  FlexboxProps,
} from 'styled-system';

export type UserBaseProps = SpaceProps &
  ColorProps &
  TypographyProps &
  LayoutProps &
  FlexboxProps;

type Award = {
  id: number;
  name: string;
  description: string;
};

type UserAward = {
  id: number;
  created?: string;
  award: Award;
};

export type InlineUser = {
  id: number;
  icon?: string | null;
  nickname: string;
  username?: string;
  current_user_award?: UserAward | null;
};

export type InlineUserExtra = {
  id: number;
  profile: string;
  date_joined: string;
  last_login: string;
};

export type UserInlineProps = {
  user: InlineUser;
  timestamp?: React.ReactNode;
  [styleProp: string]: any;
};

export type UserColProps = {
  user: InlineUser;
  timestamp?: React.ReactNode;
  [styleProp: string]: any;
};

export type AnonymousUserProps = {
  nickname?: string;
  timestamp?: React.ReactNode;
  [styleProp: string]: any;
};

export type CurrentUserAwardProps = {
  user_award: UserAward;
};

export type UserBriefProfileProps = {
  user: InlineUser;
  directChatWithUser: (userId: number) => void;
};

export const UserPanelDefaultProps = {
  maxLength: 100,
};

export type UserPanelProps = {
  user: InlineUser & InlineUserExtra;
  directChatWithUser: (userId: number) => void;
} & typeof UserPanelDefaultProps;
