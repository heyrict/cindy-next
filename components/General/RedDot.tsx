import styled from 'theme/styled';
import { layout, position, LayoutProps, PositionProps } from 'styled-system';

const RedDot = styled.div<LayoutProps & PositionProps>`
  position: absolute;
  width: 10px;
  height: 10px;
  background: orangered;
  border-radius: 100px;
  ${layout}
  ${position}
`;

export default RedDot;
