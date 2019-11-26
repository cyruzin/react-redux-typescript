import jwtDecode from 'jwt-decode';

import {
  ITypes,
  IFetchAction,
  ISuccessAction,
  IFailureAction,
  IResetAction,
  ThunkAction,
  Dispatch,
  Action
} from 'interfaces/redux';

import {
  IAuthenticationState,
  ICredentials,
  IClaims,
  IToken
} from 'interfaces/authentication';

import { sendAlert } from './alert';

import { fetchAuth } from 'utils/request';

/* Authentication Types. */
const types: ITypes = {
  FETCH: 'AUTHENTICATION/FETCH',
  SUCCESS: 'AUTHENTICATION/SUCCESS',
  FAILURE: 'AUTHENTICATION/FAILURE',
  RESET: 'AUTHENTICATION/RESET'
};

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
};

/* Authentication Reducer. */
export default (
  state: IAuthenticationState = initialState,
  action: Action
): IAuthenticationState => {
  switch (action.type) {
    case types.FETCH:
      return {
        ...state,
        fetch: true
      };
    case types.SUCCESS:
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
      };
    case types.FAILURE:
      return {
        ...state,
        fetch: false,
        error: action.payload
      };
    case types.RESET:
      return initialState;
    default:
      return state;
  }
};

/* Authentication Action Creators Functions. */
export const fetchAuthentication = (): IFetchAction => ({
  type: types.FETCH
});

export const successAuthentication = (payload: IToken): ISuccessAction => ({
  type: types.SUCCESS,
  payload
});

export const failureAuthentication = (payload: string): IFailureAction => ({
  type: types.FAILURE,
  payload
});

export const resetAuthentication = (): IResetAction => ({
  type: types.RESET
});

/* Authentication Side Effects Functions. */
export const checkAuthentication = (
  credentials: ICredentials
): ThunkAction => async (dispatch: Dispatch): Promise<void> => {
  try {
    dispatch(fetchAuthentication());
    const response = await fetchAuth(credentials);
    const claims: IClaims = jwtDecode(response);
    const payload: IToken = { token: response, ...claims };
    dispatch(successAuthentication(payload));
  } catch (error) {
    dispatch(failureAuthentication(error));
    dispatch(sendAlert(error, 'error'));
  }
};
