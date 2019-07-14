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
  qno?: number;
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
