import React from 'react';

import MultiColBox from 'components/General/MultiColBox';
import PuzzleBrief from 'components/Puzzle/Brief';

import PaginatedQuery from 'components/Hoc/PaginatedQuery';
import { PROFILE_PUZZLES_QUERY } from 'graphql/Queries/Puzzles';

import { ProfilePuzzlesTabProps } from './types';
import {
  ProfilePuzzlesQuery,
  ProfilePuzzlesQueryVariables,
} from 'graphql/Queries/generated/ProfilePuzzlesQuery';
import { order_by } from 'generated/globalTypes';

const ProfilePuzzlesTab = ({ userId }: ProfilePuzzlesTabProps) => (
  <PaginatedQuery<ProfilePuzzlesQuery, ProfilePuzzlesQueryVariables>
    query={PROFILE_PUZZLES_QUERY}
    variables={{
      userId,
      orderBy: [{ id: order_by.desc }],
    }}
    getItemCount={data =>
      (data.sui_hei_puzzle_aggregate &&
        data.sui_hei_puzzle_aggregate.aggregate &&
        data.sui_hei_puzzle_aggregate.aggregate.count) ||
      0
    }
    renderItems={data => {
      if (!data.sui_hei_puzzle) return null;
      return (
        <>
          {data.sui_hei_puzzle.map(puzzle => (
            <MultiColBox key={puzzle.id}>
              <PuzzleBrief puzzle={puzzle} />
            </MultiColBox>
          ))}
        </>
      );
    }}
  />
);

export default ProfilePuzzlesTab;
