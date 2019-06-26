import styled from 'theme/styled';
import { space, layout, SpaceProps } from 'styled-system';
import { LayoutProps } from './types';

const Anchor = styled.a<SpaceProps & LayoutProps>`
  display: inline-block;
  color: ${p => p.theme.colors.blue[6]};
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
