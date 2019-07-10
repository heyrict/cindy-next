import React from 'react';
import { connect } from 'react-redux';
import { Button, Input, Flex } from 'components/General';

import * as chatReducer from 'reducers/chat';
import * as globalReducer from 'reducers/global';

import { FormattedMessage } from 'react-intl';
import commonMessages from 'messages/common';
import chatMessages from 'messages/components/chat';

import { StateType, ActionContentType } from 'reducers/types';
import { ChannelChangeInputProps } from './types';

const ChannelChangeInput = ({
  channelChangeInput,
  setChannelChangeInput,
  setChannel,
  setFalseChannelChangeModal,
}: ChannelChangeInputProps) => (
  <Flex flexWrap="wrap" mb={1}>
    <FormattedMessage {...commonMessages.default}>
      {msg => (
        <Input
          type="text"
          style={{ flexGrow: 5 }}
          placeholder={msg as string}
          value={channelChangeInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setChannelChangeInput(e.target.value)
          }
        />
      )}
    </FormattedMessage>
    <Button
      style={{ flexGrow: 1 }}
      px={3}
      onClick={() => {
        setChannel(channelChangeInput);
        setFalseChannelChangeModal();
      }}
    >
      <FormattedMessage {...commonMessages.change} />
    </Button>
    <Button
      style={{ flexGrow: 1 }}
      px={3}
      onClick={() => {
        setChannel('');
        setFalseChannelChangeModal();
      }}
    >
      <FormattedMessage {...chatMessages.changeToDefaultChannel} />
    </Button>
  </Flex>
);

const mapStateToProps = (state: StateType) => ({
  channelChangeInput: chatReducer.rootSelector(state).channelChangeInput,
});

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  setChannelChangeInput: (value: string) =>
    dispatch(chatReducer.actions.setChannelChangeInput(value)),
  setChannel: (value: string) =>
    dispatch(globalReducer.actions.setChannel(value)),
  setFalseChannelChangeModal: () =>
    dispatch(chatReducer.actions.setFalseChannelChangeModal()),
});

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRedux(ChannelChangeInput);
