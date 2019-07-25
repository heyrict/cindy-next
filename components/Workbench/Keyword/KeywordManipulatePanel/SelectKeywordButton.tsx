import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import * as addReplayReducer from 'reducers/addReplay';

import KeywordButton from '../shared/KeywordButton';

import { StateType, ActionContentType } from 'reducers/types';
import { SelectKeywordButtonProps } from './types';

const useSelector = createSelector(
  (state: StateType) => addReplayReducer.rootSelector(state).keywords,
  (_state: StateType, props: Pick<SelectKeywordButtonProps, 'keyword'>) =>
    props.keyword,
  (keywords, key) => keywords[key].use,
);

const countSelector = createSelector(
  (state: StateType) => addReplayReducer.rootSelector(state).keywords,
  (_state: StateType, props: Pick<SelectKeywordButtonProps, 'keyword'>) =>
    props.keyword,
  (keywords, key) => keywords[key].count,
);

const SelectKeywordButton = ({
  keyword,
  use,
  count,
  toggleKeywordUse,
}: SelectKeywordButtonProps) => (
  <KeywordButton
    on={use}
    content={`${count}: ${keyword}`}
    onClick={() => toggleKeywordUse(keyword)}
  />
);

const mapStateToProps = (
  state: StateType,
  ownProps: Pick<SelectKeywordButtonProps, 'keyword'>,
) => ({
  use: useSelector(state, ownProps),
  count: countSelector(state, ownProps),
});

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  toggleKeywordUse: (keyword: string) =>
    dispatch(addReplayReducer.actions.toggleKeywordUse(keyword)),
});

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRedux(SelectKeywordButton);
