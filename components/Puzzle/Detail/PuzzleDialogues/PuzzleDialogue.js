/*
 * PuzzleDialogue
 *
 * TODO: Add mutation to edit question or answer.
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { line2md } from 'common';

import { FormattedTime, FormattedMessage } from 'react-intl';
import messages from 'messages/pages/puzzle';
import commonMessages from 'messages/common';

import { Flex, Box, Img, EditTimeSpan } from 'components/General';
import UserInline from 'components/User/UserInline';
import ChatBubble from 'components/Chat/Chatmessage/ChatBubble';
import ChatBubbleTop from 'components/Chat/Chatmessage/ChatBubbleTop';

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

const PuzzleDialogue = ({ dialogue, puzzleUser }) => {
  return (
    <React.Fragment>
      <Box width={[7 / 8, 1 / 2]} mr="auto" mb={[-2, 0]}>
        <ChatBubbleTop>
          <UserInline
            px={1}
            user={dialogue.sui_hei_user}
            timestamp={
              dialogue.created && (
                <FormattedTime
                  value={dialogue.created}
                  year="numeric"
                  month="short"
                  day="numeric"
                />
              )
            }
          />
        </ChatBubbleTop>
        <ChatBubble orientation="left">
          <span
            dangerouslySetInnerHTML={{ __html: line2md(dialogue.question) }}
          />
          {dialogue.questionEditTimes > 0 && (
            <EditTimeSpan>
              <FormattedMessage
                {...commonMessages.editTimes}
                values={{ count: dialogue.questionEditTimes }}
              />
            </EditTimeSpan>
          )}
        </ChatBubble>
      </Box>
      <Box width={[7 / 8, 1 / 2]} ml="auto" mt={[-2, 0]} mb={[1, 0]}>
        <ChatBubbleTop>
          {dialogue.answer && (
            <UserInline
              px={1}
              user={puzzleUser}
              timestamp={
                dialogue.answeredtime && (
                  <FormattedTime
                    value={dialogue.answeredtime}
                    year="numeric"
                    month="short"
                    day="numeric"
                  />
                )
              }
            />
          )}
        </ChatBubbleTop>
        {dialogue.answer ? (
          <ChatBubble orientation="right">
            {dialogue.true && <IndicatorIcon pr={2} pb={2} src={trueIcon} />}
            {dialogue.good && <IndicatorIcon pr={2} pb={2} src={goodIcon} />}
            <span
              dangerouslySetInnerHTML={{ __html: line2md(dialogue.answer) }}
            />
            {dialogue.answerEditTimes > 0 && (
              <EditTimeSpan>
                <FormattedMessage
                  {...commonMessages.editTimes}
                  values={{ count: dialogue.answerEditTimes }}
                />
              </EditTimeSpan>
            )}
            <ClearFix />
          </ChatBubble>
        ) : (
          <ChatBubble orientation="right">
            <FormattedMessage {...messages.waitForAnswer} />
          </ChatBubble>
        )}
      </Box>
    </React.Fragment>
  );
};

export default PuzzleDialogue;
