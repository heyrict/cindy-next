import React from 'react';

import { ToolbarDisplayGeneral, ToolbarDisplayResponsive } from './shared';
import ToolbarGeneral from './ToolbarGeneral';
import ToolbarResponsive from './ToolbarResponsive';
import LoginModal from './Login/LoginModal';
import SignupModal from './Signup/SignupModal';
import SettingsModal from './Settings/SettingsModal';
import MessageBoxModal from 'components/MessageBox';

const Toolbar = () => {
  return (
    <React.Fragment>
      <ToolbarDisplayGeneral>
        <ToolbarGeneral />
      </ToolbarDisplayGeneral>
      <ToolbarDisplayResponsive>
        <ToolbarResponsive />
      </ToolbarDisplayResponsive>
      <LoginModal />
      <SignupModal />
      <SettingsModal />
      <MessageBoxModal />
    </React.Fragment>
  );
};

export default Toolbar;
