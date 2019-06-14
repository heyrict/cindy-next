import styled from 'theme/styled';

import { FilterButtonProps } from './types';

const FilterButton = styled.button<FilterButtonProps>`
  color: ${p => p.theme.colors.orange[9]};
  background: ${p =>
    p.accent ? p.theme.colors.orange[5] : p.theme.colors.yellow[5]};
  padding: ${p => p.theme.space[1]}px;
  margin-right: ${p => p.theme.space[1]}px;
  margin-bottom: ${p => p.theme.space[1]}px;
  border-radius: ${p => p.theme.radii[1]}px;
  border-bottom: 4px solid
    ${p => (p.active ? p.theme.colors.indigo[5] : 'transparent')};

  &:hover {
    background: ${p =>
      p.accent ? p.theme.colors.orange[6] : p.theme.colors.yellow[6]};
  }

  &:active {
    background: ${p =>
      p.accent ? p.theme.colors.orange[7] : p.theme.colors.yellow[7]};
  }
`;

export default FilterButton;
