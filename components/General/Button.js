import styled from '@emotion/styled';
import { space, color, width, fontSize, borders, height } from 'styled-system';

const Button = styled.button`
  background-color: ${p => p.theme.colors.orange[6]};
  color: ${p => p.theme.colors.gray[1]};
  overflow: hidden;
  ${space}
  ${color}
  ${width}
  ${height}
  ${fontSize}
  ${borders}
`;

Button.propTypes = {
  ...space.propTypes,
  ...color.propTypes,
  ...width.propTypes,
  ...height.propTypes,
  ...fontSize.propTypes,
  ...borders.propTypes,
};

export default Button;
