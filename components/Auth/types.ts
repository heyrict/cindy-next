export type AuthResponseType = {
  errors?: any;
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

export type LogoutFnType = () => Promise<any>;

export interface WithSignupProps {
  signup: SignupFnType;
}

export interface WithLogoutProps {
  logout: LogoutFnType;
}

export interface WithLoginProps {
  login: LoginFnType;
}
