import Flex from './Flex';
import styled from '@emotion/styled';

const Panel = styled(Flex)`
  background-color: lightyellow;
  border-color: ${p => p.theme.colors.umenezumi};
  border-radius: ${p => p.theme.radii[2]}px;
  border-width: ${p => p.theme.space[1]}px;
  border-style: groove;
  margin: ${p => p.theme.space[2]}px;
  padding: ${p => p.theme.space[2]}px;
  min-height: 8em;
  ${p => p.theme.mediaQueries.small} {
    min-height: 6em;
  }
`;

export default Panel;
