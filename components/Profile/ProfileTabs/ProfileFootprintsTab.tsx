import React from 'react';

import MultiColBox from 'components/General/MultiColBox';
import PuzzleBrief from 'components/Puzzle/Brief';

import PaginatedQuery from 'components/Hoc/PaginatedQuery';
import { PROFILE_FOOTPRINTS_QUERY } from 'graphql/Queries/Puzzles';

import { ProfileFootprintsTabProps } from './types';
import {
  ProfileFootprintsQuery,
  ProfileFootprintsQueryVariables,
} from 'graphql/Queries/generated/ProfileFootprintsQuery';

const ProfileFootprintsTab = ({ userId }: ProfileFootprintsTabProps) => (
  <PaginatedQuery<ProfileFootprintsQuery, ProfileFootprintsQueryVariables>
    query={PROFILE_FOOTPRINTS_QUERY}
    variables={{
      userId,
    }}
    getItemCount={data => data.puzzleFootprintCount}
    renderItems={data => {
      if (!data.puzzleFootprints) return null;
      return (
        <>
          {data.puzzleFootprints.map(puzzle => (
            <MultiColBox key={puzzle.id}>
              <PuzzleBrief puzzle={puzzle} />
            </MultiColBox>
          ))}
        </>
      );
    }}
  />
);

export default ProfileFootprintsTab;
