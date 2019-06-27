import React from 'react';

import { Box, Flex, ButtonTransparent } from 'components/General';
import RankedPuzzle from 'components/Puzzle/RankedPuzzle';

import { FormattedMessage, FormattedDate } from 'react-intl';
import rankingMessages from 'messages/pages/ranking';
import commonMessages from 'messages/common';

import { PuzzleStarRankingRendererProps } from './types';
import { RankedPuzzleDisplayType } from 'components/Puzzle/types';

const PuzzleStarRankingRenderer = ({
  loading,
  error,
  data,
  variables,
}: PuzzleStarRankingRendererProps) => {
  if (error) return <span>`Error: ${error.message}`</span>;
  if (loading && (!data || !data.sui_hei_puzzle))
    return <span>'Loading...'</span>;

  if (data && data.sui_hei_puzzle) {
    const puzzles = data.sui_hei_puzzle;
    return (
      <Flex
        width={1}
        m={2}
        flexWrap="wrap"
        borderRadius={2}
        border="5px double"
        borderColor="yellow.8"
        bg="yellow.1"
      >
        <Box width={1} p={2} fontSize="1.2em" bg="yellow.6" color="yellow.1">
          <FormattedMessage
            {...rankingMessages.puzzleStarRanking}
            values={{
              date: (
                <FormattedDate
                  value={variables.createdGte as string}
                  year="numeric"
                  month="long"
                />
              ),
            }}
          />
        </Box>
        {puzzles.map((puzzle, index) => (
          <RankedPuzzle
            display={RankedPuzzleDisplayType.star}
            rank={index + 1}
            key={puzzle.id}
            puzzle={puzzle}
          />
        ))}
        <Box width={1} bg="yellow.7" borderRadius={2} m={2} mb={3}>
          <ButtonTransparent
            width={1}
            p={2}
            color="yellow.1"
            textAlign="center"
          >
            <FormattedMessage {...commonMessages.loadMore} />
          </ButtonTransparent>
        </Box>
      </Flex>
    );
  }
  return null;
};

export default PuzzleStarRankingRenderer;
