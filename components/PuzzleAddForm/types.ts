export type PuzzleAddFormVariables = {
  content: string;
  solution: string;
  title: string;
  genre: number;
  yami: number;
  anonymous: boolean;
  grotesque: boolean;
  dazedOn: string
};

export type PuzzleAddFormInnerProps = {
  onSubmit: (variables: PuzzleAddFormVariables) => any;
};
