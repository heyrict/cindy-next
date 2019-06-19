import styled from "theme/styled";
import Panel from "components/General/Panel";

import { PuzzlePaneProps } from "./types";

const PuzzlePane = styled(Panel)<PuzzlePaneProps>`
  background: ${p => {
    switch(p.status) {
      case 0:
        return p.theme.colors.pink[0];
      case 1:
        return p.theme.colors.yellow[0];
      case 2:
        return p.theme.colors.blue[0];
      default:
        return p.theme.colors.gray[0];
    }
  }};
`

export default PuzzlePane;
