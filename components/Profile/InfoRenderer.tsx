import React from 'react';
import { toast } from 'react-toastify';
import { ProfileInfoRendererProps } from './types';
import ProfileInfo from './Info';

const ProfileInfoRenderer = ({ data, error }: ProfileInfoRendererProps) => {
  if (error) {
    toast.error(error.message);
    return null;
  }
  if (!data || !data.sui_hei_user_by_pk) {
    return null;
  }
  return (
    <ProfileInfo
      user={{
        ...data.sui_hei_user_by_pk,
        received_comments_aggregate: data.received_comments_aggregate,
        received_stars_aggregate: data.received_stars_aggregate,
      }}
    />
  );
};

export default ProfileInfoRenderer;
