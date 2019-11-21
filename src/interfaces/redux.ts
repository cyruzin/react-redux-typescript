export interface ITypes {
  FETCH: string;
  SUCCESS: string;
  FAILURE: string;
  RESET?: string;
}

export type BaseAction = {
  type: string;
  payload?: any;
};

export interface IFetchAction extends BaseAction {
  type: ITypes['FETCH'];
}

export interface ISuccessAction extends BaseAction {
  type: ITypes['SUCCESS'];
  payload: any;
}

export interface IFailureAction extends BaseAction {
  type: ITypes['FAILURE'];
  payload: string;
}

export interface IResetAction extends BaseAction {
  type: ITypes['RESET'];
}

export type Action =
  | IFetchAction
  | ISuccessAction
  | IFailureAction
  | IResetAction;

export type GetState = () => any;

export type PromiseAction = Promise<Action>;

export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;

export type Dispatch = (
  action: Action | ThunkAction | PromiseAction | Array<Action>
) => any;
