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
