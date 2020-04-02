import React from 'react';
import styled from 'theme/styled';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import * as addReplayReducer from 'reducers/addReplay';

import { FormattedMessage } from 'react-intl';
import messages from 'messages/components/workbench';

import { Flex, Box } from 'components/General';
import SelectKeywordButton from './SelectKeywordButton';

import { StateType } from 'reducers/types';
import { KeywordSelectProps } from './types';

const keywordKeysSelector = createSelector(
  (state: StateType) =>
    Object.entries(addReplayReducer.rootSelector(state).keywords).sort(
      (a, b) => b[1].count - a[1].count,
    ),
  sortedKeyword => sortedKeyword.map(([key, _value]) => key),
);

const KeywordPanel = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  border-color: ${p => p.theme.colors.yellow[6]};
  border-radius: ${p => p.theme.radii[2]}px;
  border-width: ${p => p.theme.space[1]}px;
  border-style: solid;
  padding: ${p => p.theme.space[2]}px;
  width: 100%;
  margin-bottom: ${p => p.theme.space[2]}px;
`;

const KeywordSelectWrapper = styled(Flex)`
  flex-wrap: wrap;
  border-top: 2px solid ${p => p.theme.colors.yellow[6]};
  padding-top: 0.5em;
  /*max-height: 15em;*/
  overflow-y: auto;
`;

const KeywordSelect = ({ keywordKeys }: KeywordSelectProps) => {
  //const [collapse, setCollapse] = useState(true);
  return (
    <KeywordPanel>
      <Box fontSize={3}>
        <FormattedMessage {...messages.keywords} />
      </Box>
      <KeywordSelectWrapper>
        {keywordKeys.map(keyword => (
          <SelectKeywordButton key={keyword} keyword={keyword} />
        ))}
      </KeywordSelectWrapper>
    </KeywordPanel>
  );
};

const mapStateToProps = (state: StateType) => ({
  keywordKeys: keywordKeysSelector(state),
});

const withRedux = connect(mapStateToProps);

export default withRedux(KeywordSelect);
