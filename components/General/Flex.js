import styled from '@emotion/styled';
import {
  alignItems,
  flexWrap,
  flexDirection,
  justifyContent,
  space,
  color,
  layout,
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
  ${layout}
`;

Flex.propTypes = {
  ...alignItems.propTypes,
  ...flexWrap.propTypes,
  ...flexDirection.propTypes,
  ...justifyContent.propTypes,
  ...space.propTypes,
  ...color.propTypes,
  ...layout.propTypes,
};

export default Flex;
