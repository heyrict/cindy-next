import { WithLoginProps } from 'components/Auth/types';
import { AuthErrorType } from 'reducers/types';

export type LoginButtonProps = {
  loginModal: boolean;
  setTrueLoginModal: () => void;
  setFalseLoginModal: () => void;
} & WithLoginProps;

export type LoginFormProps = {
  username: string;
  password: string;
  errors: Array<AuthErrorType>;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
};

export type OKButtonProps = {
  username: string;
  password: string;
  setErrors: (errors: Array<AuthErrorType>) => void;
  resetForm: () => void;
} & WithLoginProps;
