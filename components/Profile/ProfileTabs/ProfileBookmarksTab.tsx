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
import { Ordering } from 'generated/globalTypes';

const ProfileBookmarksTab = ({ userId }: ProfileBookmarksTabProps) => (
  <PaginatedQuery<ProfileBookmarksQuery, ProfileBookmarksQueryVariables>
    query={PROFILE_BOOKMARKS_QUERY}
    variables={{
      userId,
      orderBy: [{ value: Ordering.DESC }],
    }}
    getItemCount={data => data.bookmarkCount}
    renderItems={data => {
      if (!data.bookmarks) return null;
      return (
        <>
          {data.bookmarks.map(bookmark => (
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
                puzzle={bookmark.puzzle}
              />
            </MultiColBox>
          ))}
        </>
      );
    }}
  />
);

export default ProfileBookmarksTab;
