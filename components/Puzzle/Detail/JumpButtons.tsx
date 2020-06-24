import React from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';

import { Flex, Box, ButtonTransparent } from 'components/General';
import { GenreText } from 'components/Puzzle/Brief/Genre';

import { useQuery } from '@apollo/react-hooks';
import { PUZZLE_JUMP_BUTTONS_QUERY } from 'graphql/Queries/Puzzles';

import { widthSplits } from './constants';

import { JumpButtonsProps } from './types';
import {
  PuzzleJumpButtonsQuery,
  PuzzleJumpButtonsQueryVariables,
} from 'graphql/Queries/generated/PuzzleJumpButtonsQuery';

const ButtonTransparentA = ButtonTransparent.withComponent('a');

function JumpButtons(props: JumpButtonsProps) {
  const { puzzleId } = props;
  const { data, error, loading } = useQuery<
    PuzzleJumpButtonsQuery,
    PuzzleJumpButtonsQueryVariables
  >(PUZZLE_JUMP_BUTTONS_QUERY, {
    variables: {
      puzzleId,
    },
  });

  if (error) {
    toast.error(`${error.name}: ${error.message}`);
    return null;
  }

  return loading ? null : (
    <Flex
      mx={widthSplits[0]}
      width={1}
      my={1}
      justifyContent="space-between"
      flexWrap="wrap"
    >
      {data && (
        <>
          {data.prev_puzzle.length > 0 && (
            <Box mr="auto">
              <Link
                href="/puzzle/[id]"
                as={`/puzzle/${data.prev_puzzle[0].id}`}
                passHref
              >
                <ButtonTransparentA
                  color="red.7"
                  maxWidth={0.5}
                  p={1}
                  mb={1}
                  display="inline"
                  borderRadius={2}
                >
                  &lt;&lt;
                  <GenreText genre={data.prev_puzzle[0].genre} />
                  {data.prev_puzzle[0].title}
                </ButtonTransparentA>
              </Link>
            </Box>
          )}
          {data.next_puzzle.length > 0 && (
            <Box ml="auto">
              <Link
                href="/puzzle/[id]"
                as={`/puzzle/${data.next_puzzle[0].id}`}
                passHref
              >
                <ButtonTransparentA
                  color="red.7"
                  maxWidth={0.5}
                  p={1}
                  mb={1}
                  display="inline"
                  borderRadius={2}
                >
                  <GenreText genre={data.next_puzzle[0].genre} />
                  {data.next_puzzle[0].title}
                  &gt;&gt;
                </ButtonTransparentA>
              </Link>
            </Box>
          )}
        </>
      )}
    </Flex>
  );
}

export default JumpButtons;
