import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
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

const ChatRoomDescriptionQuery = gql`
  query ChatRoomDescription($chatroomName: String) {
    sui_hei_chatroom(where: { name: { _eq: $chatroomName } }, limit: 1) {
      id
      name
      description
      created
      private
    }
  }
`;

const defaultData = {
  id: 0,
  name: 'Loading...',
  description: 'Loading...',
  created: '1901-01-01T00:00:00Z',
  private: false,
};

const DescriptionModal = ({ cont, channel }) => (
  <Query
    query={ChatRoomDescriptionQuery}
    variables={{
      chatroomName: channel,
    }}
  >
    {({ loading, error, data }) => {
      let chatroom = defaultData;
      if (error) chatroom.description = `Error: ${error.message}`;
      if (!data || !data.sui_hei_chatroom) {
        chatroom.description = 'Fatal Error: No data returned';
      } else {
        chatroom = data.sui_hei_chatroom[0];
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
  channel: PropTypes.string.isRequired,
};

export default DescriptionModal;
