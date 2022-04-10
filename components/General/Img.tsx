import styled from 'theme/styled';
import {
  space,
  border,
  layout,
  SpaceProps,
  BorderProps,
  LayoutProps,
} from 'styled-system';

const Img = styled.img<SpaceProps & BorderProps & LayoutProps>`
  overflow: hidden;
  vertical-align: middle;
  ${layout}
  ${space}
  ${border}
`;

export default Img;
