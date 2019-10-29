import jwtDecode from 'jwt-decode';

import {
  ITypes,
  IFetchAction,
  ISuccessAction,
  IFailureAction,
  IResetAction,
  Dispatch,
  Action
} from '../../interfaces/redux';

import IAuthenticationState, { ICredentials } from '../../interfaces/authentication';

import { fetchAuth } from '../../utils/request';

/**
 * Authentication Types.
 */
const types: ITypes = {
  FETCH: 'AUTHENTICATION/FETCH',
  SUCCESS: 'AUTHENTICATION/SUCCESS',
  FAILURE: 'AUTHENTICATION/FAILURE',
  RESET: 'AUTHENTICATION/RESET'
};

/**
 * Authentication State.
 */
const initialState: IAuthenticationState = {
  fetch: false,
  token: '',
  exp: 0,
  authorized: false,
  error: ''
};

/**
 * Authentication Reducer.
 */
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

/**
 * Authentication Action Creators Functions.
 */
export const fetchAuthentication = (): IFetchAction => ({
  type: types.FETCH
});

export const successAuthentication = (payload: any): ISuccessAction => ({
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

/**
 * Authentication Side Effects Types and Functions.
 */
export const checkAuthentication = (credentials: ICredentials) => async (dispatch: Dispatch) => {
  try {
    dispatch(fetchAuthentication());
    const response = await fetchAuth(credentials);
    const claims = jwtDecode(response);
    const payload = { token: response, ...claims };
    dispatch(successAuthentication(payload));
  } catch (error) {
    dispatch(failureAuthentication(error));
  }
};
