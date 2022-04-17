import { Datagrid, DateField, TextField, NumberField, List } from 'react-admin';

export const UserList = () => (
  <List>
    <Datagrid>
      <NumberField source="id" />
      <TextField source="nickname" />
      <DateField source="dateJoined" />
      <DateField source="lastLogin" />
    </Datagrid>
  </List>
);
