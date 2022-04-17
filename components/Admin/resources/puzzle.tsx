import React from 'react';
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
} from 'react-admin';
import {
  PuzzleGenreChoices,
  PuzzleStatusChoices,
  PuzzleYamiChoices,
} from './lib';

export const PuzzleList = () => (
  <List>
    <Datagrid>
      <NumberField source="id" />
      <TextField source="title" />
      <TextField source="genre" />
      <TextField source="status" />
      <TextField source="yami" />
      <DateField source="created" />
      <EditButton />
    </Datagrid>
  </List>
);

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
      <BooleanInput source="yami" validate={required()} />
      <BooleanInput source="grotesque" validate={required()} />
      <TextInput multiline source="content" validate={required()} />
      <TextInput multiline source="solution" validate={required()} />
      <TextInput multiline source="memo" />
    </SimpleForm>
  </Edit>
);
