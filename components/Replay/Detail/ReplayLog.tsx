import styled from 'theme/styled';

import { Box } from 'components/General';
import ChatBubble from 'components/Chat/Chatmessage/ChatBubble';
import QuestionDisplay from 'components/Puzzle/Detail/PuzzleDialogues/PuzzleDialogueQuestion/QuestionDisplay';
import AnswerDisplay from 'components/Puzzle/Detail/PuzzleDialogues/PuzzleDialogueAnswer/AnswerDisplay';

import { ReplayLogProps } from './types';

const IdBlock = styled.div`
  position: relative;
  top: -${p => p.theme.sizes.toolbar};
`;

const ReplayLog = ({ dialogue, qno }: ReplayLogProps) => dialogue ? (
  <>
    <Box width={[7 / 8, 1 / 2]} mr="auto" mb={[-2, 0]}>
      <IdBlock id={`Q${qno}`} />
      <ChatBubble orientation="left">
        <QuestionDisplay question={dialogue.question} questionEditTimes={0} />
      </ChatBubble>
    </Box>
    <Box width={[7 / 8, 1 / 2]} ml="auto" mt={[-2, 0]} mb={[1, 0]}>
      <ChatBubble orientation="right">
        <AnswerDisplay
          goodAns={dialogue.good}
          trueAns={dialogue.true}
          answer={dialogue.answer}
          answerEditTimes={0}
        />
        <div style={{ clear: 'both' }} />
      </ChatBubble>
    </Box>
  </>
) : null;

export default ReplayLog;
