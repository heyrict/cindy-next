import { WithLoginProps } from 'components/Auth/types';

export type LoginButtonProps = {
  loginModal: boolean;
  setTrueLoginModal: () => void;
  setFalseLoginModal: () => void;
} & WithLoginProps;

export type LoginFormProps = {
  username: string;
  password: string;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
};

export type OKButtonProps = {
  username: string;
  password: string;
  resetForm: () => void;
} & WithLoginProps;
