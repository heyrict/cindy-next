import styled from '@emotion/styled';
import { space, color, fontSize, borders, layout } from 'styled-system';

const EditTimeSpan = styled.span`
  box-sizing: 'border-box';
  min-width: 0;
  margin-left: ${p => p.theme.space[1]}px;
  color: ${p => p.theme.colors.gray[6]};
  font-size: 0.8em;
  ${space}
  ${color}
  ${fontSize}
  ${borders}
  ${layout}
`;

EditTimeSpan.propTypes = {
  ...space.propTypes,
  ...color.propTypes,
  ...fontSize.propTypes,
  ...borders.propTypes,
  ...layout.propTypes,
};

export default EditTimeSpan;
