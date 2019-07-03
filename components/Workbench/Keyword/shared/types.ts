export type KeywordButtonProps = {
  on: boolean;
  content: string;
  onClick: any;
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
