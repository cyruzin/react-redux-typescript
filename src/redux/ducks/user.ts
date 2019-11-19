import {
  IFetchAction,
  ISuccessAction,
  IFailureAction,
  ThunkAction,
  Dispatch
} from 'interfaces/redux';

import { IRequest } from 'interfaces/request';
import {
  IUser,
  IUserState,
  IUserTypes,
  IUserAction
} from '../../interfaces/user';

import { EMethod } from 'enums/method';

import { fetch } from 'utils/request';

/* User Types. */
const types: IUserTypes = {
  FETCH: 'USER/FETCH',
  SUCCESS: 'USER/SUCCESS',
  FAILURE: 'USER/FAILURE',
  CREATE: 'USER/CREATE',
  UPDATE: 'USER/UPDATE',
  DELETE: 'USER/DELETE'
};

/* User State. */
const initialState: IUserState = {
  fetch: false,
  results: [],
  total: 0,
  page: 0,
  pageSize: 0,
  error: ''
};

/* User Reducer. */
export default (
  state: IUserState = initialState,
  action: IUserAction
): IUserState => {
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
        results: action.payload.results,
        total: action.payload.total,
        page: action.payload.page,
        pageSize: action.payload.pageSize,
        error: ''
      };
    case types.FAILURE:
      return {
        ...state,
        fetch: false,
        error: action.payload
      };
    default:
      return state;
  }
};

/* User Action Creators Functions. */
export const fetchUser = (): IFetchAction => ({
  type: types.FETCH
});

export const successUser = (payload: IUser[]): ISuccessAction => ({
  type: types.SUCCESS,
  payload
});

export const failureUser = (payload: string): IFailureAction => ({
  type: types.FAILURE,
  payload
});

/* User Side Effects Types and Functions. */
export const listUser = (): ThunkAction => async (
  dispatch: Dispatch
): Promise<void> => {
  try {
    const data: IRequest = {
      method: EMethod.GET,
      url: '/admin/user?page=1&pageSize=10'
    };
    const response = await fetch(data);
    dispatch(successUser(response));
  } catch (error) {
    dispatch(failureUser(error));
  }
};

// export const listUserByID = (id: number): ThunkAction => async (
//   dispatch: Dispatch
// ): Promise<void> => {
//   try {
//   } catch (error) {}
// };

// export const createtUser = (payload: any): ThunkAction => async (
//   dispatch: Dispatch
// ): Promise<void> => {
//   try {
//   } catch (error) {}
// };

// export const updatetUser = (id: number, payload: any): ThunkAction => async (
//   dispatch: Dispatch
// ): Promise<void> => {
//   try {
//   } catch (error) {}
// };

// export const deleteUser = (id: number): ThunkAction => async (
//   dispatch: Dispatch
// ): Promise<void> => {
//   try {
//   } catch (error) {}
// };
