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
import { RenameKeywordButtonProps } from './types';

const useSelector = createSelector(
  (state: StateType) => addReplayReducer.rootSelector(state).keywordToEdit,
  (_state: StateType, props: Pick<RenameKeywordButtonProps, 'keyword'>) => props.keyword,
  (selectedKeyword, keyword) => selectedKeyword === keyword,
);

const RenameKeywordButton = ({
  keyword,
  isActive,
  count,
  toggleKeywordToSelect,
}: RenameKeywordButtonProps) => (
  <KeywordButton
    on={isActive}
    content={`${count}: ${keyword}`}
    onClick={() => toggleKeywordToSelect(keyword)}
  />
);

const mapStateToProps = (
  state: StateType,
  ownProps: Pick<RenameKeywordButtonProps, 'keyword'>,
) => ({
  isActive: useSelector(state, ownProps),
});

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  toggleKeywordToSelect: (keyword: string) =>
    dispatch(
      addReplayReducer.actions.toggleSelectedKeyword(
        keyword,
        AddReplayPanelType.KEYWORD_EDIT,
      ),
    ),
});

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRedux(RenameKeywordButton);
