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
        };
  }
>;

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
  question_keywords: Array<ReplayKeywordType>;
};

export type GlobalUserType = {
  id?: number;
  icon?: string | null;
  username?: string;
  nickname?: string;
};

export enum RightAsideType {
  none,
  content,
  memo,
}

export enum AddReplayModeType {
  ROUGH,
  ONE_BY_ONE,
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

export type YandexAPIResponseType = {
  query: any;
  data: Array<{
    dimensions: Array<{ id?: string; name: string }>;
    metrics: Array<number>;
  }>;
  total_rows: number;
  total_rows_rounded: boolean;
  sampled: boolean;
  sample_share: number;
  sample_size: number;
  sample_space: number;
  data_lag: number;
  totals: Array<number>;
  min: Array<number>;
  max: Array<number>;
};

export type YandexAPIErrorType = {
  errors: Array<{ error_type: string; message: string }>;
  code: number;
  message: string;
};

export type YandexUserReportType = YandexAPIResponseType | null;

export type TokenizeServerTokenType = {
  text: string;
  poc: string;
};

export type TokenizeServerDialogueTokensType = {
  id: number;
  tokens: Array<TokenizeServerTokenType>;
};

export type TokenizeServerResponseType = Array<
  TokenizeServerDialogueTokensType
>;
