import styled from 'theme/styled';
import { KeywordBoxProps, KeywordType } from './types';

const KeywordBox = styled.div<KeywordBoxProps>`
  display: inline-box;
  ${p =>
    p.keywordType === KeywordType.TO_DELETE &&
    'text-decoration-line: line-through;'}
  font-size: 0.9em;
  border: 2px solid
    ${p => {
      switch (p.keywordType) {
        case KeywordType.DEFAULT:
          return p.theme.colors.gray[5];
        case KeywordType.TO_DELETE:
          return p.theme.colors.gray[3];
        case KeywordType.TO_ADD:
          return p.theme.colors.green[3];
        default:
          return p.theme.colors.black;
      }
    }};
  border-radius: 5px;
  margin: 2px 3px;
  background-color: ${p => {
    switch (p.keywordType) {
      case KeywordType.DEFAULT:
      case KeywordType.TO_DELETE:
        return p.theme.colors.gray[1];
      case KeywordType.TO_ADD:
        return p.theme.colors.green[1];
      default:
        return p.theme.colors.white;
    }
  }};
  color: ${p => {
    switch (p.keywordType) {
      case KeywordType.DEFAULT:
        return p.theme.colors.gray[8];
      case KeywordType.TO_DELETE:
        return p.theme.colors.gray[6];
      case KeywordType.TO_ADD:
        return p.theme.colors.green[9];
      default:
        return p.theme.colors.black;
    }
  }};
`;

export default KeywordBox;
