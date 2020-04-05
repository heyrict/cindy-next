import {
  ReplayDialogueType,
  ReplayKeywordType,
  AddReplayDialogueType,
} from 'reducers/types';
import { KeywordType } from 'components/Workbench/Keyword/shared/types';

export type DialogueManipulatePanelProps = {
  replayDialogueIds: Array<number>;
};

export type DialogueManipulateProps = {
  dialogueId: number;
  dialogue: ReplayDialogueType;
  updateDialogue: (
    dialogueId: number,
    update: (dialogue: ReplayDialogueType) => ReplayDialogueType,
  ) => void;
  deleteDialogue: (dialogueId: number) => void;
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

export type DialogueKeywordQuestionEditBoxProps = {
  prefix: string;
  content: string;
  onSubmit: (newContent: string) => void;
  children?: React.ReactNode;
};

export type DialogueAddProps = {
  addDialogue: (dialogue: AddReplayDialogueType) => void;
};
