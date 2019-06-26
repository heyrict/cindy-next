import styled from 'theme/styled';
import Img from 'components/General/Img';

export const IndicatorIcon = styled(Img)`
  float: left;
  width: 4em;
  ${p => p.theme.mediaQueries.small} {
    width: 3.2em;
  }
`;

export const ClearFix = styled.div`
  clear: both;
`;
