export interface WithSignupProps {
  signup: (
    nickname: string,
    username: string,
    password: string,
  ) => Promise<Response>;
}

export interface WithLogoutProps {
  logout: () => Promise<any>;
}

export interface WithLoginProps {
  login: (username: string, password: string) => Promise<Response>;
}
