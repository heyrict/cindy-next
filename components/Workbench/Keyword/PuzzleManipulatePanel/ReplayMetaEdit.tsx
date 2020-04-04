import React, { useRef, useEffect, useState } from 'react';

import { connect } from 'react-redux';
import * as addReplayReducer from 'reducers/addReplay';

import { Flex, Box, Input, ButtonTransparent, Img } from 'components/General';
import tickIcon from 'svgs/tick.svg';
import crossIcon from 'svgs/cross.svg';
import pencilIcon from 'svgs/pencil.svg';

import { StateType, ActionContentType } from 'reducers/types';
import { ReplayMetaEditProps } from './types';

const ReplayMetaEdit = ({ title, setTitle }: ReplayMetaEditProps) => {
  const [edit, setEdit] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    inputRef.current.value = title;
  }, [title]);

  return (
    <Flex width={1} minHeight="3em" alignItems="center">
      <Box mr={2}>Title</Box>
      <Input hidden={!edit} style={{ flexGrow: 1 }} ref={inputRef} />
      {edit ? (
        <>
          <ButtonTransparent
            onClick={() => {
              let title = inputRef.current.value.trim();
              if (title.length >= 0) {
                setTitle(title);
              }
              setEdit(false);
            }}
          >
            <Img height="xxs" src={tickIcon} alt="ok" />
          </ButtonTransparent>
          <ButtonTransparent onClick={() => setEdit(false)}>
            <Img height="xxs" src={crossIcon} alt="cancel" />
          </ButtonTransparent>
        </>
      ) : (
        <>
          <Box fontSize={3} fontWeight="bold">
            {title}
          </Box>
          <ButtonTransparent onClick={() => setEdit(true)}>
            <Img height="xxs" src={pencilIcon} alt="edit" />
          </ButtonTransparent>
        </>
      )}
    </Flex>
  );
};

const mapStateToProps = (state: StateType) => ({
  title: addReplayReducer.rootSelector(state).title,
});

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  setTitle: (title: string) =>
    dispatch(addReplayReducer.actions.title.set(title)),
});

const withRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRedux(ReplayMetaEdit);
