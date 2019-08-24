import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { FormattedMessage } from 'react-intl';
import userPageMessages from 'messages/pages/user';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';

import { Box, Flex } from 'components/General';
import ProfileInfo from './Info';
import ProfileSubbar from './Subbar';
import ProfilePuzzlesTab from './ProfileTabs/ProfilePuzzlesTab';
import ProfileStarsTab from './ProfileTabs/ProfileStarsTab';
import ProfileHideBookmarksToggle from './ProfileTabs/ProfileHideBookmarksToggle';
import ProfileBookmarksTab from './ProfileTabs/ProfileBookmarksTab';
import ProfileCommentsTab from './ProfileTabs/ProfileCommentsTab';

import { ProfileTabType } from './types';
import { ProfileInfoRendererProps } from './types';
import { StateType } from 'reducers/types';

const ProfileInfoRenderer = ({
  data,
  error,
  currentUser,
}: ProfileInfoRendererProps) => {
  const [tab, setTab] = useState(ProfileTabType.INFO);

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
          <ProfilePuzzlesTab userId={user.id} />
        )}
        {tab === ProfileTabType.STARS && <ProfileStarsTab userId={user.id} />}
        {tab === ProfileTabType.BOOKMARKS && currentUser.id === user.id && (
          <ProfileHideBookmarksToggle
            userId={user.id}
            hideBookmark={user.hide_bookmark}
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

const withRedux = connect(mapStateToProps);

export default withRedux(ProfileInfoRenderer);
