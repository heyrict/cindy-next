import React from 'react';
import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';

import { Flex } from 'components/General';
import UserAwardsDisplay from './UserAwardsDisplay';
import UserAwardsBar from './UserAwardsBar';
import UserAwardsModeSelector from './UserAwardsModeSelector';

import { ProfileUserAwardsProps } from './types';
import { StateType } from 'reducers/types';

const ProfileUserAwards = ({
  user,
  userId,
  userAwards,
  currentUserAward,
}: ProfileUserAwardsProps) => {
  return (
    <Flex flexWrap="wrap" width={1}>
      {userId === user.id ? (
        <UserAwardsModeSelector
          userId={userId}
          userAwards={userAwards}
          currentUserAward={currentUserAward}
        />
      ) : (
        <React.Fragment>
          <UserAwardsBar />
          <UserAwardsDisplay
            userAwards={userAwards}
            currentUserAward={currentUserAward}
          />
        </React.Fragment>
      )}
    </Flex>
  );
};

const mapStateToProps = (state: StateType) => ({
  user: globalReducer.rootSelector(state).user,
});

const withRedux = connect(mapStateToProps);

export default withRedux(ProfileUserAwards);
