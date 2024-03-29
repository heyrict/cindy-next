export const PuzzleStarRankingRendererDefaultProps = {
  shouldLoadMore: false,
};

export type PuzzleStarRankingRendererProps = {
  year: number | null;
  month: number | null;
} & typeof PuzzleStarRankingRendererDefaultProps;

export const UserDialogueRankingRendererDefaultProps = {
  shouldLoadMore: false,
};

export type UserDialogueRankingRendererProps =
  typeof UserDialogueRankingRendererDefaultProps;

export const UserPuzzleRankingRendererDefaultProps = {
  shouldLoadMore: false,
};

export type UserPuzzleRankingRendererProps =
  typeof UserPuzzleRankingRendererDefaultProps;
