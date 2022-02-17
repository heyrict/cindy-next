export type CindyRole = 'admin' | 'user' | 'staff';

export type CindyJWTDeclaration = {
  alg: 'RS256';
  typ: 'JWT';
};

export type CindyJWTClaims = {
  exp: number;
  iat: number;
  'https://www.cindythink.com/jwt/claims': {
    'x-hasura-allowed-roles': Array<CindyRole>;
    'x-hasura-default-role': CindyRole;
    'x-hasura-user-id': string;
  };
  user: {
    id: number;
    icon: string;
    nickname: string;
    username: string;
  };
  role: string;
};

export type DeepNonNullable<T> = {
  [P in keyof T]-?: NonNullable<T[P]>;
};
