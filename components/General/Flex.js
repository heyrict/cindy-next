import styled from '@emotion/styled';
import {
  alignItems,
  flexWrap,
  flexDirection,
  justifyContent,
  space,
  color,
  width,
  height,
} from 'styled-system';

const Flex = styled.div`
  box-sizing: 'border-box';
  min-width: 0;
  display: flex;
  ${alignItems}
  ${flexWrap}
  ${flexDirection}
  ${justifyContent}
  ${space}
  ${color}
  ${width}
  ${height}
`;

Flex.propTypes = {
  ...alignItems.propTypes,
  ...flexWrap.propTypes,
  ...flexDirection.propTypes,
  ...justifyContent.propTypes,
  ...space.propTypes,
  ...color.propTypes,
  ...width.propTypes,
  ...height.propTypes,
};

export default Flex;
