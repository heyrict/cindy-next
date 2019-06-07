import Flex from './Flex';
import styled from '@emotion/styled';

const Panel = styled(Flex)`
  background-color: rgba(255, 255, 255, 0.5);
  border-color: ${p => p.theme.colors.red[4]};
  border-radius: ${p => p.theme.radii[2]}px;
  border-width: ${p => p.theme.space[1]}px;
  border-style: groove;
  margin: ${p => p.theme.space[2]}px;
  padding: ${p => p.theme.space[2]}px;
  min-height: 9.5em;
`;

export default Panel;
