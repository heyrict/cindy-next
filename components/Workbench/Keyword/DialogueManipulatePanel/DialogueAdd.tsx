import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';

import { connect } from 'react-redux';
import * as addReplayReducer from 'reducers/addReplay';

import { FormattedMessage } from 'react-intl';
import puzzleMessages from 'messages/components/puzzle';

import { Flex, Box, Switch, ButtonTransparent, Img } from 'components/General';
import { SimpleLegacyEditor } from 'components/PreviewEditor';
import tickIcon from 'svgs/tick.svg';

import { ActionContentType, AddReplayDialogueType } from 'reducers/types';
import { DialogueAddProps } from 'components/Workbench/Keyword/DialogueManipulatePanel/types';

const DialogueAdd = ({ addDialogue }: DialogueAddProps) => {
  const questionEditor = useRef<SimpleLegacyEditor>(null!);
  const answerEditor = useRef<SimpleLegacyEditor>(null!);
  const [goodSwitch, setGood] = useState(false);
  const [trueSwitch, setTrue] = useState(false);

  return (
    <Flex width={1} flexWrap="wrap" p={2} mt={2} border="2px solid" borderColor="pink.2" borderRadius={2} bg="pink.0">
      <Box width={1}>Question</Box>
      <Box
        width={1}
        borderWidth="2px"
        borderColor="red.7"
        borderStyle="solid"
        bg="red.0"
        mb={2}
      >
        <SimpleLegacyEditor ref={questionEditor} />
      </Box>
      <Box width={1}>Answer</Box>
      <Box
        width={1}
        borderWidth="2px"
        borderColor="red.7"
        borderStyle="solid"
        bg="red.0"
        mb={2}
      >
        <SimpleLegacyEditor ref={answerEditor} />
      </Box>
      <Box width={1 / 2}>
        <FormattedMessage {...puzzleMessages.dialogue_good} />
        <Switch selected={goodSwitch} onClick={() => setGood(!goodSwitch)} />
      </Box>
      <Box width={1 / 2}>
        <FormattedMessage {...puzzleMessages.dialogue_true} />
        <Switch selected={trueSwitch} onClick={() => setTrue(!trueSwitch)} />
      </Box>
      <Box width={1} mt={2} px={-2}>
        <ButtonTransparent
          width={1}
          height={1}
          p={1}
          onClick={() => {
            const question = questionEditor.current.getText().trim();
            const answer = answerEditor.current.getText().trim();

            if (!question || !answer) {
              toast.error('Question and Answer cannot be empty!');
              return;
            }

            addDialogue({
              question,
              answer,
              good: goodSwitch,
              true: trueSwitch,
            });

            questionEditor.current.setText('');
            answerEditor.current.setText('');
            setGood(false);
            setTrue(false);
          }}
        >
          <Img size="xs" src={tickIcon} />
        </ButtonTransparent>
      </Box>
    </Flex>
  );
};

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  addDialogue: (dialogue: AddReplayDialogueType) =>
    dispatch(addReplayReducer.actions.addReplayDialogue(dialogue)),
});

const withRedux = connect(
  null,
  mapDispatchToProps,
);

export default withRedux(DialogueAdd);
