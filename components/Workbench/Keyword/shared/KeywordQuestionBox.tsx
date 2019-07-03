import styled from 'theme/styled';
import { KeywordQuestionBoxProps } from './types';

const KeywordQuestionBox = styled.div<KeywordQuestionBoxProps>`
  width: 100%;
  &:before {
    content: 'Q${p => p.qno}';
    margin-right: 0.5em;
    font-size: 1.2em;
    font-weight: bold;
  }
`;

export default KeywordQuestionBox;
