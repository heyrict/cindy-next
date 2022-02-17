export type ValueOf<T> = T[keyof T];

export interface ExtendedStore {
  sagaTask: any;
  getState: () => any;
}

export type StateType = {
  [scope: string]: any;
};

export type ActionContentType<
  T extends object = { [K: string]: string }, // action types
  P extends { [K in keyof T]?: any } = {}, // payload types
> = ValueOf<{
  [K in keyof T]: K extends keyof P
    ? {
        type: T[K];
        payload: P[K];
      }
    : {
        type: T[K];
        payload?: any;
      };
}>;

export interface ActionSetType {
  [actionName: string]: (...params: any) => ActionContentType;
}

export type ReplayKeywordCounterType = {
  [keyword: string]: number; // Keyword name: count
};

export type ReplayKeywordType = {
  name: string;
  tfidf_index: number;
};

export type ReplayDialogueType = {
  id: number;
  qno?: number;
  question: string;
  answer: string;
  good: boolean;
  true: boolean;
  milestones: Array<string>;
  dependency: string;
  question_keywords: Array<ReplayKeywordType>;
};

export type AddReplayDialogueType = Pick<
  ReplayDialogueType,
  'question' | 'answer' | 'good' | 'true'
>;

export type GlobalUserType = {
  id: number | null;
  icon: string | null;
  username: string | null;
  nickname: string | null;
};

export enum RightAsideType {
  none,
  content,
  memo,
}

export enum AddReplayModeType {
  ROUGH,
  ONE_BY_ONE,
  MILESTONES,
  DEPENDENCY,
  PUZZLE,
}

export enum AddReplayPanelType {
  KEYWORD_SELECT,
  KEYWORD_EDIT,
  KEYWORD_MERGE,
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

export type TokenizeServerTokenType = {
  text: string;
  poc: string;
};

export type TokenizeServerDialogueTokensType = {
  id: number;
  tokens: Array<TokenizeServerTokenType>;
};

export type TokenizeServerResponseType =
  Array<TokenizeServerDialogueTokensType>;

export type MilestoneType = {
  handle: string;
  name: string;
  description: string;
};
