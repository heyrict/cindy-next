import styled from 'theme/styled';
import {
  space,
  borders,
  layout,
  SpaceProps,
  BordersProps,
} from 'styled-system';
import { LayoutStrictProps } from './types';

const Img = styled.img<SpaceProps & BordersProps & LayoutStrictProps>`
  overflow: hidden;
  vertical-align: middle;
  ${layout}
  ${space}
  ${borders}
`;

export default Img;
