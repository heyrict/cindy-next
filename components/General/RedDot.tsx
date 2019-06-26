import styled from 'theme/styled';
import { layout, position } from 'styled-system';
import { LayoutProps, PositionProps } from './types';

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
