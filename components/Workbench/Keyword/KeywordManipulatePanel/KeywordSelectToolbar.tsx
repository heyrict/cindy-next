import React from 'react';
import PropTypes from 'prop-types';
import styled from 'theme/styled';
import { Flex, Box, Button, Input } from 'components/General';
import { connect } from 'react-redux';
import * as addReplayReducer from 'reducers/addReplay';

import { FormattedMessage } from 'react-intl';
import messages from 'messages/components/workbench';
import commonMessages from 'messages/common';

const ToolBox = styled.div`
  display: flex;
  align-items: center;
  margin: ${p => p.theme.space[1]}px;
  border-width: 2px;
  border-color: ${p => p.theme.colors.yellow[6]};
  border-radius: ${p => p.theme.space[1]}px;
  border-style: solid;
`;

const ToolBoxField = styled.div`
  padding: ${p => p.theme.space[1]}px;
  background-color: ${p => p.theme.colors.yellow[5]};
  color: ${p => p.theme.colors.yellow[0]};
  font-weight: bold;
`;

const KeywordSelectToolbar = ({
  countFilterInput,
  setCountFilterInput,
  setKeywordsUseMinCount,
}) => {
  return (
    <Flex width={1} flexWrap="wrap">
      <ToolBox>
        <ToolBoxField>
          <FormattedMessage {...messages.minKeywordAppearance} />
        </ToolBoxField>
        <Input
          type="number"
          value={countFilterInput}
          onChange={e => setCountFilterInput(e.target.value)}
          border="none"
          paddingLeft={1}
          bg="yellow.1"
          height={1}
        />
        <Button
          height={1}
          onClick={() => setKeywordsUseMinCount(countFilterInput)}
          bg="yellow.6"
          color="yellow.0"
        >
          <FormattedMessage {...commonMessages.apply} />
        </Button>
      </ToolBox>
      <Flex />
    </Flex>
  );
};

const mapStateToProps = state => ({
  countFilterInput: addReplayReducer.rootSelector(state).countFilterInput,
});

const mapDispatchToProps = dispatch => ({
  setCountFilterInput: value =>
    dispatch(addReplayReducer.actions.setCountFilterInput(value)),
  setKeywordsUseMinCount: count =>
    dispatch(addReplayReducer.actions.setKeywordsUseMinCount(count)),
});

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRedux(KeywordSelectToolbar);
