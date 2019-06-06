import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import KeywordButton from '../shared/KeywordButton';

const useSelector = createSelector(
  state => addReplayReducer.rootSelector(state).keywords,
  (state, props) => props.keyword,
  (keywords, key) => keywords[key].use,
);

const countSelector = createSelector(
  state => addReplayReducer.rootSelector(state).keywords,
  (state, props) => props.keyword,
  (keywords, key) => keywords[key].count,
);

const SelectKeywordButton = ({ keyword, use, count, toggleKeywordUse }) => (
  <KeywordButton
    on={use}
    content={`${count}: ${keyword}`}
    onClick={() => toggleKeywordUse(keyword)}
  />
);

SelectKeywordButton.propTypes = {
  keyword: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  use: PropTypes.bool.isRequired,
  toggleKeywordUse: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  use: useSelector(state, ownProps),
  count: countSelector(state, ownProps),
});

const mapDispatchToProps = dispatch => ({
  toggleKeywordUse: keyword =>
    dispatch(addReplayReducer.actions.toggleKeywordUse(keyword)),
});

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRedux(SelectKeywordButton);
