import styled from 'theme/styled';
import Flex from 'components/General/Flex';

const KeywordPanelKeywords = styled(Flex)`
  flex-wrap: wrap;
  border-top: 2px solid ${p => p.theme.colors.yellow[6]};
  padding-top: 0.5em;
  max-height: 15em;
  overflow-y: auto;
`;

export default KeywordPanelKeywords;
