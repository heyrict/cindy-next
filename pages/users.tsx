import React, { useRef, useState } from 'react';
import Head from 'next/head';

import { FormattedMessage, useIntl } from 'react-intl';
import messages from 'messages/pages/users';
import authMessages from 'messages/components/auth';

import PaginatedQuery from 'components/Hoc/PaginatedQuery';
import { USER_LIST_QUERY } from 'graphql/Queries/User';

import {
  Heading,
  Flex,
  Box,
  ButtonTransparent,
  Panel,
} from 'components/General';
import MultiColBox from 'components/General/MultiColBox';
import UserPanel from 'components/User/UserPanel';

import {
  UserListQuery,
  UserListQueryVariables,
} from 'graphql/Queries/generated/UserListQuery';
import SearchVarSetPanel from 'components/Search/SearchVarSetPanel';
import { FilterFieldTypeEnum } from 'components/Search/types';
import commonMessages from 'messages/common';

const Users = () => {
  const intl = useIntl();
  const _ = intl.formatMessage;
  const searchRef = useRef<SearchVarSetPanel>(null);
  const [variables, setVariables] = useState({
    nickname: null,
  } as {
    nickname: string | null;
  });

  return (
    <React.Fragment>
      <Head>
        <title>{_(messages.title)} | Cindy</title>
        <meta name="description" content={_(messages.description)} />
      </Head>
      <Heading>
        <FormattedMessage {...messages.header} />
      </Heading>
      <Panel style={{ minHeight: 'auto' }} flexWrap="wrap">
        <SearchVarSetPanel
          ref={searchRef}
          filters={[
            {
              type: FilterFieldTypeEnum.TEXT,
              key: 'nickname',
              fieldName: <FormattedMessage {...authMessages.nickname} />,
            },
          ]}
        />
        <Flex width={1}>
          <Box width={1 / 2} p={1} mx={1} bg="orange.4" borderRadius={2}>
            <ButtonTransparent
              width={1}
              onClick={() => {
                const newVariables = { ...variables };
                if (searchRef.current) {
                  searchRef.current.reset();
                  newVariables.nickname = null;
                }
                setVariables(newVariables);
              }}
            >
              <FormattedMessage {...commonMessages.reset} />
            </ButtonTransparent>
          </Box>
          <Box width={1 / 2} p={1} mx={1} bg="orange.4" borderRadius={2}>
            <ButtonTransparent
              width={1}
              onClick={() => {
                const newVariables = { ...variables };
                if (searchRef.current) {
                  const data = searchRef.current.getData();
                  newVariables.nickname = `%${data.nickname}%`;
                }
                setVariables(newVariables);
              }}
            >
              <FormattedMessage {...commonMessages.search} />
            </ButtonTransparent>
          </Box>
        </Flex>
      </Panel>
      <Flex flexWrap="wrap">
        <PaginatedQuery<UserListQuery, UserListQueryVariables>
          query={USER_LIST_QUERY}
          variables={variables}
          fetchPolicy="cache-first"
          getItemCount={data => data.userCount}
          renderItems={data => {
            const { users } = data;
            if (!users) return null;
            return (
              <>
                {users.map(user => (
                  <MultiColBox key={user.id}>
                    <UserPanel user={user} />
                  </MultiColBox>
                ))}
              </>
            );
          }}
        />
      </Flex>
    </React.Fragment>
  );
};


export default Users;
