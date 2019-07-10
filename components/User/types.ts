import { SpaceProps } from 'styled-system';
import {
  ColorProps,
  TypographyProps,
  LayoutProps,
  FlexboxProps,
} from 'components/General/types';

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
  sui_hei_award: Award;
};

export type InlineUser = {
  id: number;
  icon?: string;
  nickname: string;
  username?: string;
  sui_hei_current_useraward?: UserAward | null;
};

export type UserInlineProps = {
  user: InlineUser;
  timestamp?: React.ReactNode;
} & UserBaseProps;

export type UserColProps = {
  user: InlineUser;
  timestamp?: React.ReactNode;
} & UserBaseProps;

export type AnonymousUserProps = {
  nickname?: string;
  timestamp?: React.ReactNode;
} & UserBaseProps;

export type CurrentUserAwardProps = {
  useraward: UserAward;
};

export type UserBriefProfileProps = {
  user: InlineUser;
};
