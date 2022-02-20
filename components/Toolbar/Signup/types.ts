import { WithSignupProps } from 'components/Auth/types';

export type SignupButtonProps = {
  setTrueSignupModal: () => void;
};

export type SignupModalProps = {
  signupModal: boolean;
  setFalseSignupModal: () => void;
} & WithSignupProps;

export type SignupFormProps = {
  nickname: string;
  username: string;
  password: string;
  setNickname: (nickname: string) => void;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  resetForm: () => void;
} & WithSignupProps;

export type OKButtonProps = {
  nickname: string;
  username: string;
  password: string;
  resetForm: () => void;
} & WithSignupProps;
