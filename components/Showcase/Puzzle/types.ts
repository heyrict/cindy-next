export const PuzzleShowcaseDefaultProps = {
  wait: 2000,
};

export type PuzzleShowcaseProps = {
  key?: string;
} & typeof PuzzleShowcaseDefaultProps;

export type PuzzleShowcaseStates = {
  stage: PuzzleShowcaseStages;
};

export enum PuzzleShowcaseStages {
  ONLY_CONTENT = 0,
  Q1,
  A1,
  Q2,
  A2,
}
