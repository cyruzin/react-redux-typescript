import {
  ITypes,
  BaseAction,
  IFetchAction,
  ISuccessAction,
  IFailureAction
} from './redux';

import { ERoles } from '../enums/user';

export interface IUser {
  id?: number;
  firstName: string;
  lastName?: string;
  fullName?: string;
  email: string;
  password?: string;
  roles: ERoles[];
  createdDate?: Date;
  updatedDate?: Date;
}

export interface IUserState {
  fetch: boolean;
  results: IUser[];
  total: number;
  page: number;
  pageSize: number;
  error: string;
}

export interface IUserTypes extends ITypes {
  CREATE: string;
  UPDATE: string;
  DELETE: string;
}

export interface IUserCreateAction extends BaseAction {
  type: IUserTypes['CREATE'];
  payload: any;
}

export interface IUserUpdateAction extends BaseAction {
  type: IUserTypes['UPDATE'];
  payload: any;
}

export interface IUserDeleteAction extends BaseAction {
  type: IUserTypes['DELETE'];
  payload: string;
}

export type IUserAction =
  | IFetchAction
  | ISuccessAction
  | IFailureAction
  | IUserCreateAction
  | IUserUpdateAction
  | IUserDeleteAction;
