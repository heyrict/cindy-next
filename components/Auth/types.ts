export type AuthResponseDataType = {
  id: number;
  username: string;
  auth_token: string;
};

export type AuthResponseType = {
  error: Array<String> | null;
  data: AuthResponseDataType;
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
