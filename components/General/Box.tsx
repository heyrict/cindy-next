import styled from 'theme/styled';
import {
  space,
  color,
  typography,
  border,
  layout,
  SpaceProps,
} from 'styled-system';

import { ColorProps, LayoutProps, TypographyProps, BorderProps } from './types';

const Box = styled.div<
  SpaceProps & ColorProps & TypographyProps & BorderProps & LayoutProps
>`
  box-sizing: 'border-box';
  min-width: 0;
  ${space}
  ${color}
  ${typography}
  ${border}
  ${layout}
`;

export default Box;
