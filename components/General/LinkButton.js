import styled from '@emotion/styled';
import { space, color, width, fontSize, borders, height } from 'styled-system';

const LinkButton = styled.a`
  display: block;
  background-color: ${p => p.theme.colors.blue[6]};
  ${space}
  ${color}
  ${width}
  ${height}
  ${fontSize}
  ${borders}
`;

LinkButton.propTypes = {
  ...space.propTypes,
  ...color.propTypes,
  ...width.propTypes,
  ...height.propTypes,
  ...fontSize.propTypes,
  ...borders.propTypes,
};

export default LinkButton;
