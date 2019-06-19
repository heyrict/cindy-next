import React from 'react';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';

import RightAsideBox from './RightAsideBox';
import AsideContents from './AsideContents';

import { StateType } from 'reducers/types';
import { RightAsideProps } from './types';

const puzzleDetailPageRegex = new RegExp('^/puzzle/\\d+$');
const onPuzzleDetailPage = (route: string): boolean =>
  Boolean(route.match(puzzleDetailPageRegex));

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
