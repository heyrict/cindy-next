import React from 'react';

import { useSelector } from 'react-redux';
import * as settingReducer from 'reducers/setting';
import {
  Datagrid,
  DateField,
  TextField,
  NumberField,
  List,
  Show,
  SimpleShowLayout,
  BooleanField,
  ShowButton,
} from 'react-admin';

export const UserList = () => {
  const language = useSelector(
    state => settingReducer.rootSelector(state).language,
  );
  return (
    <List>
      <Datagrid>
        <NumberField source="id" />
        <TextField source="nickname" />
        <DateField locales={language || undefined} source="dateJoined" />
        <DateField locales={language || undefined} source="lastLogin" />
        <ShowButton />
      </Datagrid>
    </List>
  );
};

export const UserShow = () => {
  const language = useSelector(
    state => settingReducer.rootSelector(state).language,
  );
  return (
    <Show>
      <SimpleShowLayout>
        <NumberField source="id" />
        <TextField source="nickname" />
        <TextField source="profile" />
        <BooleanField source="isStaff" />
        <DateField locales={language || undefined} source="dateJoined" />
        <DateField locales={language || undefined} source="lastLogin" />
      </SimpleShowLayout>
    </Show>
  );
};
