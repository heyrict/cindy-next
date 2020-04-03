// Puzzle Detail Page: ^/puzzle/(show)?\d+$
export const puzzleDetailPageRegex = new RegExp('^/puzzle/(show/)?(\\d+)$');

export const onPuzzleDetailPage = (route: string): boolean =>
  Boolean(route.match(puzzleDetailPageRegex));

export const getPuzzleDetailPageId = (route: string): null | number => {
  const returns = route.match(puzzleDetailPageRegex);
  if (returns === null) return null;
  return parseInt(returns[2], 10);
};
