import styled from 'theme/styled';
import { space, maxWidth, SpaceProps, MaxWidthProps } from 'styled-system';

const Anchor = styled.a<SpaceProps & MaxWidthProps>`
  display: inline-block;
  color: ${p => p.theme.colors.blue[6]};
  overflow: hidden;
  word-break: break-all;
  &:hover,
  &:active {
    color: ${p => p.theme.colors.cyan[6]};
  }
  ${space}
  ${maxWidth}
`;

export default Anchor;
