import React, { useState } from 'react';

import ProfileDisplay from './ProfileDisplay';
import ProfileEdit from './ProfileEdit';
import ProfileBar from './ProfileBar';

import { ProfileModeSelectorProps } from './types';

const ProfileModeSelector = ({ profile, userId }: ProfileModeSelectorProps) => {
  const [edit, setEdit] = useState(false);

  return edit ? (
    <ProfileEdit userId={userId} setEdit={setEdit} profile={profile} />
  ) : (
    <React.Fragment>
      <ProfileBar editable onClick={() => setEdit(true)} />
      <ProfileDisplay profile={profile} />
    </React.Fragment>
  );
};

export default ProfileModeSelector;
