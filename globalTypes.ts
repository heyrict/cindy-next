export type CindyRole = 'Admin' | 'User' | 'Staff';

export type CindyJWTDeclaration = {
  alg: 'RS256';
  typ: 'JWT';
};

export type CindyJWTClaims = {
  exp: number;
  iat: number;
  user: {
    id: number;
    icon: string;
    nickname: string;
    username: string;
  };
  role: CindyRole;
  allowed_roles: Array<CindyRole>;
};

export type DeepNonNullable<T> = {
  [P in keyof T]-?: NonNullable<T[P]>;
};
