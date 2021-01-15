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
import { useQuery } from '@apollo/client';
import { PUZZLE_STAR_RANKING_QUERY } from 'graphql/Queries/Ranking';
import {
  PuzzleStarRankingQuery,
  PuzzleStarRankingQueryVariables,
} from 'graphql/Queries/generated/PuzzleStarRankingQuery';
import { getRankingDate, ITEMS_PER_PAGE } from './constants';

const loadingPanel = (
  <Panel minHeight="8em" width={1}>
    <Loading centered />
  </Panel>
);

const PuzzleStarRankingRenderer = ({
  shouldLoadMore,
}: PuzzleStarRankingRendererProps) => {
  const { year, month } = getRankingDate();
  const { loading, error, data, refetch, fetchMore } = useQuery<
    PuzzleStarRankingQuery,
    PuzzleStarRankingQueryVariables
  >(PUZZLE_STAR_RANKING_QUERY, {
    variables: {
      limit: ITEMS_PER_PAGE,
      offset: 0,
      year,
      month,
    },
  });
  const [hasMore, setHasMore] = useState(true);

  if (error) {
    toast.error(error.message);
    return <ErrorReload error={error} refetch={refetch} />;
  }
  if (!data || !data.puzzleStarRanking) {
    if (loading) return <Loading centered />;
    return null;
  }

  const puzzles = data.puzzleStarRanking;
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
                offset: data.puzzleStarRanking.length,
              },
            }).then(({ data }) => {
              if (!data || !data.puzzleStarRanking) return;
              if (data.puzzleStarRanking.length < ITEMS_PER_PAGE)
                setHasMore(false);
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
