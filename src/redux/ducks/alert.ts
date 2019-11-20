import {
  IAlertTypes,
  IAlertState,
  IAlertAction,
  IAlertSendAction,
  IAlertResetAction
} from '../../interfaces/alert';

/* Alert Types. */
const types: IAlertTypes = {
  SEND: 'ALERT/SEND',
  RESET: 'ALERT/RESET'
};

/* Alert State. */
const initialState: IAlertState = {
  show: false,
  message: '',
  variant: 'info',
  duration: 3000
};

/* Alert Reducer. */
export default (
  state: IAlertState = initialState,
  action: IAlertAction
): IAlertState => {
  switch (action.type) {
    case types.SEND:
      return {
        ...state,
        show: true,
        message: action.message,
        variant: action.variant,
        duration: action.duration
      };
    case types.RESET:
      return {
        ...state,
        show: false,
        message: ''
      };
    default:
      return state;
  }
};

/* Alert Action Creators Functions. */
export const sendAlert = (
  message: string,
  variant?: string,
  duration?: number
): IAlertSendAction => ({
  type: types.SEND,
  message,
  variant: variant || 'info',
  duration: duration || 3000
});

export const resetAlert = (): IAlertResetAction => ({
  type: types.RESET
});
