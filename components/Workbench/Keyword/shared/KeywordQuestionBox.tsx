import styled from 'theme/styled';
import { KeywordQuestionBoxProps } from './types';

const KeywordQuestionBox = styled.div<KeywordQuestionBoxProps>`
  width: 100%;
  display: flex;
  align-items: baseline;
  &:before {
    content: '${p => p.prefix || 'Q'}';
    margin-right: 0.5em;
    font-size: 1.2em;
    font-weight: bold;
  }
`;

export default KeywordQuestionBox;
