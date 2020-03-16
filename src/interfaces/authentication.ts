import IBaseAction from 'interfaces/redux'

export interface IAuthenticationState {
  fetch: boolean
  token: string
  exp: number
  email: string
  iat: number
  id: number
  firstName: string
  lastName: string
  roles: Array<string>
  type: number
  authorized: boolean
  error: string
}

export interface ICredentials {
  email: string
  password: string
}

export interface IClaims {
  email: string
  exp: number
  iat: number
  id: number
  firstName: string
  lastName: string
  roles: Array<string>
  type: number
}

export interface IToken extends IClaims {
  token: string
}

/**
 * Redux types.
 */
export enum ETypesAuthentication {
  FETCH = 'AUTHENTICATION/FETCH',
  SUCCESS = 'AUTHENTICATION/SUCCESS',
  FAILURE = 'AUTHENTICATION/FAILURE',
  RESET = 'AUTHENTICATION/RESET'
}

export interface IFetchAction extends IBaseAction<ETypesAuthentication, null> {
  type: ETypesAuthentication.FETCH
}

export interface ISuccessAction
  extends IBaseAction<ETypesAuthentication, IToken> {
  type: ETypesAuthentication.SUCCESS
  payload: IToken
}

export interface IFailureAction
  extends IBaseAction<ETypesAuthentication, string> {
  type: ETypesAuthentication.FAILURE
  payload: string
}

export interface IResetAction extends IBaseAction<ETypesAuthentication, null> {
  type: ETypesAuthentication.RESET
}

export type Action =
  | IFetchAction
  | ISuccessAction
  | IFailureAction
  | IResetAction

export type GetState = () => any

export type PromiseAction = Promise<Action>

export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any

export type Dispatch = (
  action: Action | ThunkAction | PromiseAction | Array<Action>
) => any
