export type SelectKeywordButtonProps = {
  keyword: string;
  count: number;
  use: boolean;
  toggleKeywordUse: (keyword: string) => void;
};

export enum PanelEnum {
  SELECT,
  MERGE,
  RENAME,
}

export type KeywordManipulatePanelProps = {
  keywordManipulatePanel: PanelEnum;
};

export type KeywordSelectProps = {
  keywordKeys: Array<string>,
}

export type ChoosePanelToolbarProps = {
  keywordManipulatePanel: PanelEnum;
  setKeywordManipulatePanel: (panel: PanelEnum) => void;
}
