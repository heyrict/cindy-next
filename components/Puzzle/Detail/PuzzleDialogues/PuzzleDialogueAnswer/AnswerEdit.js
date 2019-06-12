import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import puzzleMessages from 'messages/components/puzzle';

import { Mutation } from 'react-apollo';
import { EditAnswerMutation } from 'graphql/Mutations/Dialogue';

import {
  Flex,
  Box,
  ButtonTransparent,
  Img,
  Switch,
  Textarea,
} from 'components/General';
import crossIcon from 'svgs/cross.svg';
import tickIcon from 'svgs/tick.svg';

import { AnswerModes } from './constants';

const AnswerEdit = ({
  answer,
  goodAns,
  trueAns,
  dialogueId,
  setMode,
  puzzleStatus,
}) => {
  const [text, setText] = useState(answer);
  const [goodSwitch, setGood] = useState(goodAns);
  const [trueSwitch, setTrue] = useState(trueAns);
  useEffect(() => {
    setText(answer);
  }, [answer]);
  useEffect(() => {
    setGood(goodAns);
  }, [goodAns]);
  useEffect(() => {
    setTrue(trueAns);
  }, [trueAns]);

  return (
    <Mutation mutation={EditAnswerMutation}>
      {editAnswer => (
        <Flex width={1}>
          <Flex width={1} ml={-1} mr={1} flexWrap="wrap">
            <Textarea
              width={1}
              borderWidth="2px"
              borderColor="red.7"
              borderStyle="solid"
              bg="red.0"
              onChange={e => setText(e.target.value)}
              value={text}
            />
            <Box width={1 / 2}>
              <FormattedMessage {...puzzleMessages.dialogue_good} />
              <Switch value={goodSwitch} onClick={() => setGood(!goodSwitch)} />
            </Box>
            <Box width={1 / 2}>
              <FormattedMessage {...puzzleMessages.dialogue_true} />
              <Switch value={trueSwitch} onClick={() => setTrue(!trueSwitch)} />
            </Box>
          </Flex>
          <Flex
            width={['3em', '4em']}
            borderWidth="2px"
            borderColor="red.7"
            borderStyle="solid"
            flexDirection="column"
          >
            {puzzleStatus === 0 && answer !== '' && (
              <ButtonTransparent
                height={1}
                p={1}
                borderLeft={0}
                borderTop={0}
                borderRight={0}
                borderBottom="3px"
                borderColor="red.7"
                borderStyle="solid"
                onClick={() => setMode(AnswerModes.DISPLAY)}
              >
                <Img size="xs" src={crossIcon} />
              </ButtonTransparent>
            )}
            <ButtonTransparent
              height={1}
              p={1}
              onClick={() => {
                const oldAnswer = answer.trimRight();
                const newAnswer = text.trimRight();
                if (newAnswer === '') {
                  return;
                }
                if (
                  newAnswer === oldAnswer &&
                  goodSwitch === goodAns &&
                  trueSwitch === trueAns
                ) {
                  setMode(AnswerModes.DISPLAY);
                } else {
                  editAnswer({
                    variables: {
                      dialogueId,
                      answer: newAnswer,
                      good: goodSwitch,
                      true: trueSwitch,
                      increaseEditTimes: answer === '' ? 0 : 1,
                    },
                  })
                    .then(() => {
                      setMode(AnswerModes.DISPLAY);
                    })
                    .catch(error => {
                      console.log(error.message);
                    });
                }
              }}
            >
              <Img size="xs" src={tickIcon} />
            </ButtonTransparent>
          </Flex>
        </Flex>
      )}
    </Mutation>
  );
};

AnswerEdit.propTypes = {
  answer: PropTypes.string.isRequired,
  trueAns: PropTypes.bool.isRequired,
  goodAns: PropTypes.bool.isRequired,
  dialogueId: PropTypes.number.isRequired,
  setMode: PropTypes.func.isRequired,
  puzzleStatus: PropTypes.number.isRequired,
};

export default AnswerEdit;
