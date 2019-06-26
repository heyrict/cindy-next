import styled from 'theme/styled';
import { space, border, layout, SpaceProps } from 'styled-system';
import { LayoutStrictProps, BorderProps } from './types';

const Img = styled.img<SpaceProps & BorderProps & LayoutStrictProps>`
  overflow: hidden;
  vertical-align: middle;
  ${layout}
  ${space}
  ${border}
`;

export default Img;
