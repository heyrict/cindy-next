import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import * as addReplayReducer from 'reducers/addReplay';

import { Flex, Box, Button } from 'components/General';
import KeywordButton from './KeywordButton';
import KeywordSelectToolbar from './KeywordSelectToolbar';

const keywordKeysSelector = createSelector(
  state =>
    Object.entries(addReplayReducer.rootSelector(state).keywords).sort(
      (a, b) => a[1].count < b[1].count,
    ),
  sortedKeywords => sortedKeywords.map(([key, value]) => key),
);

const KeywordsSelectWrapper = styled(Flex)`
  flex-wrap: wrap;
  max-height: 15em;
  overflow-y: auto;
`;

const KeywordsSelect = ({ keywordKeys }) => {
  const [collapse, setCollapse] = useState(true);
  return (
    <React.Fragment>
      <KeywordSelectToolbar />
      <KeywordsSelectWrapper>
        {keywordKeys.map(keyword => (
          <KeywordButton key={keyword} keyword={keyword} />
        ))}
      </KeywordsSelectWrapper>
    </React.Fragment>
  );
};

KeywordsSelect.propTypes = {
  keywordKeys: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  keywordKeys: keywordKeysSelector(state),
});

const withRedux = connect(mapStateToProps);

export default withRedux(KeywordsSelect);
