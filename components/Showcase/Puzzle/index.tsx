import React from 'react';
import Link from 'next/link';
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

import { PuzzleShowcaseProps } from './types';
import UserInline from 'components/User/UserInline';
import IndexLabel from 'components/Puzzle/Detail/PuzzleDialogues/IndexLabel';
import { Genre, Yami } from 'generated/globalTypes';

const ButtonTransparentA = ButtonTransparent.withComponent('a');

const PuzzleShowcase: React.FC<PuzzleShowcaseProps> = () => {
  const q1 = (
    <Box width={[7 / 8, 1 / 2]} mr="auto" mb={[-2, 0]}>
      <ChatBubbleTop>
        <IndexLabel>Q1</IndexLabel>
      </ChatBubbleTop>
      <ChatBubble orientation="left">
        <FormattedMessage {...messages.q1}>
          {(question: string[]) => (
            <QuestionDisplay
              question={question[0] as string}
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
          {(question: string[]) => (
            <QuestionDisplay
              question={question[0] as string}
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
          {(answer: string[]) => (
            <span
              dangerouslySetInnerHTML={{
                __html: line2md(answer[0] as string),
              }}
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
          {(answer: string[]) => (
            <span
              dangerouslySetInnerHTML={{
                __html: line2md(answer[0] as string),
              }}
            />
          )}
        </FormattedMessage>
      </ChatBubble>
    </Box>
  );

  return (
    <React.Fragment>
      <Flex width={1} flexWrap="wrap">
        <FormattedMessage {...messages.title}>
          {(title: string[]) => (
            <PuzzleTitle
              title={title[0] as string}
              genre={Genre.CLASSIC}
              yami={Yami.NONE}
            />
          )}
        </FormattedMessage>
        <FormattedMessage {...messages.content}>
          {(content: string[]) => (
            <ContentsFrame
              text={content[0]}
              user={PUZZLE_SHOWCASE_INLINEUSER}
            />
          )}
        </FormattedMessage>
        {q1}
        {a1}
        {q2}
        {a2}
        <Box bg="orange.4" width={1} borderRadius={2} mb={2}>
          <Link
            href="/puzzle/[id]"
            as={`/puzzle/${PUZZLE_SHOWCASE_PUZZLEID}`}
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
      </Flex>
    </React.Fragment>
  );
};

export default PuzzleShowcase;
