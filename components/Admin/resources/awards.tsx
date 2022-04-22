import React from 'react';
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
} from 'react-admin';

export const AwardList = () => (
  <List>
    <Datagrid>
      <NumberField source="id" />
      <TextField source="name" />
      <EditButton />
      <ShowButton />
    </Datagrid>
  </List>
);

export const AwardShow = () => (
  <Show>
    <SimpleShowLayout>
      <NumberField source="id" />
      <TextField source="name" />
      <TextField source="description" />
      <TextField source="requisition" />
    </SimpleShowLayout>
  </Show>
);

export const AwardEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput disabled label="Id" source="id" />
      <TextInput source="name" validate={required()} />
      <TextInput multiline source="description" validate={required()} />
      <TextInput multiline source="requisition" validate={required()} />
    </SimpleForm>
  </Edit>
);

export const AwardCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" validate={required()} />
      <TextInput multiline source="description" validate={required()} />
      <TextInput multiline source="requisition" validate={required()} />
    </SimpleForm>
  </Create>
);
