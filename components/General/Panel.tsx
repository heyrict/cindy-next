import styled from 'theme/styled';
import {
  flexbox,
  space,
  color,
  layout,
  border,
  SpaceProps,
  BorderProps,
  FlexboxProps,
  ColorProps,
  LayoutProps,
} from 'styled-system';

const Panel = styled.div<
  FlexboxProps & SpaceProps & ColorProps & LayoutProps & BorderProps
>`
  box-sizing: 'border-box';
  min-width: 0;
  display: flex;
  color: ${p => p.theme.colors.preset.puzzle.panel.fg};
  background-color: ${p => p.theme.colors.preset.puzzle.panel.bg};
  border-color: ${p => p.theme.colors.preset.puzzle.panel.ac};
  border-radius: ${p => p.theme.radii[2]}px;
  border-width: ${p => p.theme.space[1]}px;
  border-style: groove;
  margin: ${p => p.theme.space[2]}px;
  padding: ${p => p.theme.space[2]}px;
  min-height: 9.5em;
  ${flexbox}
  ${space}
  ${color}
  ${layout}
  ${border}
`;

export default Panel;
