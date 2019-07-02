import { AddReplayPanelType, ReplayDialogueType } from 'reducers/types';

export type SelectKeywordButtonProps = {
  keyword: string;
  count: number;
  isActive: boolean;
  toggleKeywordToSelect: (keyword: string) => void;
};

export type RenameKeywordButtonProps = {
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
  filteredDialogues: Array<ReplayDialogueType>;
  keywordFilter: string | null;
  removeKeyword: (keyword: string, fromQuestionId?: number) => void;
};

export type KeywordRenameProps = {
  keywordKeys: Array<[string, number]>;
  filteredDialogues: Array<ReplayDialogueType>;
  keywordFilter: string | null;
  renameKeyword: (keyword: string, fromQuestionId?: number) => void;
};

export type QuestionRenameProps = {
  dialogue: ReplayDialogueType;
  keywordFilter: string | null;
  renameTo: string;
  renameKeyword: (keyword: string, fromQuestionId?: number) => void;
};

export type ChoosePanelToolbarProps = {
  keywordManipulatePanel: AddReplayPanelType;
  setKeywordManipulatePanel: (panel: AddReplayPanelType) => void;
};

export type SetRenameToBoxProps = {
  keywordFilter: string | null;
  renameTo: string;
  setRenameTo: (value: string) => void;
}
