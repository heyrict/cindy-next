import { WithLoginProps } from 'components/Auth/types';

export type LoginButtonProps = {
  setTrueLoginModal: () => void;
};

export type LoginModalProps = {
  loginModal: boolean;
  setFalseLoginModal: () => void;
} & WithLoginProps;

export type LoginFormProps = {
  username: string;
  password: string;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  resetForm: () => void;
} & WithLoginProps;

export type OKButtonProps = {
  username: string;
  password: string;
  resetForm: () => void;
} & WithLoginProps;
