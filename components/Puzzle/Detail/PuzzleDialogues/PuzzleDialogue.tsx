/*
 * PuzzleDialogue
 *
 */
import React from 'react';

import { FormattedTime } from 'react-intl';

import { Box } from 'components/General';
import UserInline from 'components/User/UserInline';
import { AnonymousUserInline } from 'components/User/Anonymous';
import ChatBubble from 'components/Chat/Chatmessage/ChatBubble';
import ChatBubbleTop from 'components/Chat/Chatmessage/ChatBubbleTop';

import PuzzleDialogueQuestion from './PuzzleDialogueQuestion';
import PuzzleDialogueAnswer from './PuzzleDialogueAnswer';
import IndexLabel from './IndexLabel';
import { PuzzleDialogueProps } from './types';

const PuzzleDialogue = ({
  index,
  dialogue,
  puzzleUser,
  puzzleStatus,
  anonymous,
}: PuzzleDialogueProps) => {
  return (
    <React.Fragment>
      <Box
        id={`Q${dialogue.qno}`}
        width={[7 / 8, 1 / 2]}
        mr="auto"
        mb={[-2, 0]}
      >
        <ChatBubbleTop>
          {index && <IndexLabel>Q{index}</IndexLabel>}
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
          <PuzzleDialogueQuestion
            dialogueId={dialogue.id}
            question={dialogue.question}
            userId={dialogue.sui_hei_user.id}
            questionEditTimes={dialogue.questionEditTimes}
            puzzleStatus={puzzleStatus}
            isAnswered={dialogue.answer !== ''}
          />
        </ChatBubble>
      </Box>
      <Box width={[7 / 8, 1 / 2]} ml="auto" mt={[-2, 0]} mb={[1, 0]}>
        <ChatBubbleTop>
          {dialogue.answer && index && <IndexLabel>A{index}</IndexLabel>}
          {dialogue.answer &&
            (anonymous && puzzleStatus === 0 ? (
              <AnonymousUserInline
                px={1}
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
            ) : (
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
            ))}
        </ChatBubbleTop>
        <ChatBubble orientation="right">
          <PuzzleDialogueAnswer
            dialogueId={dialogue.id}
            goodAns={dialogue.good}
            trueAns={dialogue.true}
            answer={dialogue.answer}
            answeredtime={dialogue.answeredtime}
            puzzleUserId={puzzleUser.id}
            answerEditTimes={dialogue.answerEditTimes}
            puzzleStatus={puzzleStatus}
          />
        </ChatBubble>
      </Box>
    </React.Fragment>
  );
};

export default PuzzleDialogue;
