import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Subscribe } from 'unstated';
import { Flex, Button, Input } from 'components/General';
import {
  Modal,
  ModalHeader,
  ModalCloseBtn,
  ModalBody,
  ModalFooter,
  FooterButton,
} from 'components/Modal';

import ChannelContainer from 'containers/global/Channel';
import OnlyOneTextContainer from 'containers/reusable/OnlyOneText';

import commonMessages from 'messages/common';
import chatMessages from 'messages/components/chat';

const inputContainer = new OnlyOneTextContainer();

const ChannelChangeModal = ({ cont }) => (
  <Subscribe to={[ChannelContainer, inputContainer]}>
    {(channelCont, inputCont) => {
      return (
        <Modal show={cont.state.show} closefn={() => cont.hide()}>
          <ModalHeader>
            <FormattedMessage {...chatMessages.changeChannel} />
            <ModalCloseBtn onClick={() => cont.hide()} />
          </ModalHeader>
          <ModalBody>
            <Flex mb={1}>
              <FormattedMessage {...commonMessages.default}>
                {msg => (
                  <Input
                    type="text"
                    placeholder={msg}
                    width={3 / 4}
                    value={inputCont.state.content}
                    onChange={e => inputCont.handleChange(e.target.value)}
                  />
                )}
              </FormattedMessage>
              <Button
                width={1 / 4}
                onClick={() => {
                  channelCont.setChannel(inputCont.state.content);
                  cont.hide();
                }}
              >
                <FormattedMessage {...commonMessages.change} />
              </Button>
            </Flex>
            <Button
              width={1}
              onClick={() => {
                channelCont.setChannel('');
                cont.hide();
              }}
            >
              <FormattedMessage {...chatMessages.changeToDefaultChannel} />
            </Button>
          </ModalBody>
        </Modal>
      );
    }}
  </Subscribe>
);

ChannelChangeModal.propTypes = {
  cont: PropTypes.object.isRequired,
};

export default ChannelChangeModal;
