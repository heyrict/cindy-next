import styled from '@emotion/styled';
import {
  space,
  color,
  width,
  fontSize,
  fontWeight,
  borders,
  height,
} from 'styled-system';

const ButtonTransparent = styled.button`
  background-color: transparent;
  overflow: hidden;
  border: none;
  ${space}
  ${width}
  ${height}
  ${color}
  ${fontSize}
  ${fontWeight}
  ${borders}

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  &:active {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

ButtonTransparent.propTypes = {
  ...space.propTypes,
  ...width.propTypes,
  ...height.propTypes,
  ...color.propTypes,
  ...fontSize.propTypes,
  ...fontWeight.propTypes,
  ...borders.propTypes,
};

export default ButtonTransparent;
