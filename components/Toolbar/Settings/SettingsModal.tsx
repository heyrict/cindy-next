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
import { ArgumentsType } from 'utilities';

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
  confirmCreatePuzzle,
  showGrotesqueWarning,
  editQuestionTrigger,
  puzzleGenreImg,
  sendAnswerTrigger,
  sendChatTrigger,
  sendDirectmessageTrigger,
  sendQuestionTrigger,
  rightAsideMini,
  pushNotification,
  multicol,
}: SettingsModalProps) => {
  const confirmCreatePuzzleRef = useRef<ButtonSelectStateful<boolean>>(null!);
  const showGrotesqueWarningRef = useRef<ButtonSelectStateful<boolean>>(null!);
  const sendChatTriggerRef = useRef<ButtonSelectStateful<number>>(null!);
  const sendDirectmessageTriggerRef = useRef<ButtonSelectStateful<number>>(
    null!,
  );
  const sendAnswerTriggerRef = useRef<ButtonSelectStateful<number>>(null!);
  const sendQuestionTriggerRef = useRef<ButtonSelectStateful<number>>(null!);
  const editQuestionTriggerRef = useRef<ButtonSelectStateful<number>>(null!);
  const puzzleGenreImgRef = useRef<ButtonSelectStateful<boolean>>(null!);
  const rightAsideMiniRef = useRef<ButtonSelectStateful<boolean>>(null!);
  const pushNotificationRef = useRef<ButtonSelectStateful<boolean>>(null!);
  const multicolRef = useRef<ButtonSelectStateful<boolean>>(null!);

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
            <FormattedMessage {...settingMessages.sendDirectmessageTrigger}>
              {msg => <label>{msg}</label>}
            </FormattedMessage>
          </Box>
          <Box width={[1, 2 / 3, 4 / 5]} mb={2}>
            <ButtonSelectStateful
              ref={sendDirectmessageTriggerRef}
              flexProps={{ px: 2 }}
              initialValue={sendDirectmessageTrigger}
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
            <FormattedMessage {...settingMessages.notification} />
          </Box>
          <Box width={[1, 1 / 3, 1 / 5]} mb={[0, 2]}>
            <FormattedMessage {...settingMessages.pushNotification}>
              {msg => <label>{msg}</label>}
            </FormattedMessage>
          </Box>
          <Box width={[1, 2 / 3, 4 / 5]} mb={2}>
            <ButtonSelectStateful<boolean>
              ref={pushNotificationRef}
              flexProps={{ px: 2 }}
              initialValue={pushNotification}
              options={booleanOptions}
            />
          </Box>
          <Box width={1} borderBottom="2px solid" borderColor="orange.7" mb={2}>
            <FormattedMessage {...commonMessages.display} />
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
            <FormattedMessage {...settingMessages.multicol}>
              {msg => <label>{msg}</label>}
            </FormattedMessage>
          </Box>
          <Box width={[1, 2 / 3, 4 / 5]} mb={2}>
            <ButtonSelectStateful<boolean>
              ref={multicolRef}
              flexProps={{ px: 2 }}
              initialValue={multicol}
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
          <Box width={1} borderBottom="2px solid" borderColor="orange.7" mb={2}>
            <FormattedMessage {...commonMessages.others} />
          </Box>
          <Box width={[1, 1 / 3, 1 / 5]} mb={[0, 2]}>
            <FormattedMessage {...settingMessages.confirmCreatePuzzle}>
              {msg => <label>{msg}</label>}
            </FormattedMessage>
          </Box>
          <Box width={[1, 2 / 3, 4 / 5]} mb={2}>
            <ButtonSelectStateful<boolean>
              ref={confirmCreatePuzzleRef}
              flexProps={{ px: 2 }}
              initialValue={confirmCreatePuzzle}
              options={booleanOptions}
            />
          </Box>
          <Box width={[1, 1 / 3, 1 / 5]} mb={[0, 2]}>
            <FormattedMessage {...settingMessages.showGrotesqueWarning}>
              {msg => <label>{msg}</label>}
            </FormattedMessage>
          </Box>
          <Box width={[1, 2 / 3, 4 / 5]} mb={2}>
            <ButtonSelectStateful<boolean>
              ref={showGrotesqueWarningRef}
              flexProps={{ px: 2 }}
              initialValue={showGrotesqueWarning}
              options={booleanOptions}
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
              confirmCreatePuzzle: confirmCreatePuzzleRef.current.state.value,
              showGrotesqueWarning: showGrotesqueWarningRef.current.state.value,
              editQuestionTrigger: editQuestionTriggerRef.current.state.value,
              sendChatTrigger: sendChatTriggerRef.current.state.value,
              sendDirectmessageTrigger:
                sendDirectmessageTriggerRef.current.state.value,
              sendAnswerTrigger: sendAnswerTriggerRef.current.state.value,
              sendQuestionTrigger: sendQuestionTriggerRef.current.state.value,
              puzzleGenreImg: puzzleGenreImgRef.current.state.value,
              rightAsideMini: rightAsideMiniRef.current.state.value,
              pushNotification: pushNotificationRef.current.state.value,
              multicol: multicolRef.current.state.value,
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
    dispatch(settingReducer.actions.settingsModal.setFalse()),
  setState: (state: ArgumentsType<typeof settingReducer.actions.setState>[0]) =>
    dispatch(settingReducer.actions.setState(state)),
});

const withRedux = connect(mapStateToProps, mapDispatchToProps);

export default compose(withRedux)(SettingsModal);
