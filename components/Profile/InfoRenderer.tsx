import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';

import { Mutation } from 'react-apollo';
import PaginatedQuery from 'components/Hoc/PaginatedQuery';
import {
  PROFILE_PUZZLES_QUERY,
  PROFILE_STARS_QUERY,
  PROFILE_BOOKMARKS_QUERY,
} from 'graphql/Queries/Puzzles';
import { CHANGE_HIDE_BOOKMARK_MUTATION } from 'graphql/Mutations/User';

import { FormattedMessage } from 'react-intl';
import userPageMessages from 'messages/pages/user';
import userMessages from 'messages/components/user';
import commonMessages from 'messages/common';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';

import { Box, Flex, Img, Switch } from 'components/General';
import ProfileInfo from './Info';
import ProfileSubbar from './Subbar';
import PuzzleBrief from 'components/Puzzle/Brief';
import PuzzleWithAny from 'components/Puzzle/PuzzleWithAny';
import StarDisplay from 'components/Star/StarDisplay';
import bookmarkGreenIcon from 'svgs/bookmarkGreen.svg';

import { ProfileTabType } from './types';
import { ProfileInfoRendererProps } from './types';
import {
  ProfilePuzzlesQuery,
  ProfilePuzzlesQueryVariables,
} from 'graphql/Queries/generated/ProfilePuzzlesQuery';
import { StateType } from 'reducers/types';
import { order_by } from 'generated/globalTypes';
import {
  ProfileStarsQuery,
  ProfileStarsQueryVariables,
} from 'graphql/Queries/generated/ProfileStarsQuery';
import {
  ProfileBookmarksQuery,
  ProfileBookmarksQueryVariables,
} from 'graphql/Queries/generated/ProfileBookmarksQuery';
import {
  ChangeHideBookmarkMutation,
  ChangeHideBookmarkMutationVariables,
} from 'graphql/Mutations/generated/ChangeHideBookmarkMutation';
import { ApolloError } from 'apollo-client/errors/ApolloError';

const ProfileInfoRenderer = ({
  data,
  error,
  currentUser,
}: ProfileInfoRendererProps) => {
  const [tab, setTab] = useState(ProfileTabType.INFO);
  const notifHdlRef = useRef<React.ReactText | null>(null);

  useEffect(() => {
    setTab(ProfileTabType.INFO);
  }, [data]);

  if (error) {
    toast.error(error.message);
    return null;
  }
  if (!data || !data.sui_hei_user_by_pk) {
    return null;
  }
  const user = data.sui_hei_user_by_pk;

  return (
    <React.Fragment>
      <Box width={1} fontSize={4} py={3}>
        <Box mx={1} px={2} py={4} bg="orange.2" borderRadius={2}>
          <FormattedMessage
            {...userPageMessages.profileOf}
            values={{ nickname: user.nickname }}
          />
        </Box>
      </Box>
      <ProfileSubbar
        hideBookmark={currentUser.id !== user.id && user.hide_bookmark}
        tab={tab}
        setTab={setTab}
      />
      <Flex flexWrap="wrap">
        {tab === ProfileTabType.INFO && (
          <ProfileInfo
            user={{
              ...user,
              received_comments_aggregate: data.received_comments_aggregate,
              received_stars_aggregate: data.received_stars_aggregate,
            }}
          />
        )}
        {tab === ProfileTabType.PUZZLES && (
          <PaginatedQuery<ProfilePuzzlesQuery, ProfilePuzzlesQueryVariables>
            query={PROFILE_PUZZLES_QUERY}
            variables={{
              userId: user.id,
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
              return data.sui_hei_puzzle.map(puzzle => (
                <Box width={[1, 1 / 2, 1, 1 / 2, 1 / 3]}>
                  <PuzzleBrief puzzle={puzzle} />
                </Box>
              ));
            }}
          />
        )}
        {tab === ProfileTabType.STARS && (
          <PaginatedQuery<ProfileStarsQuery, ProfileStarsQueryVariables>
            query={PROFILE_STARS_QUERY}
            variables={{
              userId: user.id,
              orderBy: [{ id: order_by.desc }],
            }}
            getItemCount={data =>
              (data.sui_hei_star_aggregate &&
                data.sui_hei_star_aggregate.aggregate &&
                data.sui_hei_star_aggregate.aggregate.count) ||
              0
            }
            renderItems={data => {
              if (!data.sui_hei_star) return null;
              return data.sui_hei_star.map(star => (
                <Box width={[1, 1 / 2, 1, 1 / 2, 1 / 3]}>
                  <PuzzleWithAny
                    cap={
                      <Flex flexDirection="column-reverse">
                        <StarDisplay value={star.value} size={3} />
                      </Flex>
                    }
                    puzzle={star.sui_hei_puzzle}
                  />
                </Box>
              ));
            }}
          />
        )}
        {tab === ProfileTabType.BOOKMARKS && currentUser.id === user.id && (
          <Mutation<
            ChangeHideBookmarkMutation,
            ChangeHideBookmarkMutationVariables
          >
            mutation={CHANGE_HIDE_BOOKMARK_MUTATION}
          >
            {changeHideBookmark => (
              <Flex width={1} mb={2} alignItems="center">
                <Switch
                  selected={user.hide_bookmark}
                  onClick={() => {
                    changeHideBookmark({
                      variables: {
                        userId: user.id,
                        hideBookmark: !user.hide_bookmark,
                      },
                      optimisticResponse: {
                        update_sui_hei_user: {
                          __typename: 'sui_hei_user_mutation_response',
                          returning: [
                            {
                              __typename: 'sui_hei_user',
                              id: user.id,
                              hide_bookmark: !user.hide_bookmark,
                            },
                          ],
                        },
                      },
                    })
                      .then(res => {
                        if (!res) return;
                        const { errors } = res;
                        if (notifHdlRef.current)
                          toast.dismiss(notifHdlRef.current);
                        if (errors) {
                          toast.error(JSON.stringify(errors));
                          return;
                        }
                        toast.info(
                          <FormattedMessage {...commonMessages.saved} />,
                        );
                      })
                      .catch((e: ApolloError) => {
                        if (notifHdlRef.current)
                          toast.dismiss(notifHdlRef.current);
                        toast.error(JSON.stringify(e.message));
                      });
                    notifHdlRef.current = toast.info(
                      <FormattedMessage {...commonMessages.saving} />,
                    );
                  }}
                />
                <FormattedMessage {...userMessages.hideBookmark} />
              </Flex>
            )}
          </Mutation>
        )}
        {tab === ProfileTabType.BOOKMARKS && (
          <PaginatedQuery<ProfileBookmarksQuery, ProfileBookmarksQueryVariables>
            query={PROFILE_BOOKMARKS_QUERY}
            variables={{
              userId: user.id,
              orderBy: [{ id: order_by.desc }],
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
                <Box width={[1, 1 / 2, 1, 1 / 2, 1 / 3]}>
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
                </Box>
              ));
            }}
          />
        )}
      </Flex>
    </React.Fragment>
  );
};

const mapStateToProps = (state: StateType) => ({
  currentUser: globalReducer.rootSelector(state).user,
});

const withRedux = connect(mapStateToProps);

export default withRedux(ProfileInfoRenderer);
