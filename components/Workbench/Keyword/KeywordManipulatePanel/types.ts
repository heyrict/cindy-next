import { AddReplayPanelType, ReplayDialogueType } from 'reducers/types';

export type SelectKeywordButtonProps = {
  keyword: string;
  count: number;
  isActive: boolean;
  toggleKeywordToSelect: (keyword: string) => void;
};

export type KeywordManipulatePanelProps = {
  keywordManipulatePanel: AddReplayPanelType;
};

export type KeywordSelectProps = {
  keywordKeys: Array<[string, number]>;
  filteredQuestions: Array<ReplayDialogueType>;
  keywordFilter: string | null;
  removeKeyword: (keyword: string, fromQuestionId?: number) => void;
};

export type ChoosePanelToolbarProps = {
  keywordManipulatePanel: AddReplayPanelType;
  setKeywordManipulatePanel: (panel: AddReplayPanelType) => void;
};
