import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import * as addReplayReducer from 'reducers/addReplay';

import KeywordButton from '../shared/KeywordButton';

import { StateType, ActionContentType } from 'reducers/types';
import { MergeKeywordButtonProps } from './types';

const useSelector = createSelector(
  (state: StateType) => addReplayReducer.rootSelector(state).keywordToMerge,
  (_state: StateType, props: MergeKeywordButtonProps) => props.keyword,
  (_state: StateType, props: MergeKeywordButtonProps) => props.index,
  (selectedKeywords, keyword, index) => selectedKeywords[index] === keyword,
);

const MergeKeywordButton = ({
  keyword,
  isActive,
  count,
  index,
  toggleKeywordToMerge,
}: MergeKeywordButtonProps) => (
  <KeywordButton
    on={isActive}
    width={[1 / 2, 1 / 3, 1 / 2, 1 / 3]}
    content={`${count}: ${keyword}`}
    onClick={() => toggleKeywordToMerge(keyword, index)}
  />
);

const mapStateToProps = (
  state: StateType,
  ownProps: MergeKeywordButtonProps,
) => ({
  isActive: useSelector(state, ownProps),
});

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  toggleKeywordToMerge: (keyword: string, index: number) =>
    dispatch(
      addReplayReducer.actions.toggleSelectedKeywordToMerge(keyword, index),
    ),
});

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRedux(MergeKeywordButton);
