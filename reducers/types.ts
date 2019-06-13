export interface ExtendedStore {
  sagaTask: any;
}

export type StateType = {
  [scope: string]: any;
};

export type ActionContentType = {
  type: string;
  payload?: any;
};

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
  keywords: string[];
};

export type GlobalUserType = {
  id?: number;
  username?: string;
  nickname?: string;
};

export type AuthErrorType = {
  type: string;
  message: string;
};
