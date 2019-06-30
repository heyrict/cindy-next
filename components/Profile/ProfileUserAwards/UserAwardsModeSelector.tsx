import React, { useState } from 'react';

import UserAwardsDisplay from './UserAwardsDisplay';
import UserAwardsEdit from './UserAwardsEdit';
import UserAwardsBar from './UserAwardsBar';

import { UserAwardsModeSelectorProps } from './types';

const UserAwardsModeSelector = ({
  userAwards,
  currentUserAward,
  userId,
}: UserAwardsModeSelectorProps) => {
  const [edit, setEdit] = useState(false);

  return (
    <React.Fragment>
      <UserAwardsBar editable onClick={() => setEdit(!edit)} />
      {edit ? (
        <UserAwardsEdit
          userId={userId}
          setEdit={setEdit}
          userAwards={userAwards}
          currentUserAward={currentUserAward}
        />
      ) : (
        <UserAwardsDisplay
          userAwards={userAwards}
          currentUserAward={currentUserAward}
        />
      )}
    </React.Fragment>
  );
};

export default UserAwardsModeSelector;
