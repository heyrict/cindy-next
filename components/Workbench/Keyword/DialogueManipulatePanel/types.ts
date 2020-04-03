import { ReplayDialogueType, ReplayKeywordType } from 'reducers/types';
import { KeywordType } from 'components/Workbench/Keyword/shared/types';

export type DialogueManipulatePanelProps = {
  replayDialogueIds: Array<number>;
};

export type DialogueManipulateProps = {
  dialogueId: number;
  dialogue: ReplayDialogueType;
  iRemoveKeywordByThresh: (thresh: number, fromQuestionId: number) => void;
};

export enum DialogueManipulateModeType {
  NORMAL,
  TFIDF,
  EDIT,
}

export type KeywordManipulateProps = {
  dialogueId: number;
  keyword: ReplayKeywordType;
  keywordIndex: number;
  iRenameKeyword: (index: number, renameTo: string, dialogueId: number) => void;
  iRemoveKeyword: (index: number, dialogueId: number) => void;
} & typeof KeywordManipulateDefaultProps;

export const KeywordManipulateDefaultProps = {
  keywordType: KeywordType.DEFAULT,
};

export enum KeywordManipulateModeType {
  NORMAL,
  EDIT,
}

export type KeywordAddProps = {
  iAddKeyword: (keyword: string, dialogueId: number) => void;
  dialogueId: number;
};

export type KeywordsEditProps = {
  dialogueId: number;
  keywordsString: string;
  setMode: (mode: DialogueManipulateModeType) => void;
  setKeywords: (dialogueId: number, keywordsString: string) => void;
};
