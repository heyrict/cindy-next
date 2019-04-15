import styled from '@emotion/styled';

const ChatBox = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: ${p => p.theme.sizes.chat};
  overflow-x: hidden;
  overflow-y: auto;
  min-height: 100%;
  z-index: 200;
  border: 2px solid ${p => p.theme.colors.edocha};
`;

export default ChatBox;
