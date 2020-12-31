import React from 'react';

import Flex from 'components/General/Flex';
import MultiColBox from 'components/General/MultiColBox';
import StarDisplay from 'components/Star/StarDisplay';
import PuzzleWithAny from 'components/Puzzle/PuzzleWithAny';

import PaginatedQuery from 'components/Hoc/PaginatedQuery';
import { PROFILE_STARS_QUERY } from 'graphql/Queries/Star';

import { ProfileStarsTabProps } from './types';
import {
  ProfileStarsQuery,
  ProfileStarsQueryVariables,
} from 'graphql/Queries/generated/ProfileStarsQuery';
import { order_by } from 'generated/globalTypes';

const ProfileStarsTab = ({ userId }: ProfileStarsTabProps) => (
  <PaginatedQuery<ProfileStarsQuery, ProfileStarsQueryVariables>
    query={PROFILE_STARS_QUERY}
    variables={{
      userId,
    }}
    getItemCount={data => data.starCount}
    renderItems={data => {
      if (!data.stars) return null;
      return (
        <>
          {data.stars.map(star => (
            <MultiColBox key={star.id}>
              <PuzzleWithAny
                cap={
                  <Flex flexDirection="column-reverse">
                    <StarDisplay value={star.value} size={3} />
                  </Flex>
                }
                puzzle={star.puzzle}
              />
            </MultiColBox>
          ))}
        </>
      );
    }}
  />
);

export default ProfileStarsTab;
