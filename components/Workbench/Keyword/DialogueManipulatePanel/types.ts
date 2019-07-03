import { ReplayDialogueType, ReplayKeywordType } from 'reducers/types';

export type DialogueManipulatePanelProps = {
  replayDialogueIds: Array<number>;
};

export type DialogueManipulateProps = {
  dialogueId: number;
  dialogue: ReplayDialogueType;
};

export type KeywordManipulateProps = {
  dialogueId: number;
  keyword: ReplayKeywordType;
  keywordIndex: number;
  iRenameKeyword: (index: number, renameTo: string, dialogueId: number) => void;
  iRemoveKeyword: (index: number, dialogueId: number) => void;
};
