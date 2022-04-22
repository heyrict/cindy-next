import React from 'react';

import { useSelector } from 'react-redux';
import * as settingReducer from 'reducers/setting';
import {
  Datagrid,
  DateField,
  TextField,
  NumberField,
  List,
  Edit,
  SimpleForm,
  TextInput,
  required,
  SelectInput,
  EditButton,
  BooleanInput,
  Toolbar,
  SaveButton,
  ReferenceField,
} from 'react-admin';
import {
  PuzzleGenreChoices,
  PuzzleStatusChoices,
  PuzzleYamiChoices,
} from './lib';

export const PuzzleList = () => {
  const language = useSelector(
    state => settingReducer.rootSelector(state).language,
  );
  return (
    <List>
      <Datagrid>
        <NumberField source="id" />
        <TextField source="title" />
        <TextField source="genre" />
        <TextField source="status" />
        <TextField source="yami" />
        <DateField locales={language || undefined} source="created" />
        <ReferenceField
          label="User"
          source="userId"
          reference="User"
          link="show"
        >
          <TextField source="nickname" />
        </ReferenceField>
        <EditButton />
      </Datagrid>
    </List>
  );
};

const EditToolbar = () => (
  <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
    <SaveButton />
  </Toolbar>
);

export const PuzzleEdit = () => (
  <Edit>
    <SimpleForm toolbar={<EditToolbar />}>
      <TextInput disabled label="Id" source="id" />
      <TextInput source="title" validate={required()} />
      <SelectInput
        source="status"
        choices={PuzzleStatusChoices}
        validate={required()}
      />
      <SelectInput
        source="genre"
        choices={PuzzleGenreChoices}
        validate={required()}
      />
      <SelectInput
        source="yami"
        choices={PuzzleYamiChoices}
        validate={required()}
      />
      <BooleanInput source="grotesque" validate={required()} />
      <TextInput multiline source="content" validate={required()} />
      <TextInput multiline source="solution" validate={required()} />
      <TextInput multiline source="memo" />
    </SimpleForm>
  </Edit>
);
