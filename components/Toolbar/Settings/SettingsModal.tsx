import React, { useRef } from 'react';
import { compose } from 'redux';

import {
  Modal,
  ModalHeader,
  ModalCloseBtn,
  ModalBody,
  ModalFooter,
  FooterButton,
} from 'components/Modal';
import { Flex, Box } from 'components/General';
import ButtonSelectStateful from 'components/ButtonSelect/stateful';

import { FormattedMessage } from 'react-intl';
import settingMessages from 'messages/components/setting';
import commonMessages from 'messages/common';

import { connect } from 'react-redux';
import * as settingReducer from 'reducers/setting';

import {
  StateType,
  ActionContentType,
  SendMessageTriggerType,
} from 'reducers/types';
import { SettingsModalProps } from './types';

const booleanOptions = [
  {
    key: 'false',
    value: false,
    label: ' X ',
  },
  {
    key: 'true',
    value: true,
    label: ' O ',
  },
];

const sendMessageTriggerOptions = [
  {
    key: SendMessageTriggerType.NONE,
    value: SendMessageTriggerType.NONE,
    label: <FormattedMessage {...commonMessages.none} />,
  },
  {
    key: SendMessageTriggerType.ON_ENTER,
    value: SendMessageTriggerType.ON_ENTER,
    label: 'Enter',
  },
  {
    key: SendMessageTriggerType.ON_CTRL_ENTER,
    value: SendMessageTriggerType.ON_CTRL_ENTER,
    label: 'Ctrl-Enter',
  },
  {
    key: SendMessageTriggerType.ON_SHIFT_ENTER,
    value: SendMessageTriggerType.ON_SHIFT_ENTER,
    label: 'Shift-Enter',
  },
];

