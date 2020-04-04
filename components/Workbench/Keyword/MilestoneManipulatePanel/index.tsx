import React, { useState } from 'react';

import { connect } from 'react-redux';
import * as addReplayReducer from 'reducers/addReplay';

import { ButtonTransparent } from 'components/General';
import MilestoneEdit from 'components/Workbench/Keyword/MilestoneManipulatePanel/MilestoneEdit';
import MilestoneBox from '../shared/MilestoneBox';

import { StateType, ActionContentType } from 'reducers/types';
import { MilestoneBoxType } from '../shared/types';
import { MilestonesManagerProps } from './types';

const MilestonesManager = ({
  milestones,
  addMilestone,
  removeMilestone,
  editMilestone,
}: MilestonesManagerProps) => {
  const [editingMilestone, setEditingMilestone] = useState<string | undefined>(
    undefined,
  );

  return (
    <>
      {milestones.map(milestone => (
        <MilestoneBox
          key={`milestone-manager-${milestone.handle}`}
          milestoneType={
            editingMilestone && milestone.handle !== editingMilestone
              ? MilestoneBoxType.DEFAULT
              : MilestoneBoxType.SELECTED
          }
        >
          <ButtonTransparent
            onClick={() => setEditingMilestone(milestone.handle)}
          >
            {milestone.name}({milestone.handle})
          </ButtonTransparent>
        </MilestoneBox>
      ))}
      <MilestoneBox milestoneType={MilestoneBoxType.DEFAULT}>
        <ButtonTransparent onClick={() => setEditingMilestone(undefined)}>
          +
        </ButtonTransparent>
      </MilestoneBox>
      <MilestoneEdit
        milestone={
          editingMilestone === undefined
            ? undefined
            : milestones.find(m => m.handle === editingMilestone)
        }
        addMilestone={addMilestone}
        editMilestone={editMilestone}
        removeMilestone={removeMilestone}
      />
    </>
  );
};

const mapStateToProps = (state: StateType) => ({
  milestones: addReplayReducer.rootSelector(state).milestones,
});

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  addMilestone: (handle: string, name: string, description: string) =>
    dispatch(
      addReplayReducer.actions.milestones.push({
        handle,
        name,
        description,
      }),
    ),
  removeMilestone: (handle: string) => {
    dispatch(
      addReplayReducer.actions.milestones.deleteWhere(m => m.handle === handle),
    );
    dispatch(
      addReplayReducer.actions.replayDialogues.update(null, prev => ({
        milestones: prev.milestones.filter(mid => mid !== handle),
        ...prev,
      })),
    );
  },
  editMilestone: (handle: string, name: string, description: string) =>
    dispatch(
      addReplayReducer.actions.milestones.update(null, prev =>
        prev.handle === handle
          ? {
              ...prev,
              name,
              description,
            }
          : prev,
      ),
    ),
});

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRedux(MilestonesManager);
