import jwtDecode from 'jwt-decode'

import {
  IAuthenticationState,
  ICredentials,
  IClaims,
  IToken,
  IFetchAction,
  ISuccessAction,
  IFailureAction,
  IResetAction,
  Action,
  Dispatch,
  ThunkAction,
  ETypesAuthentication
} from 'interfaces/authentication'

// import { sendAlert } from './alert'

import { fetchAuth } from 'utils/request'

/* Authentication State. */
const initialState: IAuthenticationState = {
  fetch: false,
  token: '',
  exp: 0,
  iat: 0,
  email: '',
  id: 0,
  firstName: '',
  lastName: '',
  roles: [],
  type: 0,
  authorized: false,
  error: ''
}

/* Authentication Reducer. */
export default (
  state: IAuthenticationState = initialState,
  action: Action
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
        exp: action.payload.exp,
        iat: action.payload.iat,
        email: action.payload.email,
        id: action.payload.id,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        roles: action.payload.roles,
        type: action.payload.type,
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
    const response = await fetchAuth(credentials)
    const claims: IClaims = jwtDecode(response)
    const payload: IToken = { token: response, ...claims }
    dispatch(successAuthentication(payload))
  } catch (error) {
    dispatch(failureAuthentication(error))
    //dispatch(sendAlert(error, 'error'))
  }
}
