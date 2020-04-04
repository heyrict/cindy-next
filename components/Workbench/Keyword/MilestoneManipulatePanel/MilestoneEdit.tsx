import React, { useRef, useEffect } from 'react';
import { toast } from 'react-toastify';

import { Flex, Input, ButtonTransparent, Img, Box } from 'components/General';
import { LegacyEditor } from 'components/PreviewEditor';
import { stampNamespaces } from 'stamps';
import tickIcon from 'svgs/tick.svg';
import crossIcon from 'svgs/cross.svg';
import dustbinIcon from 'svgs/dustbin.svg';

import { MilestoneEditProps, MilestoneEditMode } from './types';

const fieldNameStyle = {
  width: [1, 1 / 6],
  textAlign: ['initial', 'center'] as ['initial', 'center'],
  borderWidth: [0, 1],
  mx: [0, -1],
  mb: [0, 3],
  borderStyle: 'solid' as 'solid',
  borderColor: 'gray.6',
};

const fieldContentStyle = {
  width: [1, 5 / 6],
  mb: 3,
};

const inputFieldNameStyle = {
  ...fieldNameStyle,
  borderRadius: '2em 0 0 2em',
};

const fieldInputStyle = {
  width: 1,
  bg: 'orange.0',
  borderRadius: ['4px', '0 2em 2em 0'],
};

const MilestoneEdit = ({
  milestone,
  addMilestone,
  editMilestone,
  removeMilestone,
}: MilestoneEditProps) => {
  const mode =
    milestone === undefined ? MilestoneEditMode.ADD : MilestoneEditMode.EDIT;
  const inputHandleRef = useRef<HTMLInputElement>(null!);
  const inputNameRef = useRef<HTMLInputElement>(null!);
  const descriptionEditor = useRef<LegacyEditor>(null!);

  useEffect(() => {
    if (milestone) {
      inputHandleRef.current.value = milestone.handle;
      inputNameRef.current.value = milestone.name;
      descriptionEditor.current.setText(milestone.description);
    } else {
      inputHandleRef.current.value = '';
      inputNameRef.current.value = '';
      descriptionEditor.current.setText('');
    }
  }, [milestone]);

  const clear = () => {
    inputHandleRef.current.value = '';
    inputNameRef.current.value = '';
    descriptionEditor.current.setText('');
  };

  const check = (handle: string, name: string, description: string) => {
    if (handle.length > 20) {
      toast.error('Handle is too long (over 20 characters)');
    } else if (handle.length === 0) {
      toast.error('Handle is empty');
    } else if (name.length === 0) {
      toast.error('Name is empty');
    } else if (description.length === 0) {
      toast.error('Description is empty');
    } else {
      return true;
    }
    return false;
  };

  return (
    <Flex m={2} flexWrap="wrap" width={1}>
      <Box {...inputFieldNameStyle}>Handle</Box>
      <Box {...fieldContentStyle}>
        <Input
          disabled={mode !== MilestoneEditMode.ADD}
          {...fieldInputStyle}
          ref={inputHandleRef}
        />
      </Box>
      <Box {...inputFieldNameStyle}>Name</Box>
      <Box {...fieldContentStyle}>
        <Input {...fieldInputStyle} ref={inputNameRef} />
      </Box>
      <Box {...inputFieldNameStyle}>Description</Box>
      <Box {...fieldContentStyle}>
        <LegacyEditor
          useNamespaces={[stampNamespaces.puzzle]}
          ref={descriptionEditor}
        />
      </Box>
      {mode === MilestoneEditMode.EDIT ? (
        <Flex width={1}>
          <Box bg="red.1" border="2px solid" borderColor="red.3" width={1 / 3}>
            <ButtonTransparent
              py={1}
              width={1}
              onClick={() => {
                toast.info('Deleted successfully!');
                removeMilestone(milestone!.handle);
                clear();
              }}
            >
              <Img height="xs" src={dustbinIcon} alt="delete" />
            </ButtonTransparent>
          </Box>
          <Box
            bg="orange.1"
            border="2px solid"
            borderColor="orange.3"
            width={1 / 3}
          >
            <ButtonTransparent
              py={1}
              width={1}
              onClick={() => {
                inputHandleRef.current.value = milestone!.handle;
                inputNameRef.current.value = milestone!.name;
                descriptionEditor.current.setText(milestone!.description);
              }}
            >
              <Img height="xs" src={crossIcon} alt="reset" />
            </ButtonTransparent>
          </Box>
          <Box
            bg="lime.1"
            border="2px solid"
            borderColor="lime.3"
            width={1 / 3}
          >
            <ButtonTransparent
              py={1}
              width={1}
              onClick={() => {
                let handle = milestone!.handle;
                let name = inputNameRef.current.value.trim();
                let desc = descriptionEditor.current.getText().trim();
                if (check(handle, name, desc) === true) {
                  editMilestone(
                    milestone!.handle,
                    inputNameRef.current.value,
                    descriptionEditor.current.getText(),
                  );
                  toast.info('Saved successfully!');
                }
              }}
            >
              <Img height="xs" src={tickIcon} alt="save" />
            </ButtonTransparent>
          </Box>
        </Flex>
      ) : (
        <Flex width={1}>
          <Box
            bg="orange.1"
            border="2px solid"
            borderColor="orange.3"
            width={1 / 2}
          >
            <ButtonTransparent py={1} width={1} onClick={clear}>
              <Img height="xs" src={crossIcon} alt="reset" />
            </ButtonTransparent>
          </Box>
          <Box
            bg="lime.1"
            border="2px solid"
            borderColor="lime.3"
            width={1 / 2}
          >
            <ButtonTransparent
              py={1}
              width={1}
              onClick={() => {
                let handle = inputHandleRef.current.value.trim();
                let name = inputNameRef.current.value.trim();
                let desc = descriptionEditor.current.getText().trim();
                if (check(handle, name, desc) === true) {
                  addMilestone(handle, name, desc);
                  toast.info('Saved successfully!');
                  clear();
                }
              }}
            >
              <Img height="xs" src={tickIcon} alt="save" />
            </ButtonTransparent>
          </Box>
        </Flex>
      )}
    </Flex>
  );
};

export default MilestoneEdit;
