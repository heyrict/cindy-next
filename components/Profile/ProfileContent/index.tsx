import React from 'react';
import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';

import { Flex } from 'components/General';
import ProfileModeSelector from './ProfileModeSelector';
import ProfileDisplay from './ProfileDisplay';
import ProfileBar from './ProfileBar';

import { ProfileContentProps } from './types';
import { StateType } from 'reducers/types';

const ProfileContent = ({ userId, user, profile }: ProfileContentProps) => {
  return (
    <Flex flexWrap="wrap" width={1} px={1}>
      {userId === user.id ? (
        <ProfileModeSelector userId={userId} profile={profile} />
      ) : (
        <React.Fragment>
          <ProfileBar />
          <ProfileDisplay profile={profile} />
        </React.Fragment>
      )}
    </Flex>
  );
};

const mapStateToProps = (state: StateType) => ({
  user: globalReducer.rootSelector(state).user,
});

const withRedux = connect(mapStateToProps);

export default withRedux(ProfileContent);
