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

export type ReplayKeywordCounterType = {
  [keyword: string]: number; // Keyword name: count
};

export type ReplayKeywordType = {
  name: string;
};

export type ReplayDialogueType = {
  id: number;
  question: string;
  question_keywords: Array<ReplayKeywordType>;
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

export enum AddReplayPanelType {
  KEYWORD_SELECT,
  KEYWORD_EDIT,
  KEYWORD_MERGE,
}
