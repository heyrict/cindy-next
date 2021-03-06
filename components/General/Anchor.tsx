import styled from 'theme/styled';
import { space, layout, SpaceProps, LayoutProps } from 'styled-system';

const Anchor = styled.a<SpaceProps & LayoutProps>`
  display: inline-block;
  color: ${p => p.theme.colors.blue[6]};
  font-size: 1em;
  background: transparent;
  overflow: hidden;
  word-break: break-all;
  &:hover,
  &:active {
    color: ${p => p.theme.colors.cyan[6]};
  }
  ${space}
  ${layout}
`;

export default Anchor;
