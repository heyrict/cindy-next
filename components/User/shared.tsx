import styled from 'theme/styled';
import { space, color, typography, layout, flexbox } from 'styled-system';

import { UserBaseProps } from './types';

export const UserColBase = styled<'div', UserBaseProps>('div')`
  display: inline-flex;
  overflow: hidden;
  flex-direction: column;
  align-items: center;
  text-align: center;
  ${space}
  ${layout}
  ${color}
  ${flexbox}
  ${typography}
`;

export const UserInlineBase = styled<'div', UserBaseProps>('div')`
  display: inline-flex;
  flex-wrap: wrap;
  overflow: hidden;
  align-items: baseline;
  ${space}
  ${color}
  ${layout}
  ${typography}
  ${flexbox}
`;
