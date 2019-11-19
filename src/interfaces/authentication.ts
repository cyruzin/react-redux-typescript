export default interface IAuthenticationState {
  fetch: boolean;
  token: string;
  exp: number;
  email: string;
  iat: number;
  id: number;
  firstName: string;
  lastName: string;
  roles: Array<string>;
  type: number;
  authorized: boolean;
  error: string;
}

export interface ICredentials {
  email: string;
  password: string;
}

export interface IClaims {
  email: string;
  exp: number;
  iat: number;
  id: number;
  firstName: string;
  lastName: string;
  roles: Array<string>;
  type: number;
}

export interface IToken extends IClaims {
  token: string;
}
