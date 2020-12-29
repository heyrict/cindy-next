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
      orderBy: [{ id: order_by.desc }],
    }}
    getItemCount={data =>
      (data.star_aggregate &&
        data.star_aggregate.aggregate &&
        data.star_aggregate.aggregate.count) ||
      0
    }
    renderItems={data => {
      if (!data.star) return null;
      return (
        <>
          {data.star.map(star => (
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
