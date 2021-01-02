import styled from 'theme/styled';
import Panel from 'components/General/Panel';

import { PuzzlePaneProps } from './types';
import {Status} from 'generated/globalTypes';

const PuzzlePane = styled(Panel)<PuzzlePaneProps>`
  background: ${p => {
    switch (p.status) {
      case Status.UNDERGOING:
        return p.theme.colors.pink[0];
      case Status.SOLVED:
        return p.theme.colors.yellow[0];
      case Status.DAZED:
        return p.theme.colors.blue[0];
      case Status.HIDDEN:
      case Status.FORCE_HIDDEN:
        return p.theme.colors.gray[1];
      default:
        return 'rgba(255, 255, 255, 0.5)';
    }
  }};
`;

export default PuzzlePane;
