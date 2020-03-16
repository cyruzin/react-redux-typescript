import IBaseAction from 'interfaces/redux'

export enum EAlertVariant {
  ERROR = 'error',
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning'
}

export enum EAlertTypes {
  SEND = 'ALERT/SEND',
  RESET = 'ALERT/RESET'
}

export interface IAlertState {
  show: boolean
  message: string
  variant?: EAlertVariant
  duration?: number
}

export interface IAlertSendAction
  extends IBaseAction<EAlertTypes, IAlertState> {
  type: EAlertTypes.SEND
  message: string
  variant?: string
  duration?: number
}

export interface IAlertResetAction extends IBaseAction<EAlertTypes, null> {
  type: EAlertTypes.RESET
}

export type IAlertAction = IAlertSendAction | IAlertResetAction
