import { BaseAction } from './redux';

export interface IAlertTypes {
  SEND: string;
  RESET: string;
}

export interface IAlertState {
  show: boolean;
  message: string;
  variant?: 'error' | 'info' | 'success' | 'warning';
  duration?: number;
}

export interface IAlertSendAction extends BaseAction {
  type: IAlertTypes['SEND'];
  message: string;
  variant?: string;
  duration?: number;
}

export interface IAlertResetAction extends BaseAction {
  type: IAlertTypes['RESET'];
}

export type IAlertAction = IAlertSendAction | IAlertResetAction | any;
