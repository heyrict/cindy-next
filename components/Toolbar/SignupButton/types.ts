import { WithSignupProps } from 'components/Auth/types';

export type SignupButtonProps = {
  signupModal: boolean;
  setTrueSignupModal: () => void;
  setFalseSignupModal: () => void;
} & WithSignupProps;

export type SignupFormProps = {
  nickname: string;
  username: string;
  password: string;
  setNickname: (nickname: string) => void;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
};

export type OKButtonProps = {
  nickname: string;
  username: string;
  password: string;
  resetForm: () => void;
} & WithSignupProps;
