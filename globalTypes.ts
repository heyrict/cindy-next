export type CindyRole = 'admin' | 'user' | 'staff';

export type CindyJWTDeclaration = {
  alg: 'RS256';
  typ: 'JWT';
};

export type CindyJWTClaims = {
  exp: number;
  iat: number;
  name: string;
  sub: string;
  'https://www.cindythink.com/jwt/claims': {
    'x-hasura-allowed-roles': Array<CindyRole>;
    'x-hasura-default-role': CindyRole;
    'x-hasura-user-id': string;
  };
  user?: {
    id: number;
    nickname: string;
    username: string;
  };
};
