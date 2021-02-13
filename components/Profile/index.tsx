import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import multiavatar from '@multiavatar/multiavatar';

import { FormattedMessage } from 'react-intl';
import userPageMessages from 'messages/pages/user';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';
import * as directReducer from 'reducers/direct';

import { useQuery } from '@apollo/client';
import { USER_QUERY } from 'graphql/Queries/User';

import { Box, Flex, Img, ButtonTransparent } from 'components/General';
import Loading from 'components/General/Loading';
import ProfileInfo from './Info';
import ProfileSubbar from './Subbar';
import ProfilePuzzlesTab from './ProfileTabs/ProfilePuzzlesTab';
import ProfileStarsTab from './ProfileTabs/ProfileStarsTab';
import ProfileHideBookmarksToggle from './ProfileTabs/ProfileHideBookmarksToggle';
import ProfileBookmarksTab from './ProfileTabs/ProfileBookmarksTab';
import ProfileCommentsTab from './ProfileTabs/ProfileCommentsTab';
import ProfileFootprintsTab from './ProfileTabs/ProfileFootprintsTab';
import messageIcon from 'svgs/message.svg';

import { ProfileTabType } from './types';
import { ProfileProps } from './types';
import { StateType } from 'reducers/types';
import { ActionContentType } from 'reducers/types';
import {
  UserQuery,
  UserQueryVariables,
} from 'graphql/Queries/generated/UserQuery';

const ProfileInfoRenderer = ({
  userId,
  currentUser,
  directChatWithUser,
}: ProfileProps) => {
  const [tab, setTab] = useState(ProfileTabType.INFO);
  const { data, loading, error } = useQuery<UserQuery, UserQueryVariables>(
    USER_QUERY,
    {
      variables: {
        id: userId,
      },
      fetchPolicy: 'cache-first',
    },
  );

  useEffect(() => {
    setTab(ProfileTabType.INFO);
  }, [data]);

  if (error) {
    toast.error(error.message);
    return null;
  }
  if (!data || !data.user) {
    if (loading) return <Loading centered />;
    return null;
  }
  const user = data.user;

  return (
    <React.Fragment>
      <Box width={1} py={3}>
        <Flex
          mx={1}
          px={2}
          py={4}
          bg="orange.2"
          borderRadius={2}
          flexDirection="row"
        >
          {user.icon &&
            (user.icon.startsWith('multiavatar://') ? (
              <Box
                mx={3}
                size="md"
                border="1px solid"
                borderRadius={4}
                dangerouslySetInnerHTML={{
                  __html: multiavatar(user.icon.slice(14), true),
                }}
              />
            ) : (
              <Img
                mx={3}
                size="md"
                border="1px solid"
                borderRadius={4}
                src={user.icon}
              />
            ))}
          <Box mr="auto">
            <Box width={1} fontSize={4}>
              <FormattedMessage
                {...userPageMessages.profileOf}
                values={{ nickname: user.nickname }}
              />
            </Box>
            <Box width={1} fontSize={2} mt={1}>
              <ButtonTransparent
                p={1}
                onClick={() => directChatWithUser(user.id)}
              >
                <Img height="xxs" src={messageIcon} alt="profile" />
              </ButtonTransparent>
            </Box>
          </Box>
        </Flex>
      </Box>
      <ProfileSubbar
        hideBookmark={currentUser.id !== user.id && user.hideBookmark}
        tab={tab}
        setTab={setTab}
      />
      <Flex flexWrap="wrap">
        {tab === ProfileTabType.INFO && <ProfileInfo user={user} />}
        {tab === ProfileTabType.FOOTPRINTS && (
          <ProfileFootprintsTab userId={user.id} />
        )}
        {tab === ProfileTabType.PUZZLES && (
          <ProfilePuzzlesTab userId={user.id} />
        )}
        {tab === ProfileTabType.STARS && <ProfileStarsTab userId={user.id} />}
        {tab === ProfileTabType.BOOKMARKS && currentUser.id === user.id && (
          <ProfileHideBookmarksToggle
            userId={user.id}
            hideBookmark={user.hideBookmark}
          />
        )}
        {tab === ProfileTabType.BOOKMARKS && (
          <ProfileBookmarksTab userId={user.id} />
        )}
        {tab === ProfileTabType.COMMENTS && (
          <ProfileCommentsTab userId={user.id} />
        )}
      </Flex>
    </React.Fragment>
  );
};

const mapStateToProps = (state: StateType) => ({
  currentUser: globalReducer.rootSelector(state).user,
});

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  directChatWithUser: (userId: number) =>
    dispatch(directReducer.actions.directChatWithUser(userId)),
});

const withRedux = connect(mapStateToProps, mapDispatchToProps);

export default withRedux(ProfileInfoRenderer);
