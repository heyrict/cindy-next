import React from 'react';
import styled from 'theme/styled';
import { line2md } from 'common/markdown';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import Box from 'components/General/Box';
import Flex from 'components/General/Flex';
import ButtonTransparent from 'components/General/ButtonTransparent';

import { Query } from 'react-apollo';
import { CHATROOM_ID_QUERY } from 'graphql/Queries/Chat';
import { CHATROOM_DESCRIPTION_QUERY } from 'graphql/Queries/Chat';

import { FormattedMessage } from 'react-intl';
import chatMessages from 'messages/components/chat';
import commonMessages from 'messages/common';

import { ChannelAsideProps } from './types';
import {
  ChatroomId,
  ChatroomIdVariables,
} from 'graphql/Queries/generated/ChatroomId';
import {
  ChatroomDescription,
  ChatroomDescriptionVariables,
} from 'graphql/Queries/generated/ChatroomDescription';

const ChannelAsideBox = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: ${p => p.theme.sizes.chatXL};
  ${p => p.theme.mediaQueries.large} {
    width: ${p => p.theme.sizes.chatLG};
  }
`;

const ChannelAside = ({  }: ChannelAsideProps) => {
  const router = useRouter();
  const { name: chatroom } = router.query as { name: string };

  return (
    <ChannelAsideBox>
      <Box fontSize={2} width={1} height="channelbar">
        <Flex
          justifyContent="center"
          bg="orange.5"
          color="orange.1"
          py={1}
          height={1}
        >
          <FormattedMessage
            {...chatMessages.currentChannel}
            values={{
              name: chatroom,
            }}
          />
        </Flex>
      </Box>
      <Flex width={1} justifyContent="center" height="channelbar">
        <Box width={1 / 3} bg="orange.4" color="orange.0">
          <ButtonTransparent width={1} height={1}>
            <FormattedMessage {...chatMessages.log} />
          </ButtonTransparent>
        </Box>
        <Box width={1 / 3} bg="orange.3" color="orange.0">
          <ButtonTransparent width={1} height={1}>
            <FormattedMessage {...commonMessages.change} />
          </ButtonTransparent>
        </Box>
        <Box width={1 / 3} bg="orange.4" color="orange.0">
          <ButtonTransparent width={1} height={1}>
            <FormattedMessage {...commonMessages.create} />
          </ButtonTransparent>
        </Box>
      </Flex>
      <Query<ChatroomId, ChatroomIdVariables>
        query={CHATROOM_ID_QUERY}
        variables={{
          chatroomName: chatroom,
        }}
        fetchPolicy="cache-only"
      >
        {({ data, error }) => {
          let chatroomId = null;
          if (data && data.sui_hei_chatroom && data.sui_hei_chatroom[0]) {
            chatroomId = data.sui_hei_chatroom[0].id;
          }
          if (error) {
            toast.error(error.message);
          }
          return (
            chatroomId !== null && (
              <Query<ChatroomDescription, ChatroomDescriptionVariables>
                query={CHATROOM_DESCRIPTION_QUERY}
                variables={{
                  chatroomId,
                }}
              >
                {({ error, data }) => {
                  if (error) {
                    toast.error(error.message);
                    return null;
                  }
                  if (!data || !data.sui_hei_chatroom_by_pk) return null;
                  const chatroom = data.sui_hei_chatroom_by_pk;

                  return (
                    <Box bg="orange.2" color="orange.9" py={2}>
                      {chatroom.description ? (
                        <div
                          style={{ minHeight: '3em' }}
                          dangerouslySetInnerHTML={{
                            __html: line2md(chatroom.description),
                          }}
                        />
                      ) : (
                        <Box>
                          <FormattedMessage {...chatMessages.noDescription} />
                        </Box>
                      )}
                    </Box>
                  );
                }}
              </Query>
            )
          );
        }}
      </Query>
    </ChannelAsideBox>
  );
};

export default ChannelAside;
