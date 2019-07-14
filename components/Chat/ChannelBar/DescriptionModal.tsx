import React from 'react';
import { toast } from 'react-toastify';
import { line2md } from 'common/markdown';

import { Query } from 'react-apollo';
import { CHATROOM_DESCRIPTION_QUERY } from 'graphql/Queries/Chat';

import { Modal, ModalHeader, ModalCloseBtn, ModalBody } from 'components/Modal';
import { Box } from 'components/General';
import FavChatManipulateButton from './FavChatManipulateButton';
import ChatroomLogs from './ChatroomLogs';

import { connect } from 'react-redux';
import * as chatReducer from 'reducers/chat';

import { FormattedMessage } from 'react-intl';
import chatMessages from 'messages/components/chat';

import {
  ChatroomDescription,
  ChatroomDescriptionVariables,
} from 'graphql/Queries/generated/ChatroomDescription';
import { DescriptionModalProps } from './types';
import { StateType, ActionContentType } from 'reducers/types';

const defaultData = {
  id: 0,
  name: 'Loading...',
  description: 'Loading...',
  created: '1901-01-01T00:00:00Z',
  private: false,
};

const DescriptionModal = ({
  descriptionModal,
  setFalseDescriptionModal,
  chatroomId,
  relatedPuzzleId,
}: DescriptionModalProps) =>
  descriptionModal ? (
    <Query<ChatroomDescription, ChatroomDescriptionVariables>
      query={CHATROOM_DESCRIPTION_QUERY}
      variables={{
        chatroomId,
      }}
    >
      {({ loading, error, data }) => {
        let chatroom = defaultData;
        if (error) {
          toast.error(error.message);
          return null;
        } else if (!data || !data.sui_hei_chatroom_by_pk) {
          if (loading) chatroom.description = 'Loading...';
          chatroom.description = 'Fatal Error: No data returned';
        } else {
          chatroom = data.sui_hei_chatroom_by_pk;
        }

        return (
          <Modal
            show={descriptionModal}
            closefn={() => setFalseDescriptionModal()}
          >
            <ModalHeader>
              {chatroom.name}
              <ModalCloseBtn onClick={() => setFalseDescriptionModal()} />
            </ModalHeader>
            <ModalBody>
              <Box
                style={{
                  float: 'right',
                }}
              >
                <FavChatManipulateButton
                  chatroomId={chatroom.id}
                  chatroomName={chatroom.name}
                />
              </Box>
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
              <ChatroomLogs
                relatedPuzzleId={relatedPuzzleId}
                chatroomId={chatroom.id}
              />
            </ModalBody>
          </Modal>
        );
      }}
    </Query>
  ) : null;

const mapStateToProps = (state: StateType) => ({
  descriptionModal: chatReducer.rootSelector(state).descriptionModal,
});

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  setFalseDescriptionModal: () =>
    dispatch(chatReducer.actions.setFalseDescriptionModal()),
});

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRedux(DescriptionModal);
