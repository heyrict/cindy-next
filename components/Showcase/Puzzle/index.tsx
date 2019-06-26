import React from 'react';
import { Link } from 'routes';
import { Waypoint } from 'react-waypoint';
import { randomUUID } from 'common/random';
import { line2md } from 'common/markdown';

import {
  PUZZLE_SHOWCASE_PUZZLEID,
  PUZZLE_SHOWCASE_INLINEUSER,
} from '../settings';

import { Flex, Box, ButtonTransparent } from 'components/General';
import ChatBubble from 'components/Chat/Chatmessage/ChatBubble';
import ChatBubbleTop from 'components/Chat/Chatmessage/ChatBubbleTop';
import QuestionDisplay from 'components/Puzzle/Detail/PuzzleDialogues/PuzzleDialogueQuestion/QuestionDisplay';
import goodIcon from 'svgs/bulb.svg';
import {
  IndicatorIcon,
  ClearFix,
} from 'components/Puzzle/Detail/PuzzleDialogues/PuzzleDialogueAnswer/components';
import ContentsFrame from 'components/Puzzle/Detail/ContentsFrame';
import PuzzleTitle from 'components/Puzzle/Detail/PuzzleTitle';

import { FormattedMessage } from 'react-intl';
import messages from 'messages/showcases/puzzle';
import puzzlePageMessages from 'messages/pages/puzzle';

import {
  PuzzleShowcaseProps,
  PuzzleShowcaseStages,
  PuzzleShowcaseStates,
  PuzzleShowcaseDefaultProps,
} from './types';
import UserInline from 'components/User/UserInline';
import IndexLabel from 'components/Puzzle/Detail/PuzzleDialogues/IndexLabel';

const ButtonTransparentA = ButtonTransparent.withComponent('a');

class PuzzleShowcase extends React.Component<
  PuzzleShowcaseProps,
  PuzzleShowcaseStates
> {
  key: string;
  timer: undefined | number;

  static defaultProps = PuzzleShowcaseDefaultProps;

  // {{{1 constructor(props)
  constructor(props: PuzzleShowcaseProps) {
    super(props);
    this.key = props.key || randomUUID();
    this.state = {
      stage: PuzzleShowcaseStages.ONLY_CONTENT,
    };

    this._startTimer = this._startTimer.bind(this);
    this._stopTimer = this._stopTimer.bind(this);
    this._onTimerEnds = this._onTimerEnds.bind(this);
  }

  // {{{1 timer handlers
  _startTimer() {
    this.timer = window.setTimeout(this._onTimerEnds, this.props.wait);
  }

  _stopTimer() {
    window.clearTimeout(this.timer);
    this.timer = undefined;
    this.setState({ stage: PuzzleShowcaseStages.ONLY_CONTENT });
  }

  _onTimerEnds() {
    const { stage } = this.state;
    switch (stage) {
      case PuzzleShowcaseStages.A2:
        this.timer = undefined;
        return;
      default:
        this.setState({ stage: stage + 1 });
        this.timer = window.setTimeout(this._onTimerEnds, this.props.wait);
        return;
    }
  }

  // {{{1 render()
  render() {
    const q1 = (
      <Box width={[7 / 8, 1 / 2]} mr="auto" mb={[-2, 0]}>
        <ChatBubbleTop>
          <IndexLabel>Q1</IndexLabel>
        </ChatBubbleTop>
        <ChatBubble orientation="left">
          <FormattedMessage {...messages.q1}>
            {question => (
              <QuestionDisplay
                question={question as string}
                questionEditTimes={0}
              />
            )}
          </FormattedMessage>
        </ChatBubble>
      </Box>
    );

    const q2 = (
      <Box width={[7 / 8, 1 / 2]} mr="auto" mb={[-2, 0]}>
        <ChatBubbleTop>
          <IndexLabel>Q2</IndexLabel>
        </ChatBubbleTop>
        <ChatBubble orientation="left">
          <FormattedMessage {...messages.q2}>
            {question => (
              <QuestionDisplay
                question={question as string}
                questionEditTimes={0}
              />
            )}
          </FormattedMessage>
        </ChatBubble>
      </Box>
    );

    const a1 = (
      <Box width={[7 / 8, 1 / 2]} mr="auto" mb={[-2, 0]}>
        <ChatBubbleTop>
          <IndexLabel>A1</IndexLabel>
          <UserInline user={PUZZLE_SHOWCASE_INLINEUSER} />
        </ChatBubbleTop>
        <ChatBubble orientation="right">
          <IndicatorIcon pr={2} pb={2} src={goodIcon} />
          <FormattedMessage {...messages.a1}>
            {answer => (
              <span
                dangerouslySetInnerHTML={{ __html: line2md(answer as string) }}
              />
            )}
          </FormattedMessage>
          <ClearFix />
        </ChatBubble>
      </Box>
    );

    const a2 = (
      <Box width={[7 / 8, 1 / 2]} mr="auto" mb={[-2, 0]}>
        <ChatBubbleTop>
          <IndexLabel>A2</IndexLabel>
          <UserInline user={PUZZLE_SHOWCASE_INLINEUSER} />
        </ChatBubbleTop>
        <ChatBubble orientation="right">
          <FormattedMessage {...messages.a2}>
            {answer => (
              <span
                dangerouslySetInnerHTML={{ __html: line2md(answer as string) }}
              />
            )}
          </FormattedMessage>
        </ChatBubble>
      </Box>
    );

    const waitForAnswer = (
      <Box width={[7 / 8, 1 / 2]} ml="auto" mt={[-2, 0]} mb={[1, 0]}>
        <ChatBubbleTop />
        <ChatBubble orientation="right">
          <FormattedMessage {...puzzlePageMessages.waitForAnswer} />
        </ChatBubble>
      </Box>
    );

    return (
      <React.Fragment>
        <Waypoint
          key={this.key}
          onEnter={this._startTimer}
          onLeave={this._stopTimer}
        >
          <Flex width={1} flexWrap="wrap">
            <FormattedMessage {...messages.title}>
              {title => (
                <PuzzleTitle title={title as string} genre={0} yami={0} />
              )}
            </FormattedMessage>
            <FormattedMessage {...messages.content}>
              {content => (
                <ContentsFrame
                  text={content}
                  user={PUZZLE_SHOWCASE_INLINEUSER}
                />
              )}
            </FormattedMessage>
            {this.state.stage >= PuzzleShowcaseStages.Q1 && q1}
            {this.state.stage === PuzzleShowcaseStages.Q1 && waitForAnswer}
            {this.state.stage >= PuzzleShowcaseStages.A1 && a1}
            {this.state.stage >= PuzzleShowcaseStages.Q2 && q2}
            {this.state.stage === PuzzleShowcaseStages.Q2 && waitForAnswer}
            {this.state.stage >= PuzzleShowcaseStages.A2 && a2}
            {this.state.stage === PuzzleShowcaseStages.A2 &&
              PUZZLE_SHOWCASE_PUZZLEID && (
                <Box bg="orange.4" width={1} borderRadius={2} mb={2}>
                  <Link
                    to="puzzle"
                    params={{ id: PUZZLE_SHOWCASE_PUZZLEID }}
                    passHref
                  >
                    <ButtonTransparentA
                      mx={[0.05, 0.1, 0.2]}
                      width={1}
                      py={2}
                      color="red.9"
                    >
                      <FormattedMessage {...messages.goToSolution} />
                    </ButtonTransparentA>
                  </Link>
                </Box>
              )}
          </Flex>
        </Waypoint>
      </React.Fragment>
    );
  }
  // }}}
}

export default PuzzleShowcase;
