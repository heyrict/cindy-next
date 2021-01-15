import React, { useRef } from 'react';
import { toast } from 'react-toastify';

import { useMutation } from '@apollo/client';
import { EDIT_PROFILE_MUTATION } from 'graphql/Mutations/User';

import { Flex, ButtonTransparent, Img, Box } from 'components/General';
import { LegacyEditor } from 'components/PreviewEditor';

import crossIcon from 'svgs/cross.svg';
import tickIcon from 'svgs/tick.svg';

import { ProfileEditProps } from './types';
import {
  EditProfileMutation,
  EditProfileMutationVariables,
} from 'graphql/Mutations/generated/EditProfileMutation';

const ProfileEdit = ({ profile, setEdit, userId }: ProfileEditProps) => {
  const editorRef = useRef<LegacyEditor>(null!);

  const [editProfile] = useMutation<
    EditProfileMutation,
    EditProfileMutationVariables
  >(EDIT_PROFILE_MUTATION, {
    onError: error => {
      const newProfile = editorRef.current.getText().trim();
      toast.error(JSON.stringify(error));
      setEdit(true);
      editorRef.current.setText(newProfile);
    },
  });

  return (
    <React.Fragment>
      <Box width={1}>
        <LegacyEditor initialValue={profile} ref={editorRef} />
      </Box>
      <Flex width={1} borderWidth="3px" borderColor="red.7" borderStyle="solid">
        <ButtonTransparent
          width={1}
          p={1}
          borderLeft={0}
          borderTop={0}
          borderRight="3px"
          borderBottom={0}
          borderColor="red.7"
          borderStyle="solid"
          onClick={() => setEdit(false)}
        >
          <Img size="xs" alt="cancel" src={crossIcon} />
        </ButtonTransparent>
        <ButtonTransparent
          width={1}
          p={1}
          onClick={() => {
            const newProfile = editorRef.current.getText().trim();
            if (newProfile === profile.trim()) {
              setEdit(false);
            } else {
              editProfile({
                variables: {
                  userId: userId,
                  content: newProfile,
                },
                optimisticResponse: {
                  updateUser: {
                    __typename: 'User',
                    id: userId,
                    profile: newProfile,
                  },
                },
              });
              setEdit(false);
            }
          }}
        >
          <Img size="xs" alt="submit" src={tickIcon} />
        </ButtonTransparent>
      </Flex>
    </React.Fragment>
  );
};

export default ProfileEdit;
