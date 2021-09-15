import React from 'react';
import { text2md } from 'common/markdown';

import { useSelector } from 'react-redux';
import * as globalReducer from 'reducers/global';

import ButtonSelect from 'components/ButtonSelect';

import { FormattedMessage } from 'react-intl';
import commonMessages from 'messages/common';
import puzzleMessages from 'messages/components/puzzle';

import { useQuery } from '@apollo/client';
import { LICENSES_QUERY } from 'graphql/Queries/License';
import { USER_BRIEF_QUERY } from 'graphql/Queries/User';

import { UserBriefQuery } from 'graphql/Queries/generated/UserBriefQuery';
import { StateType } from 'reducers/types';
import { LicensesQuery } from 'graphql/Queries/generated/LicensesQuery';
import { LicenseButtonsProps } from './types';

const LicenseButtons = ({ selected, onChange }: LicenseButtonsProps) => {
  const userId = useSelector(
    (state: StateType) => globalReducer.rootSelector(state).user.id,
  );
  const { data: userQueryData } = useQuery<UserBriefQuery>(USER_BRIEF_QUERY, {
    variables: { id: userId },
    fetchPolicy: 'cache-first',
    onCompleted: ({ user: { defaultLicenseId } }) => onChange(defaultLicenseId),
  });
  const licenses = useQuery<LicensesQuery>(LICENSES_QUERY);

  return (
    <ButtonSelect
      flexProps={{ px: 2 }}
      value={selected}
      onChange={option => onChange(option.value)}
      options={
        licenses.data
          ? (
              [
                {
                  key: 'default',
                  value: userQueryData
                    ? userQueryData.user.defaultLicenseId
                    : null,
                  label: <FormattedMessage {...commonMessages.default} />,
                },
                {
                  key: 'null',
                  value: null,
                  label: <FormattedMessage {...commonMessages.none} />,
                  hint: <FormattedMessage {...puzzleMessages.nolicenseHint} />,
                },
              ] as Array<{
                key: string;
                value: null | number;
                label: React.ReactNode;
              }>
            ).concat(
              licenses.data.licenses.map<{
                key: string;
                value: null | number;
                label: React.ReactNode;
              }>(license => ({
                key: `license-${license.id}`,
                value: license.id,
                label: license.name,
                hint: (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: text2md(license.description),
                    }}
                  />
                ),
              })),
            )
          : [
              {
                key: 'default',
                value: null,
                label: <FormattedMessage {...commonMessages.default} />,
              },
              {
                key: 'null',
                value: null,
                label: <FormattedMessage {...commonMessages.none} />,
                hint: <FormattedMessage {...puzzleMessages.nolicenseHint} />,
              },
            ]
      }
    />
  );
};

export default LicenseButtons;
