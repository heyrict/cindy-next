import styled from '@emotion/styled';
import {
  flexbox,
  space,
  color,
  layout,
} from 'styled-system';

const Flex = styled.div`
  box-sizing: 'border-box';
  min-width: 0;
  display: flex;
  ${flexbox}
  ${space}
  ${color}
  ${layout}
`;

Flex.propTypes = {
  ...flexbox.propTypes,
  ...space.propTypes,
  ...color.propTypes,
  ...layout.propTypes,
};

export default Flex;
