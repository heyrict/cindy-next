export type ValueOf<T> = T[keyof T];

export interface ExtendedStore {
  sagaTask: any;
}

export type StateType = {
  [scope: string]: any;
};

export type ActionContentType<
  T extends object = { [K: string]: string }, // action types
  P extends { [K in keyof T]?: any } = {} // payload types
> = ValueOf<
  {
    [K in keyof T]: K extends keyof P
      ? {
          type: T[K];
          payload: P[K];
        }
      : {
          type: T[K];
          payload?: any;
        }
  }
>;

export interface ActionSetType {
  [actionName: string]: (...params: any) => ActionContentType;
}

export type ReplayKeywordStatusType = {
  count: number;
  use: boolean;
};

export type ReplayKeywordsType = {
  [keyword: string]: ReplayKeywordStatusType;
};

export type ReplayDialogueType = {
  question: string;
  question_keywords: string[];
};

export type GlobalUserType = {
  id?: number;
  username?: string;
  nickname?: string;
};

export enum RightAsideType {
  none,
  content,
  memo,
}

export enum ToolbarResponsiveMenuType {
  NULL,
  GENERAL_MENU,
  USER_MENU,
}

export enum SendMessageTriggerType {
  NONE = 0b0,
  ON_ENTER = 0b10,
  ON_CTRL_ENTER = 0b100,
  ON_SHIFT_ENTER = 0b1000,
}
