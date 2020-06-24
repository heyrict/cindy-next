import styled from 'theme/styled';
import { MilestoneBoxProps, MilestoneBoxType } from './types';

const MilestoneBox = styled.div<MilestoneBoxProps>`
  display: inline-box;
  font-size: 0.9em;
  border: 2px solid
    ${p => {
      switch (p.milestoneType) {
        case MilestoneBoxType.DEFAULT:
          return p.theme.colors.gray[5];
        case MilestoneBoxType.SELECTED:
          return p.theme.colors.indigo[3];
        default:
          return p.theme.colors.black;
      }
    }};
  border-radius: 5px;
  margin: 2px 3px;
  background-color: ${p => {
    switch (p.milestoneType) {
      case MilestoneBoxType.DEFAULT:
        return p.theme.colors.gray[1];
      case MilestoneBoxType.SELECTED:
        return p.theme.colors.indigo[1];
      default:
        return p.theme.colors.white;
    }
  }};
  color: ${p => {
    switch (p.milestoneType) {
      case MilestoneBoxType.DEFAULT:
        return p.theme.colors.gray[8];
      case MilestoneBoxType.SELECTED:
        return p.theme.colors.gray[6];
      default:
        return p.theme.colors.black;
    }
  }};
`;

export default MilestoneBox;
