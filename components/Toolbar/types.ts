import { GlobalUserType } from 'reducers/types';
import { WithLogoutProps } from 'components/Auth/types';

export type ToolbarProps = {
  user: GlobalUserType;
};

export type LogoutButtonProps = WithLogoutProps;
