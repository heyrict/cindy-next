import React from 'react';

import { MilestoneLabelProps } from './types';

const MilestoneLabel = ({ milestone }: MilestoneLabelProps) =>
  milestone ? (
  <>
      {milestone.name}({milestone.handle})
      </>
  ) : null;

export default MilestoneLabel;
