import React from 'react';
import { onPuzzleDetailPage } from 'common/pages';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';

import RightAsideBox from './RightAsideBox';
import AsideContents from './AsideContents';

import { StateType } from 'reducers/types';
import { RightAsideProps } from './types';

const RightAside = ({ route }: RightAsideProps) =>
  onPuzzleDetailPage(route) ? (
    <React.Fragment>
      <RightAsideBox />
      <AsideContents />
    </React.Fragment>
  ) : null;

const mapStateToProps = (state: StateType) => ({
  route: globalReducer.rootSelector(state).route,
});

const withRedux = connect(mapStateToProps);

export default withRedux(RightAside);
