export type AuthErrorType = {
  type: string;
  message: string;
};

export type AuthResponseType = {
  errors?: Array<AuthErrorType>;
};

export type SignupFnType = (
  nickname: string,
  username: string,
  password: string,
) => Promise<AuthResponseType>;

export type LoginFnType = (
  username: string,
  password: string,
) => Promise<AuthResponseType>;

export type LogoutFnType = () => Promise<void>;

export interface WithSignupProps {
  signup: SignupFnType;
}

export interface WithLogoutProps {
  logout: LogoutFnType;
}

export interface WithLoginProps {
  login: LoginFnType;
}
