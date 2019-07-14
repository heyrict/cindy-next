import React from 'react';

import AllAwards from './AllAwards';
import AllAwardsWithUser from './AllAwardsWithUser';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';

import { StateType } from 'reducers/types';
import { AwardsRendererProps } from './types';

const AwardsRenderer = ({ user }: AwardsRendererProps) => {
  if (user.id) {
    return <AllAwardsWithUser userId={user.id} />;
  }
  return <AllAwards />;
};

const mapStateToProps = (state: StateType) => ({
  user: globalReducer.rootSelector(state).user,
});

const withRedux = connect(mapStateToProps);

export default withRedux(AwardsRenderer);
