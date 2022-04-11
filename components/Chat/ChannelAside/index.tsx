import React from 'react';
import styled from 'theme/styled';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import { useDispatch } from 'react-redux';
import * as chatReducer from 'reducers/chat';

import Box from 'components/General/Box';
import Flex from 'components/General/Flex';
import ButtonTransparent from 'components/General/ButtonTransparent';
import ChatroomLogsModal from './ChatroomLogsModal';
import ChannelChangeModal from '../ChannelBar/ChannelChangeModal';
import ChatroomCreateModal from './ChatroomCreateModal';
import ChatroomEditableDescription from './ChatroomEditableDescription';

import { Query } from '@apollo/client/react/components';
import { CHATROOM_ID_QUERY } from 'graphql/Queries/Chat';

import { FormattedMessage } from 'react-intl';
import chatMessages from 'messages/components/chat';
import commonMessages from 'messages/common';

import { ChannelAsideProps } from './types';
import {
  ChatroomId,
  ChatroomIdVariables,
} from 'graphql/Queries/generated/ChatroomId';

const ChannelAsideBox = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-flow: column nowrap;
  width: ${p => p.theme.sizes.chatXL};
  ${p => p.theme.mediaQueries.large} {
    width: ${p => p.theme.sizes.chatLG};
  }
  ${p => p.theme.mediaQueries.medium} {
    width: 100%;
  }
`;

const PuzzleChatRegex = /^puzzle-(\d+)$/;

const ChannelAside = ({}: ChannelAsideProps) => {
  const router = useRouter();
  const { name: chatroom } = router.query as { name: string };

  const dispatch = useDispatch();
  const setTrueDescriptionModal = () =>
    dispatch(chatReducer.actions.descriptionModal.setTrue());
  const setTrueChannelChangeModal = () =>
    dispatch(chatReducer.actions.channelChangeModal.setTrue());
  const setTrueChatroomCreateModal = () =>
    dispatch(chatReducer.actions.chatroomCreateModal.setTrue());

  const puzzleChatMatch = PuzzleChatRegex.exec(chatroom);
  const relatedPuzzleId = puzzleChatMatch && parseInt(puzzleChatMatch[1], 10);

  return (
    <ChannelAsideBox>
      <Box fontSize={2} width={1} height="channelbar">
        <Flex
          justifyContent="center"
          bg="preset.menubar.bg"
          color="preset.menubar.fg"
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
      <Query<ChatroomId, ChatroomIdVariables>
        query={CHATROOM_ID_QUERY}
        variables={{
          chatroomName: chatroom,
        }}
        fetchPolicy="cache-only"
      >
        {({ data, error }) => {
          let chatroomId: number | null = null;
          if (data && data.chatrooms && data.chatrooms.length > 0) {
            chatroomId = data.chatrooms[0].id;
          }
          if (error) {
            toast.error(error.message);
          }
          return chatroomId === null ? null : (
            <>
              <Flex width={1} justifyContent="center" height="channelbar">
                <Box
                  width={1 / 3}
                  bg="preset.menubar.ac"
                  color="preset.menubar.fg"
                >
                  <ButtonTransparent
                    onClick={() => setTrueDescriptionModal()}
                    width={1}
                    height={1}
                  >
                    <FormattedMessage {...chatMessages.log} />
                  </ButtonTransparent>
                </Box>
                <Box
                  width={1 / 3}
                  bg="preset.menubar.ac"
                  color="preset.menubar.fg"
                >
                  <ButtonTransparent
                    onClick={() => setTrueChannelChangeModal()}
                    width={1}
                    height={1}
                  >
                    <FormattedMessage {...commonMessages.change} />
                  </ButtonTransparent>
                </Box>
                <Box
                  width={1 / 3}
                  bg="preset.menubar.ac"
                  color="preset.menubar.fg"
                >
                  <ButtonTransparent
                    onClick={() => setTrueChatroomCreateModal()}
                    width={1}
                    height={1}
                  >
                    <FormattedMessage {...commonMessages.create} />
                  </ButtonTransparent>
                </Box>
              </Flex>
              <ChatroomEditableDescription chatroomId={chatroomId} />
              <ChatroomLogsModal
                relatedPuzzleId={relatedPuzzleId}
                chatroomId={chatroomId}
              />
              <ChannelChangeModal />
              <ChatroomCreateModal />
            </>
          );
        }}
      </Query>
    </ChannelAsideBox>
  );
};

export default ChannelAside;
