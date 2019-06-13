import React from 'react';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import { CHATROOM_DESCRIPTION_QUERY } from 'graphql/Queries/Chat';
import { line2md } from 'common';
import { Modal, ModalHeader, ModalCloseBtn, ModalBody } from 'components/Modal';

import * as chatReducer from 'reducers/chat';
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
        if (error) chatroom.description = `Error: ${error.message}`;
        else if (loading) chatroom.description = 'Loading...';
        else if (!data || !data.sui_hei_chatroom_by_pk) {
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
              <div
                dangerouslySetInnerHTML={{
                  __html: line2md(chatroom.description),
                }}
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
