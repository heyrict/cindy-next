import styled from '@emotion/styled';
import {
  alignItems,
  flexWrap,
  justifyContent,
  space,
  width,
  height,
} from 'styled-system';

const Flex = styled.div`
  box-sizing: 'border-box';
  min-width: 0;
  display: flex;
  ${alignItems}
  ${flexWrap}
  ${justifyContent}
  ${space}
  ${width}
  ${height}
`;

Flex.propTypes = {
  ...alignItems.propTypes,
  ...flexWrap.propTypes,
  ...justifyContent.propTypes,
  ...space.propTypes,
  ...width.propTypes,
  ...height.propTypes,
};

export default Flex;
