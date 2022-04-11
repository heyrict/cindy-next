import React from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';
import * as chatReducer from 'reducers/chat';

import { Flex, Box, ButtonTransparent } from 'components/General';
import Loading from 'components/General/Loading';

import { useQuery } from '@apollo/client';
import { OFFICIAL_CHATROOMS_QUERY } from 'graphql/Queries/Chat';

import { FormattedMessage } from 'react-intl';
import chatMessages from 'messages/components/chat';

import { OfficialChatroomsQuery } from 'graphql/Queries/generated/OfficialChatroomsQuery';
import { ActionContentType } from 'reducers/types';
import { OfficialChatroomsListProps } from './types';

const OfficialChatroomsList = ({
  setChannel,
  setFalseChannelChangeModal,
  header,
  linkChange,
}: OfficialChatroomsListProps) => {
  const router = useRouter();
  const { loading, error, data } = useQuery<OfficialChatroomsQuery>(
    OFFICIAL_CHATROOMS_QUERY,
  );

  if (error) {
    toast.error(error.message);
    return null;
  }
  if (!data || !data.chatrooms) {
    if (loading) return <Loading centered />;
    return null;
  }
  return (
    <Flex flexWrap="wrap">
      {header ? (
        header(<FormattedMessage {...chatMessages.officialChatrooms} />)
      ) : (
        <Box mt={2} width={1} borderBottom="3px solid" borderColor="orange.6">
          <FormattedMessage {...chatMessages.officialChatrooms} />
        </Box>
      )}
      {data.chatrooms.map(chatroom => (
        <Box
          key={chatroom.id}
          border="2px solid"
          borderColor="preset.channelbutton.ac"
          bg="preset.channelbutton.bg"
          color="preset.channelbutton.fg"
          borderRadius={2}
          m={1}
        >
          <ButtonTransparent
            height={24}
            onClick={() => {
              if (linkChange) {
                router.push('/channel/[name]', `/channel/${chatroom.name}`);
              } else {
                setChannel(chatroom.name);
                setFalseChannelChangeModal();
              }
            }}
          >
            {chatroom.name}
          </ButtonTransparent>
        </Box>
      ))}
    </Flex>
  );
};

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  setChannel: (value: string) =>
    dispatch(globalReducer.actions.channel.set(value)),
  setFalseChannelChangeModal: () =>
    dispatch(chatReducer.actions.channelChangeModal.setFalse()),
});

const withRedux = connect(null, mapDispatchToProps);

export default withRedux(OfficialChatroomsList);
