import { WithSignupProps } from 'components/Auth/types';
import { AuthErrorType } from 'reducers/types';

export type SignupButtonProps = {
  signupModal: boolean;
  setTrueSignupModal: () => void;
  setFalseSignupModal: () => void;
} & WithSignupProps;

export type SignupFormProps = {
  nickname: string;
  username: string;
  password: string;
  errors: Array<AuthErrorType>;
  setNickname: (nickname: string) => void;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
};

export type OKButtonProps = {
  nickname: string;
  username: string;
  password: string;
  setErrors: (errors: Array<AuthErrorType>) => void;
  resetForm: () => void;
} & WithSignupProps;
