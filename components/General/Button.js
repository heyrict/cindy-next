import styled from '@emotion/styled';
import { space, color, fontSize, borders, layout } from 'styled-system';

const Button = styled.button`
  background-color: ${p => p.theme.colors.orange[6]};
  color: ${p => p.theme.colors.gray[1]};
  overflow: hidden;
  ${space}
  ${color}
  ${layout}
  ${fontSize}
  ${borders}
`;

Button.propTypes = {
  ...space.propTypes,
  ...color.propTypes,
  ...layout.propTypes,
  ...fontSize.propTypes,
  ...borders.propTypes,
};

export default Button;
