import {
  ITypes,
  IFetchAction,
  ISuccessAction,
  IFailureAction,
  IResetAction,
  Action,
} from '../../interfaces/redux';

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

interface IState {
  fetch: boolean;
  token: string;
  authorized: boolean;
  error: string;
}

const initialState: IState = {
  fetch: false,
  token: '',
  authorized: false,
  error: '',
};

/**
 * Authentication Reducer.
 */

export default (state: IState = initialState, action: Action): IState => {
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
        token: action.payload,
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
