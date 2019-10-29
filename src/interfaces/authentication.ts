export default interface IAuthenticationState {
  fetch: boolean;
  token: string;
  exp: number;
  authorized: boolean;
  error: string;
}

export interface ICredentials {
  email: string;
  password: string;
}
