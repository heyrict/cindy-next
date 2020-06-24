import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import * as addReplayReducer from 'reducers/addReplay';

import KeywordButton from '../shared/KeywordButton';

import {
  StateType,
  ActionContentType,
  AddReplayPanelType,
} from 'reducers/types';
import { SelectKeywordButtonProps } from './types';

const useSelector = createSelector(
  (state: StateType) => addReplayReducer.rootSelector(state).keywordToSelect,
  (_state: StateType, props: Pick<SelectKeywordButtonProps, 'keyword'>) =>
    props.keyword,
  (selectedKeyword, keyword) => selectedKeyword === keyword,
);

const SelectKeywordButton = ({
  keyword,
  isActive,
  count,
  toggleKeywordToSelect,
}: SelectKeywordButtonProps) => (
  <KeywordButton
    on={isActive}
    content={`${count}: ${keyword}`}
    onClick={() => toggleKeywordToSelect(keyword)}
  />
);

const mapStateToProps = (
  state: StateType,
  ownProps: Pick<SelectKeywordButtonProps, 'keyword'>,
) => ({
  isActive: useSelector(state, ownProps),
});

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  toggleKeywordToSelect: (keyword: string) =>
    dispatch(
      addReplayReducer.actions.toggleSelectedKeyword(
        keyword,
        AddReplayPanelType.KEYWORD_SELECT,
      ),
    ),
});

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRedux(SelectKeywordButton);
