import React from 'react';

import { Box, Input, Flex } from 'components/General';

import { FormattedMessage } from 'react-intl';
import commonMessages from 'messages/common';

import { connect } from 'react-redux';
import * as addReplayReducer from 'reducers/addReplay';

import { ActionContentType, StateType } from 'reducers/types';
import { KeywordFilterProps } from './types';

const KeywordFilter = ({
  keywordFilter,
  setKeywordFilter,
}: KeywordFilterProps) => (
  <Flex width={1} alignItems="center">
    <Box px={[2, '5%', 3, '8%']}>
      <FormattedMessage {...commonMessages.filter} />
    </Box>
    <Input
      value={keywordFilter}
      onChange={e => setKeywordFilter(e.target.value)}
    />
  </Flex>
);

const mapStateToProps = (state: StateType) => ({
  keywordFilter: addReplayReducer.rootSelector(state).keywordFilter,
});

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  setKeywordFilter: (value: string) =>
    dispatch(addReplayReducer.actions.setKeywordFilter(value)),
});

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRedux(KeywordFilter);
