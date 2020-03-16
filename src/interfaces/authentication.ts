import IBaseAction from 'interfaces/redux'
import { IAlertAction } from 'interfaces/alert'

export interface IClaims {
  token_type?: string
  exp: number
  jti?: string
  id: number
}

export interface IToken extends IClaims {
  token: string
  id: number
  email: string
}

export interface IAuthenticationState {
  fetch: boolean
  token: string
  id: number
  email: string
  exp: number
  authorized: boolean
  error: string
}

export interface ICredentials {
  email: string
  password: string
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

export type IAuthenticationAction =
  | IFetchAction
  | ISuccessAction
  | IFailureAction
  | IResetAction

export type GetState = () => any

export type PromiseAction = Promise<IAuthenticationAction>

export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any

export type Dispatch = (
  action:
    | IAuthenticationAction
    | ThunkAction
    | PromiseAction
    | Array<IAuthenticationAction>
    | IAlertAction
) => any
