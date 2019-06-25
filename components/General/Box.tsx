import styled from 'theme/styled';
import {
  space,
  color,
  fontSize,
  borders,
  layout,
  SpaceProps,
  FontSizeProps,
  BordersProps,
} from 'styled-system';

import { ColorProps, LayoutProps } from './types';

const Box = styled.div<
  SpaceProps & ColorProps & FontSizeProps & BordersProps & LayoutProps
>`
  box-sizing: 'border-box';
  min-width: 0;
  ${space}
  ${color}
  ${fontSize}
  ${borders}
  ${layout}
`;

export default Box;
