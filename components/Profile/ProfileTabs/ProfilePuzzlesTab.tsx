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
import { Ordering } from 'generated/globalTypes';

const ProfilePuzzlesTab = ({ userId }: ProfilePuzzlesTabProps) => (
  <PaginatedQuery<ProfilePuzzlesQuery, ProfilePuzzlesQueryVariables>
    query={PROFILE_PUZZLES_QUERY}
    variables={{
      userId,
      orderBy: [{ id: Ordering.DESC }],
    }}
    getItemCount={data => data.puzzleCount}
    renderItems={data => {
      if (!data.puzzles) return null;
      return (
        <>
          {data.puzzles.map(puzzle => (
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
