import styled from '@emotion/styled';
import {
  flexbox,
  space,
  border,
  color,
  layout,
} from 'styled-system';

const Flex = styled.div`
  box-sizing: 'border-box';
  min-width: 0;
  display: flex;
  ${flexbox}
  ${space}
  ${border}
  ${color}
  ${layout}
`;

Flex.propTypes = {
  ...flexbox.propTypes,
  ...space.propTypes,
  ...border.propTypes,
  ...color.propTypes,
  ...layout.propTypes,
};

export default Flex;
