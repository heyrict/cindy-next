import React from 'react';

import { useSelector } from 'react-redux';
import * as puzzleReducer from 'reducers/puzzle';

import { FormattedMessage } from 'react-intl';
import commonMessages from 'messages/common';

import ButtonSelect from 'components/ButtonSelect';

import { StateType } from 'reducers/types';
import { ParticipantSelectorProps } from './types';

const ParticipantSelector = ({ value, setValue }: ParticipantSelectorProps) => {
  const participants = useSelector(
    (state: StateType) => puzzleReducer.rootSelector(state).participants,
  );
  const participantsOptions = participants.map(participant => ({
    value: participant.id,
    label: <span>{participant.nickname}</span>,
  }));

  return (
    <ButtonSelect
      value={value}
      options={[
        {
          value: null,
          label: <FormattedMessage {...commonMessages.all} />,
        },
        ...participantsOptions,
      ]}
      onChange={option => setValue(option.value)}
    />
  );
};

export default ParticipantSelector;
