import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Query } from 'react-apollo';
import { ChatRoomDescriptionQuery } from 'graphql/Queries/Chat';
import { Flex, Button, Input } from 'components/General';
import { line2md } from 'common';
import {
  Modal,
  ModalHeader,
  ModalCloseBtn,
  ModalBody,
  ModalFooter,
  FooterButton,
} from 'components/Modal';

import commonMessages from 'messages/common';
import chatMessages from 'messages/components/chat';

const defaultData = {
  id: 0,
  name: 'Loading...',
  description: 'Loading...',
  created: '1901-01-01T00:00:00Z',
  private: false,
};

const DescriptionModal = ({ cont, chatroomId }) =>
  cont.state.show && (
    <Query
      query={ChatRoomDescriptionQuery}
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
          <Modal show={cont.state.show} closefn={() => cont.hide()}>
            <ModalHeader>
              {chatroom.name}
              <ModalCloseBtn onClick={() => cont.hide()} />
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
  );

DescriptionModal.propTypes = {
  cont: PropTypes.object.isRequired,
  chatroomId: PropTypes.number,
};

export default DescriptionModal;
