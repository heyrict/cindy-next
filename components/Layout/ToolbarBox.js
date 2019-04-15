import styled from '@emotion/styled';

const ToolbarBox = styled.div`
  position: fixed;
  left: calc(${p => p.theme.sizes.chat} + 2px);
  top: 0;
  min-height: ${p => p.theme.sizes.toolbar};
  width: ${p => `calc(100% - ${p.theme.sizes.chat})`};
  border: 2px solid ${p => p.theme.colors.edocha};
  overflow-x: auto;
  overflow-y: hidden;
`;

export default ToolbarBox;
