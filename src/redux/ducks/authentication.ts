import jwtDecode from 'jwt-decode'

import {
  IAuthenticationState,
  ICredentials,
  IClaims,
  IFetchAction,
  ISuccessAction,
  IFailureAction,
  IResetAction,
  IAuthenticationAction,
  Dispatch,
  ThunkAction,
  ETypesAuthentication,
  IToken
} from 'interfaces/authentication'

import { EAlertVariant } from 'interfaces/alert'

import { sendAlert } from './alert'

import { fetchAuth } from 'utils/request'

/* Authentication State. */
const initialState: IAuthenticationState = {
  fetch: false,
  token: '',
  email: '',
  exp: 0,
  id: 0,
  authorized: false,
  error: ''
}

/* Authentication Reducer. */
export default (
  state: IAuthenticationState = initialState,
  action: IAuthenticationAction
): IAuthenticationState => {
  switch (action.type) {
    case ETypesAuthentication.FETCH:
      return {
        ...state,
        fetch: true
      }
    case ETypesAuthentication.SUCCESS:
      return {
        ...state,
        fetch: false,
        token: action.payload.token,
        email: action.payload.email,
        id: action.payload.id,
        exp: action.payload.exp,
        authorized: true,
        error: ''
      }
    case ETypesAuthentication.FAILURE:
      return {
        ...state,
        fetch: false,
        error: action.payload
      }
    case ETypesAuthentication.RESET:
      return initialState
    default:
      return state
  }
}

/* Authentication Action Creators Functions. */
export const fetchAuthentication = (): IFetchAction => ({
  type: ETypesAuthentication.FETCH
})

export const successAuthentication = (payload: IToken): ISuccessAction => ({
  type: ETypesAuthentication.SUCCESS,
  payload
})

export const failureAuthentication = (payload: string): IFailureAction => ({
  type: ETypesAuthentication.FAILURE,
  payload
})

export const resetAuthentication = (): IResetAction => ({
  type: ETypesAuthentication.RESET
})

/* Authentication Side Effects Functions. */
export const checkAuthentication = (
  credentials: ICredentials
): ThunkAction => async (dispatch: Dispatch): Promise<void> => {
  try {
    dispatch(fetchAuthentication())
    const { token, user } = await fetchAuth(credentials)
    const claims: IClaims = jwtDecode(token)
    const { exp } = claims
    const { id, email } = user
    const payload: IToken = {
      token,
      id,
      email,
      exp
    }
    dispatch(successAuthentication(payload))
  } catch (error) {
    dispatch(failureAuthentication(error))
    dispatch(sendAlert(error, EAlertVariant.ERROR))
  }
}
