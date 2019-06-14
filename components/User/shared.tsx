import React from 'react';
import styled from 'theme/styled';
import { space, color, fontSize, width } from 'styled-system';

import { UserBaseProps } from './types';

export const UserColBase: React.FunctionComponent<UserBaseProps> = styled.div`
  display: inline-flex;
  overflow: hidden;
  flex-direction: column;
  align-items: center;
  text-align: center;
  ${space}
  ${width}
  ${color}
  ${fontSize}
`;

export const UserInlineBase: React.FunctionComponent<
  UserBaseProps
> = styled.div`
  display: inline-flex;
  overflow: hidden;
  align-items: center;
  ${space}
  ${color}
  ${fontSize}
`;
