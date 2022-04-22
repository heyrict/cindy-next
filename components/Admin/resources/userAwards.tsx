import React from 'react';

import { useSelector } from 'react-redux';
import * as settingReducer from 'reducers/setting';
import {
  Datagrid,
  TextField,
  NumberField,
  List,
  Show,
  SimpleShowLayout,
  ShowButton,
  EditButton,
  Edit,
  SimpleForm,
  TextInput,
  required,
  Create,
  ReferenceField,
  DateField,
  ReferenceInput,
  AutocompleteInput,
} from 'react-admin';
import { ilikeFilter } from './lib';

export const UserAwardList = () => {
  const language = useSelector(
    state => settingReducer.rootSelector(state).language,
  );
  return (
    <List>
      <Datagrid>
        <NumberField source="id" />
        <DateField locales={language || undefined} source="created" />
        <ReferenceField
          label="User"
          source="userId"
          reference="User"
          link="show"
        >
          <TextField source="nickname" />
        </ReferenceField>
        <ReferenceField
          label="Award"
          source="awardId"
          reference="Award"
          link="show"
        >
          <TextField source="name" />
        </ReferenceField>
        <EditButton />
        <ShowButton />
      </Datagrid>
    </List>
  );
};

export const UserAwardShow = () => {
  const language = useSelector(
    state => settingReducer.rootSelector(state).language,
  );
  return (
    <Show>
      <SimpleShowLayout>
        <NumberField source="id" />
        <ReferenceField
          label="User"
          source="userId"
          reference="User"
          link="show"
        >
          <TextField source="nickname" />
        </ReferenceField>
        <ReferenceField
          label="Award"
          source="awardId"
          reference="Award"
          link="show"
        >
          <TextField source="name" />
        </ReferenceField>
        <DateField locales={language || undefined} source="created" />
      </SimpleShowLayout>
    </Show>
  );
};

export const UserAwardEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput disabled label="Id" source="id" />
      <ReferenceInput
        label="User"
        source="userId"
        reference="User"
        validate={required()}
      >
        <AutocompleteInput
          optionText="nickname"
          filterToQuery={ilikeFilter('nickname')}
        />
      </ReferenceInput>
      <ReferenceInput
        label="Award"
        source="awardId"
        reference="Award"
        validate={required()}
      >
        <AutocompleteInput
          optionText="name"
          filterToQuery={ilikeFilter('name')}
        />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);

export const UserAwardCreate = () => (
  <Create>
    <SimpleForm>
      <ReferenceInput
        label="User"
        source="userId"
        reference="User"
        validate={required()}
      >
        <AutocompleteInput
          optionText="nickname"
          filterToQuery={ilikeFilter('nickname')}
        />
      </ReferenceInput>
      <ReferenceInput
        label="Award"
        source="awardId"
        reference="Award"
        validate={required()}
      >
        <AutocompleteInput
          optionText="name"
          filterToQuery={ilikeFilter('name')}
        />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);
