import styled from '@emotion/styled';

import { ChatBubbleProps } from './types';

const ChatBubble = styled.div<ChatBubbleProps>`
  margin-left: 0.5em;
  margin-right: 0.5em;
  margin-bottom: 1.5em;
  padding: 0.8em;
  display: block;
  position: relative;
  background-color: lightyellow;
  border: 0.4em solid #666;
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
        ? '#666 transparent transparent #666'
        : '#666 #666 transparent transparent'};
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
        ? 'lightyellow transparent transparent lightyellow'
        : 'lightyellow lightyellow transparent transparent'};
  }
`;

ChatBubble.defaultProps = {
  orientation: 'left',
};

export default ChatBubble;
