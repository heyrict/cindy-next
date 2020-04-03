export type KeywordButtonProps = {
  on: boolean;
  content: React.ReactNode;
  onClick: (e: React.MouseEvent) => any;
  width?: any;
};

export enum KeywordType {
  DEFAULT,
  TO_DELETE,
  TO_ADD,
}

export type KeywordBoxProps = {
  keywordType: KeywordType;
};

export type KeywordQuestionBoxProps = {
  prefix?: string;
};
