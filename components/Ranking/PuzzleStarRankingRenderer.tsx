import React, { useState } from 'react';
import { toast } from 'react-toastify';

import Panel from 'components/General/Panel';
import Loading from 'components/General/Loading';
import ErrorReload from 'components/General/ErrorReload';
import LoadMoreVis from 'components/Hoc/LoadMoreVis';
import RankedPuzzle from 'components/Puzzle/RankedPuzzle';

import { RankedPuzzleDisplayType } from 'components/Puzzle/types';
import {
  PuzzleStarRankingRendererProps,
  PuzzleStarRankingRendererDefaultProps,
} from './types';

const loadingPanel = (
  <Panel minHeight="8em" width={1}>
    <Loading centered />
  </Panel>
);

const PuzzleStarRankingRenderer = ({
  loading,
  error,
  data,
  refetch,
  fetchMore,
  shouldLoadMore,
}: PuzzleStarRankingRendererProps) => {
  const [hasMore, setHasMore] = useState(true);

  if (error) {
    toast.error(error.message);
    return <ErrorReload error={error} refetch={refetch} />;
  }
  if (!data || !data.puzzle) {
    if (loading) return <Loading centered />;
    return null;
  }

  const puzzles = data.puzzle;
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
                offset: data.puzzle.length,
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult || !fetchMoreResult.puzzle) return prev;
                if (fetchMoreResult.puzzle.length === 0) setHasMore(false);
                return Object.assign({}, prev, {
                  puzzle: [...prev.puzzle, ...fetchMoreResult.puzzle],
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
};

PuzzleStarRankingRenderer.defaultProps = PuzzleStarRankingRendererDefaultProps;

export default PuzzleStarRankingRenderer;
