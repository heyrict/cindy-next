import React from 'react';

import PaginatedQuery from 'components/Hoc/PaginatedQuery';
import { PROFILE_BOOKMARKS_QUERY } from 'graphql/Queries/Bookmark';

import Img from 'components/General/Img';
import Box from 'components/General/Box';
import MultiColBox from 'components/General/MultiColBox';
import PuzzleWithAny from 'components/Puzzle/PuzzleWithAny';
import bookmarkGreenIcon from 'svgs/bookmarkGreen.svg';

import { ProfileBookmarksTabProps } from './types';
import {
  ProfileBookmarksQuery,
  ProfileBookmarksQueryVariables,
} from 'graphql/Queries/generated/ProfileBookmarksQuery';
import { order_by } from 'generated/globalTypes';

const ProfileBookmarksTab = ({ userId }: ProfileBookmarksTabProps) => (
  <PaginatedQuery<ProfileBookmarksQuery, ProfileBookmarksQueryVariables>
    query={PROFILE_BOOKMARKS_QUERY}
    variables={{
      userId,
      orderBy: [{ value: order_by.desc }],
    }}
    getItemCount={data =>
      (data.sui_hei_bookmark_aggregate &&
        data.sui_hei_bookmark_aggregate.aggregate &&
        data.sui_hei_bookmark_aggregate.aggregate.count) ||
      0
    }
    renderItems={data => {
      if (!data.sui_hei_bookmark) return null;
      return data.sui_hei_bookmark.map(bookmark => (
        <MultiColBox key={bookmark.id}>
          <PuzzleWithAny
            cap={
              <Box color="green.6">
                <Img src={bookmarkGreenIcon} height="xxs" />
                <Box display="inline-box" px={1}>
                  {bookmark.value}
                </Box>
              </Box>
            }
            puzzle={bookmark.sui_hei_puzzle}
          />
        </MultiColBox>
      ));
    }}
  />
);

export default ProfileBookmarksTab;
