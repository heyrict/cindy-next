import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import * as addReplayReducer from 'reducers/addReplay';

import { FormattedMessage } from 'react-intl';
import messages from 'messages/components/workbench';

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

const KeywordsPanel = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  border-color: ${p => p.theme.colors.yellow[6]};
  border-radius: ${p => p.theme.radii[2]}px;
  border-width: ${p => p.theme.space[1]}px;
  border-style: solid;
  padding: ${p => p.theme.space[2]}px;
  width: 100%;
`;

const KeywordsSelectWrapper = styled(Flex)`
  flex-wrap: wrap;
  border-top: 2px solid ${p => p.theme.colors.yellow[6]};
  padding-top: 0.5em;
  max-height: 15em;
  overflow-y: auto;
`;

const KeywordsSelect = ({ keywordKeys }) => {
  const [collapse, setCollapse] = useState(true);
  return (
    <KeywordsPanel>
      <Box fontSize={3}>
        <FormattedMessage {...messages.keywords} />
      </Box>
      <KeywordSelectToolbar />
      <KeywordsSelectWrapper>
        {keywordKeys.map(keyword => (
          <KeywordButton key={keyword} keyword={keyword} />
        ))}
      </KeywordsSelectWrapper>
    </KeywordsPanel>
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
