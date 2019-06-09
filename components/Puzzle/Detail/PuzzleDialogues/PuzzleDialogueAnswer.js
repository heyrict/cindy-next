import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { line2md } from 'common';

import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';

import { FormattedTime, FormattedMessage } from 'react-intl';
import messages from 'messages/pages/puzzle';
import puzzleMessages from 'messages/components/puzzle';
import commonMessages from 'messages/common';

import { Mutation } from 'react-apollo';
import { EditAnswerMutation } from 'graphql/Mutations/Dialogue';

import {
  Flex,
  Box,
  ButtonTransparent,
  EditTimeSpan,
  Img,
  Switch,
  Textarea,
} from 'components/General';
import pencilIcon from 'svgs/pencil.svg';
import crossIcon from 'svgs/cross.svg';
import tickIcon from 'svgs/tick.svg';
import goodIcon from 'svgs/bulb.svg';
import trueIcon from 'svgs/cracker.svg';

const IndicatorIcon = styled(Img)`
  float: left;
  width: 4em;
  ${p => p.theme.mediaQueries.sm} {
    width: 3.2em;
  }
`;

const ClearFix = styled.div`
  clear: both;
`;

const AnswerModes = {
  DISPLAY: Symbol('display'),
  EDIT: Symbol('edit'),
};

const AnswerDisplay = ({ answer, answerEditTimes, trueAns, goodAns }) => {
  return answer === '' ? (
    <FormattedMessage {...messages.waitForAnswer} />
  ) : (
    <React.Fragment>
      {trueAns && <IndicatorIcon pr={2} pb={2} src={trueIcon} />}
      {goodAns && <IndicatorIcon pr={2} pb={2} src={goodIcon} />}
      <span dangerouslySetInnerHTML={{ __html: line2md(answer) }} />
      {answerEditTimes > 0 && (
        <EditTimeSpan>
          <FormattedMessage
            {...commonMessages.editTimes}
            values={{ count: answerEditTimes }}
          />
        </EditTimeSpan>
      )}
    </React.Fragment>
  );
};

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

const AnswerModeSelector = ({
  dialogueId,
  answer,
  answerEditTimes,
  trueAns,
  goodAns,
  puzzleStatus,
}) => {
  const [mode, setMode] = useState(
    answer === '' ? AnswerModes.EDIT : AnswerModes.DISPLAY,
  );
  useEffect(() => {
    setMode(answer === '' ? AnswerModes.EDIT : AnswerModes.DISPLAY);
  }, [answer]);

  switch (mode) {
    case AnswerModes.DISPLAY:
      return (
        <React.Fragment>
          <React.Fragment>
            <AnswerDisplay
              answer={answer}
              answerEditTimes={answerEditTimes}
              trueAns={trueAns}
              goodAns={goodAns}
            />
            {puzzleStatus === 0 && (
              <ButtonTransparent onClick={() => setMode(AnswerModes.EDIT)}>
                <Img size="1em" src={pencilIcon} />
              </ButtonTransparent>
            )}
            <ClearFix />
          </React.Fragment>
        </React.Fragment>
      );
    case AnswerModes.EDIT:
      return (
        <AnswerEdit
          answer={answer}
          goodAns={goodAns}
          trueAns={trueAns}
          dialogueId={dialogueId}
          setMode={setMode}
          puzzleStatus={puzzleStatus}
        />
      );
    default:
      return null;
  }
};

const PuzzleDialogueAnswer = ({
  dialogueId,
  answer,
  answerEditTimes,
  goodAns,
  trueAns,
  user,
  puzzleUserId,
  puzzleStatus,
}) => {
  return puzzleUserId === user.id ? (
    <AnswerModeSelector
      dialogueId={dialogueId}
      answer={answer}
      answerEditTimes={answerEditTimes}
      trueAns={trueAns}
      goodAns={goodAns}
      puzzleStatus={puzzleStatus}
    />
  ) : (
    <AnswerDisplay answer={answer} answerEditTimes={answerEditTimes} />
  );
};

PuzzleDialogueAnswer.propTypes = {
  dialogueId: PropTypes.number.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
  }),
  puzzleUserId: PropTypes.number.isRequired,
  puzzleStatus: PropTypes.number.isRequired,
  answer: PropTypes.string,
  answerEditTimes: PropTypes.number.isRequired,
  goodAns: PropTypes.bool.isRequired,
  trueAns: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  user: globalReducer.rootSelector(state).user,
});

const withRedux = connect(mapStateToProps);

export default withRedux(PuzzleDialogueAnswer);
