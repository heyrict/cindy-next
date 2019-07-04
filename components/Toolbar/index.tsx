import React from 'react';

import { ToolbarDisplayGeneral, ToolbarDisplayResponsive } from './shared';
import ToolbarGeneral from './ToolbarGeneral';
import ToolbarResponsive from './ToolbarResponsive';

const Toolbar = () => {
  return (
    <React.Fragment>
      <ToolbarDisplayGeneral>
        <ToolbarGeneral />
      </ToolbarDisplayGeneral>
      <ToolbarDisplayResponsive>
        <ToolbarResponsive />
      </ToolbarDisplayResponsive>
    </React.Fragment>
  );
};

export default Toolbar;
