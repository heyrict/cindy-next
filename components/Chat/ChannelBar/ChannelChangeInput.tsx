import React, { useRef, useState } from 'react';
import { text2md } from 'common/markdown';
import { toast } from 'react-toastify';

import { Button, Input, Flex, Box } from 'components/General';
import Loading from 'components/General/Loading';
import UserInline from 'components/User/UserInline';

import { connect } from 'react-redux';
import * as chatReducer from 'reducers/chat';
import * as globalReducer from 'reducers/global';

import { Query } from '@apollo/client/react/components';
import { CHATROOM_ID_DESCRIPTION_QUERY } from 'graphql/Queries/Chat';

import { FormattedMessage } from 'react-intl';
import commonMessages from 'messages/common';
import chatMessages from 'messages/components/chat';

import { StateType, ActionContentType } from 'reducers/types';
import { ChannelChangeInputProps } from './types';
import {
  ChatroomIdDescription,
  ChatroomIdDescriptionVariables,
} from 'graphql/Queries/generated/ChatroomIdDescription';

const ChannelChangeInput = ({
  channelChangeInput,
  setChannelChangeInput,
  setChannel,
  setFalseChannelChangeModal,
}: ChannelChangeInputProps) => {
  const [loading, setLoading] = useState(false);
  const waitHandle = useRef<number | null>(null);

  return (
    <Flex flexWrap="wrap" mb={1}>
      <FormattedMessage {...commonMessages.default}>
        {msg => (
          <Input
            type="text"
            style={{ flexGrow: 5 }}
            placeholder={msg as string}
            value={channelChangeInput}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (waitHandle.current) {
                window.clearTimeout(waitHandle.current);
              }
              setLoading(true);
              setChannelChangeInput(e.target.value);
              waitHandle.current = window.setTimeout(() => {
                setLoading(false);
              }, 1000);
            }}
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
      <Box width={1}>
        {loading && channelChangeInput.trim() && <Loading centered />}
        {!loading && channelChangeInput.trim() && (
          <Query<ChatroomIdDescription, ChatroomIdDescriptionVariables>
            query={CHATROOM_ID_DESCRIPTION_QUERY}
            variables={{ chatroomName: channelChangeInput.trim() }}
          >
            {({ data, error, loading }) => {
              if (loading) return <Loading centered />;
              if (error) {
                toast.error(error.message);
                return null;
              }
              if (!data || !data.chatrooms) return null;
              if (data.chatrooms.length === 0)
                return (
                  <FormattedMessage {...chatMessages.notExistDescription} />
                );
              return (
                <>
                  <Box>
                    <Box
                      display="inline-box"
                      color="orange.9"
                      fontSize={2}
                      fontWeight="bold"
                      pr={2}
                    >
                      {data.chatrooms[0].name}
                    </Box>
                    by
                    <UserInline pl={2} user={data.chatrooms[0].user} />
                  </Box>
                  <Box
                    dangerouslySetInnerHTML={{
                      __html: text2md(data.chatrooms[0].description),
                    }}
                  />
                </>
              );
            }}
          </Query>
        )}
      </Box>
    </Flex>
  );
};

const mapStateToProps = (state: StateType) => ({
  channelChangeInput: chatReducer.rootSelector(state).channelChangeInput,
});

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  setChannelChangeInput: (value: string) =>
    dispatch(chatReducer.actions.channelChangeInput.set(value)),
  setChannel: (value: string) =>
    dispatch(globalReducer.actions.channel.set(value)),
  setFalseChannelChangeModal: () =>
    dispatch(chatReducer.actions.channelChangeModal.setFalse()),
});

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRedux(ChannelChangeInput);
