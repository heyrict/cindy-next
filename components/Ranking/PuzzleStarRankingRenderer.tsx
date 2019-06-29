import React, { useState } from 'react';
import { toast } from 'react-toastify';

import LoadMoreVis from 'components/Hoc/LoadMoreVis';
import RankedPuzzle from 'components/Puzzle/RankedPuzzle';

import {
  PuzzleStarRankingRendererProps,
  PuzzleStarRankingRendererDefaultProps,
} from './types';
import { RankedPuzzleDisplayType } from 'components/Puzzle/types';
import Panel from 'components/General/Panel';

const loadingPanel = (
  <Panel minHeight="8em" width={1}>
    Loading...
  </Panel>
);

const PuzzleStarRankingRenderer = ({
  loading,
  error,
  data,
  fetchMore,
  shouldLoadMore,
}: PuzzleStarRankingRendererProps) => {
  const [hasMore, setHasMore] = useState(true);

  if (error) {
    toast.error(error.message);
    return null;
  }
  if (loading && (!data || !data.sui_hei_puzzle))
    return <span>'Loading...'</span>;

  if (data && data.sui_hei_puzzle) {
    const puzzles = data.sui_hei_puzzle;
    return (
      <React.Fragment>
        {puzzles.map((puzzle, index) => (
          <RankedPuzzle
            display={RankedPuzzleDisplayType.star}
            rank={index + 1}
            key={puzzle.id}
            puzzle={puzzle}
          />
        ))}
        {shouldLoadMore && hasMore && (
          <LoadMoreVis
            wait={0}
            loadMore={() =>
              fetchMore({
                variables: {
                  offset: data.sui_hei_puzzle.length,
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                  if (!fetchMoreResult || !fetchMoreResult.sui_hei_puzzle)
                    return prev;
                  if (fetchMoreResult.sui_hei_puzzle.length === 0)
                    setHasMore(false);
                  return Object.assign({}, prev, {
                    sui_hei_puzzle: [
                      ...prev.sui_hei_puzzle,
                      ...fetchMoreResult.sui_hei_puzzle,
                    ],
                  });
                },
              })
            }
          >
            {loadingPanel}
          </LoadMoreVis>
        )}
      </React.Fragment>
    );
  }
  return null;
};

PuzzleStarRankingRenderer.defaultProps = PuzzleStarRankingRendererDefaultProps;

export default PuzzleStarRankingRenderer;
