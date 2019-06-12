type Award = {
  id: number;
  name: string;
  description: string;
};

type UserAward = {
  id: number;
  created: string;
  sui_hei_award: Award;
};

export type InlineUser = {
  id: number;
  icon?: string;
  nickname: string;
  username?: string;
  sui_hei_current_useraward?: UserAward;
};

export type AnonymousUserProps = {
  nickname?: string;
};