const SettingsModal = ({
  settingsModal,
  setFalseSettingsModal,
  setState,
  editQuestionTrigger,
  puzzleGenreImg,
  sendAnswerTrigger,
  sendChatTrigger,
  sendQuestionTrigger,
  rightAsideMini,
}: SettingsModalProps) => {
  const sendChatTriggerRef = useRef<ButtonSelectStateful<number>>(null!);
  const sendAnswerTriggerRef = useRef<ButtonSelectStateful<number>>(null!);
  const sendQuestionTriggerRef = useRef<ButtonSelectStateful<number>>(null!);
  const editQuestionTriggerRef = useRef<ButtonSelectStateful<number>>(null!);
  const puzzleGenreImgRef = useRef<ButtonSelectStateful<boolean>>(null!);
  const rightAsideMiniRef = useRef<ButtonSelectStateful<boolean>>(null!);

  return (
    <Modal show={settingsModal} closefn={() => setFalseSettingsModal()}>
      <ModalHeader>
        <FormattedMessage {...settingMessages.settings} />
        <ModalCloseBtn onClick={() => setFalseSettingsModal()} />
      </ModalHeader>
      <ModalBody>
        <Flex flexWrap="wrap" alignItems="center">
          <Box width={1} borderBottom="2px solid" borderColor="orange.7" mb={2}>
            <FormattedMessage {...settingMessages.sendMessageTrigger} />
          </Box>
          <Box width={[1, 1 / 3, 1 / 5]} mb={[0, 2]}>
            <FormattedMessage {...settingMessages.sendChatTrigger}>
              {msg => <label>{msg}</label>}
            </FormattedMessage>
          </Box>
          <Box width={[1, 2 / 3, 4 / 5]} mb={2}>
            <ButtonSelectStateful
              ref={sendChatTriggerRef}
              flexProps={{ px: 2 }}
              initialValue={sendChatTrigger}
              options={sendMessageTriggerOptions}
            />
          </Box>
          <Box width={[1, 1 / 3, 1 / 5]} mb={[0, 2]}>
            <FormattedMessage {...settingMessages.sendQuestionTrigger}>
              {msg => <label>{msg}</label>}
            </FormattedMessage>
          </Box>
          <Box width={[1, 2 / 3, 4 / 5]} mb={2}>
            <ButtonSelectStateful
              ref={sendQuestionTriggerRef}
              flexProps={{ px: 2 }}
              initialValue={sendQuestionTrigger}
              options={sendMessageTriggerOptions}
            />
          </Box>
          <Box width={[1, 1 / 3, 1 / 5]} mb={[0, 2]}>
            <FormattedMessage {...settingMessages.editQuestionTrigger}>
              {msg => <label>{msg}</label>}
            </FormattedMessage>
          </Box>
          <Box width={[1, 2 / 3, 4 / 5]} mb={2}>
            <ButtonSelectStateful
              ref={editQuestionTriggerRef}
              flexProps={{ px: 2 }}
              initialValue={editQuestionTrigger}
              options={sendMessageTriggerOptions}
            />
          </Box>
          <Box width={[1, 1 / 3, 1 / 5]} mb={[0, 2]}>
            <FormattedMessage {...settingMessages.sendAnswerTrigger}>
              {msg => <label>{msg}</label>}
            </FormattedMessage>
          </Box>
          <Box width={[1, 2 / 3, 4 / 5]} mb={2}>
            <ButtonSelectStateful
              ref={sendAnswerTriggerRef}
              flexProps={{ px: 2 }}
              initialValue={sendAnswerTrigger}
              options={sendMessageTriggerOptions}
            />
          </Box>
          <Box width={1} borderBottom="2px solid" borderColor="orange.7" mb={2}>
            <FormattedMessage {...commonMessages.others} />
          </Box>
          <Box width={[1, 1 / 3, 1 / 5]} mb={[0, 2]}>
            <FormattedMessage {...settingMessages.puzzleGenreImg}>
              {msg => <label>{msg}</label>}
            </FormattedMessage>
          </Box>
          <Box width={[1, 2 / 3, 4 / 5]} mb={2}>
            <ButtonSelectStateful<boolean>
              ref={puzzleGenreImgRef}
              flexProps={{ px: 2 }}
              initialValue={puzzleGenreImg}
              options={booleanOptions}
            />
          </Box>
          <Box width={[1, 1 / 3, 1 / 5]} mb={[0, 2]}>
            <FormattedMessage {...settingMessages.rightAsideMini}>
              {msg => <label>{msg}</label>}
            </FormattedMessage>
          </Box>
          <Box width={[1, 2 / 3, 4 / 5]} mb={2}>
            <ButtonSelectStateful<boolean>
              ref={rightAsideMiniRef}
              flexProps={{ px: 2 }}
              initialValue={rightAsideMini}
              options={[
                {
                  key: 'false',
                  value: false,
                  label: <FormattedMessage {...commonMessages.big} />,
                },
                {
                  key: 'true',
                  value: true,
                  label: <FormattedMessage {...commonMessages.small} />,
                },
              ]}
            />
          </Box>
        </Flex>
      </ModalBody>
      <ModalFooter>
        <FooterButton
          bg="cyan.6"
          color="cyan.0"
          onClick={() =>
            setState({
              settingsModal: false,
              editQuestionTrigger: editQuestionTriggerRef.current.state.value,
              sendChatTrigger: sendChatTriggerRef.current.state.value,
              sendAnswerTrigger: sendAnswerTriggerRef.current.state.value,
              sendQuestionTrigger: sendQuestionTriggerRef.current.state.value,
              puzzleGenreImg: puzzleGenreImgRef.current.state.value,
              rightAsideMini: rightAsideMiniRef.current.state.value,
            })
          }
        >
          <FormattedMessage {...commonMessages.save} />
        </FooterButton>
        <FooterButton
          bg="orange.5"
          color="black"
          onClick={() => setFalseSettingsModal()}
        >
          <FormattedMessage {...commonMessages.close} />
        </FooterButton>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = (
  state: StateType,
): typeof settingReducer.initialState => settingReducer.rootSelector(state);

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  setFalseSettingsModal: () =>
    dispatch(settingReducer.actions.setFalseSettingsModal()),
  setState: (
    state: {
      [key in keyof typeof settingReducer.initialState]?: typeof settingReducer.initialState[key]
    },
  ) => dispatch(settingReducer.actions.setState(state)),
});

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withRedux)(SettingsModal);
