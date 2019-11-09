import React, { useRef } from 'react';
import { toast } from 'react-toastify';

import { Mutation } from '@apollo/react-components';
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
import { ApolloError } from 'apollo-client/errors/ApolloError';

const ProfileEdit = ({ profile, setEdit, userId }: ProfileEditProps) => {
  const editorRef = useRef<LegacyEditor>(null!);

  return (
    <Mutation<EditProfileMutation, EditProfileMutationVariables>
      mutation={EDIT_PROFILE_MUTATION}
    >
      {editProfile => (
        <React.Fragment>
          <Box width={1}>
            <LegacyEditor initialValue={profile} ref={editorRef} />
          </Box>
          <Flex
            width={1}
            borderWidth="3px"
            borderColor="red.7"
            borderStyle="solid"
          >
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
                      update_sui_hei_user: {
                        __typename: 'sui_hei_user_mutation_response',
                        returning: [
                          {
                            __typename: 'sui_hei_user',
                            id: userId,
                            profile: newProfile,
                          },
                        ],
                      },
                    },
                  })
                    .then(result => {
                      if (!result) return;
                      const { errors } = result;
                      if (errors) {
                        toast.error(JSON.stringify(errors));
                        setEdit(true);
                        editorRef.current.setText(newProfile);
                      }
                    })
                    .catch((error: ApolloError) => {
                      toast.error(error.message);
                      setEdit(true);
                      editorRef.current.setText(newProfile);
                    });
                  setEdit(false);
                }
              }}
            >
              <Img size="xs" alt="submit" src={tickIcon} />
            </ButtonTransparent>
          </Flex>
        </React.Fragment>
      )}
    </Mutation>
  );
};

export default ProfileEdit;
