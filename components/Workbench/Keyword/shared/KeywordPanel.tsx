import styled from 'theme/styled';

const KeywordPanel = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  border-color: ${p => p.theme.colors.yellow[6]};
  border-radius: 0 0 ${p => p.theme.radii[2]}px ${p => p.theme.radii[2]}px;
  border-width: ${p => p.theme.space[1]}px;
  border-style: solid;
  padding: ${p => p.theme.space[2]}px;
  width: 100%;
  margin-bottom: ${p => p.theme.space[2]}px;
`;

export default KeywordPanel;
