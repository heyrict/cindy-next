import styled from 'theme/styled';
import {
  space,
  layout,
  border,
  color,
  SpaceProps,
  LayoutProps,
  BorderProps,
  ColorProps,
} from 'styled-system';

const Input = styled<
  'input',
  SpaceProps & LayoutProps & BorderProps & ColorProps
>('input')`
  box-sizing: 'border-box';
  border-width: 1px;
  border-color: ${p => p.theme.colors.orange[5]};
  border-style: solid;
  background-color: ${p => p.theme.colors.white};
  min-height: 1.5em;
  flex-grow: 1;
  ${space}
  ${layout}
  ${border}
  ${color}
`;

export default Input;
