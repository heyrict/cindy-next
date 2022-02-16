import styled from 'theme/styled';

import { ChatBubbleProps } from './types';

const ChatBubble = styled.div<ChatBubbleProps>`
  margin-left: 0.5em;
  margin-right: 0.5em;
  margin-bottom: 1.5em;
  padding: 0.8em;
  display: block;
  position: relative;
  background-color: ${p => p.theme.colors.orange[1]};
  border: 0.4em solid ${p => p.theme.colors.orange[4]};
  &:before {
    content: ' ';
    position: absolute;
    width: 0;
    height: 0;
    ${p => p.orientation}: 1.2em;
    bottom: -1.6em;
    border: 0.8em solid;
    border-color: ${p =>
      p.orientation == 'left'
        ? `${p.theme.colors.orange[4]} transparent transparent ${p.theme.colors.orange[4]}`
        : `${p.theme.colors.orange[4]} ${p.theme.colors.orange[4]} transparent transparent`};
  }
  &:after {
    content: ' ';
    position: absolute;
    width: 0;
    height: 0;
    ${p => p.orientation}: 1.5em;
    bottom: -0.9em;
    border: 0.5em solid;
    border-color: ${p =>
      p.orientation == 'left'
        ? `${p.theme.colors.orange[1]} transparent transparent ${p.theme.colors.orange[1]}`
        : `${p.theme.colors.orange[1]} ${p.theme.colors.orange[1]} transparent transparent`};
  }
`;

ChatBubble.defaultProps = {
  orientation: 'left',
};

export default ChatBubble;
