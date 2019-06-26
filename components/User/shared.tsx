import styled from 'theme/styled';
import { space, color, fontSize, layout } from 'styled-system';

import { UserBaseProps } from './types';

export const UserColBase = styled.div<UserBaseProps>`
  display: inline-flex;
  overflow: hidden;
  flex-direction: column;
  align-items: center;
  text-align: center;
  ${space}
  ${layout}
  ${color}
  ${fontSize}
`;

export const UserInlineBase = styled.div<UserBaseProps>`
  display: inline-flex;
  overflow: hidden;
  align-items: center;
  ${space}
  ${color}
  ${fontSize}
`;
