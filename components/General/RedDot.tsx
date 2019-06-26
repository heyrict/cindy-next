import styled from 'theme/styled';
import {
  left,
  right,
  top,
  bottom,
  size,
  LeftProps,
  RightProps,
  TopProps,
  BottomProps,
  SizeProps,
} from 'styled-system';

const RedDot = styled.div<
  LeftProps & RightProps & TopProps & BottomProps & SizeProps
>`
  position: absolute;
  width: 10px;
  height: 10px;
  background: orangered;
  border-radius: 100px;
  ${left}
  ${right}
  ${top}
  ${bottom}
  ${size}
`;

export default RedDot;
