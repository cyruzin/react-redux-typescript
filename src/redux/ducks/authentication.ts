import {
  ITypes,
  IFetchAction,
  ISuccessAction,
  IFailureAction,
  IResetAction,
  Action,
} from '../../interfaces/redux';

import IAuthenticationState from '../../interfaces/authentication';

/**
 * Authentication Types.
 */
const types: ITypes = {
  FETCH: 'AUTHENTICATION/FETCH',
  SUCCESS: 'AUTHENTICATION/SUCCESS',
  FAILURE: 'AUTHENTICATION/FAILURE',
  RESET: 'AUTHENTICATION/RESET',
};

/**
 * Authentication State.
 */
const initialState: IAuthenticationState = {
  fetch: false,
  token: '',
  exp: 0,
  authorized: true,
  error: '',
};

/**
 * Authentication Reducer.
 */
export default (
  state: IAuthenticationState = initialState,
  action: Action,
): IAuthenticationState => {
  switch (action.type) {
    case types.FETCH:
      return {
        ...state,
        fetch: true,
      };
    case types.SUCCESS:
      return {
        ...state,
        fetch: false,
        token: action.payload.token,
        exp: action.payload.exp,
        authorized: true,
        error: '',
      };
    case types.FAILURE:
      return {
        ...state,
        fetch: false,
        error: action.payload,
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
  type: types.FETCH,
});

export const successAuthentication = (payload: any): ISuccessAction => ({
  type: types.SUCCESS,
  payload,
});

export const failureAuthentication = (payload: string): IFailureAction => ({
  type: types.FAILURE,
  payload,
});

export const resetAuthentication = (): IResetAction => ({
  type: types.RESET,
});

/**
 * Authentication Side Effects Types and Functions.
 */
