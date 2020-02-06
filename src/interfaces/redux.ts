export interface ITypes {
  FETCH: string;
  SUCCESS: string;
  FAILURE: string;
  RESET?: string;
  CREATE?: string;
  UPDATE?: string;
  DELETE?: string;
}

export type BaseAction = {
  type: string;
  payload?: any;
};

export interface IFetchAction extends BaseAction {
  type: ITypes['FETCH'];
}

export interface ISuccessAction<T> extends BaseAction {
  type: ITypes['SUCCESS'];
  payload: T;
}

export interface IFailureAction extends BaseAction {
  type: ITypes['FAILURE'];
  payload: string;
}

export interface IResetAction extends BaseAction {
  type: ITypes['RESET'];
}

export interface ICreateAction<T> extends BaseAction {
  type: ITypes['CREATE'];
  payload: T;
}

export interface IUpdateAction<T> extends BaseAction {
  type: ITypes['UPDATE'];
  payload: T;
}

export interface IDeleteAction extends BaseAction {
  type: ITypes['DELETE'];
  payload: string;
}

export type Action =
  | IFetchAction
  | ISuccessAction<any>
  | IFailureAction
  | IResetAction;

export type GetState = () => any;

export type PromiseAction = Promise<Action>;

export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;

export type Dispatch = (
  action: Action | ThunkAction | PromiseAction | Array<Action>
) => any;
