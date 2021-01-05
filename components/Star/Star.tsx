import styled from 'theme/styled';
import { opacity, typography } from 'styled-system';

import { StarProps } from './types';

export const Star = styled.button<StarProps>`
  position: relative;
  width: 1.2em;
  height: 1.2em;
  padding: 0 5px;
  color: ${p => (p.active ? p.theme.colors.violet[6] : p.theme.colors.gray[2])};
  background: transparent;
  ${typography}
  ${opacity}
  &::after {
    display: ${p => (p.half ? 'block' : 'none')},
    content: '★',
    position: absolute,
    left: 0,
    top: 0,
    width: 1.2em,
    height: 1.2em,
    clip: rect(0, .45em, 1em, 0)
  }
`;

const StarWithProps = ({ ...props }: StarProps) => <Star {...props}>★</Star>;

export default StarWithProps;
