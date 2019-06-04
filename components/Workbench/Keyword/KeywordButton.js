import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import * as addReplayReducer from 'reducers/addReplay';

import { Box, Button } from 'components/General';

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

const KeywordButton = ({ keyword, use, count, toggleKeywordUse }) => (
  <Box width={1 / 5} mb={1}>
    <Button
      borderRadius={2}
      width={0.95}
      bg={use ? 'orange.6' : 'orange.3'}
      onClick={() => toggleKeywordUse(keyword)}
    >
      {count}: {keyword}
    </Button>
  </Box>
);

KeywordButton.propTypes = {
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

export default withRedux(KeywordButton);
