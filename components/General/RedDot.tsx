import styled from 'theme/styled';
import { left, right, top, bottom, size } from 'styled-system';

const RedDot = styled.div`
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
