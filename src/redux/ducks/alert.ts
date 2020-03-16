import {
  IAlertState,
  IAlertAction,
  IAlertSendAction,
  IAlertResetAction,
  EAlertTypes,
  EAlertVariant
} from '../../interfaces/alert'

/* Alert State. */
const initialState: IAlertState = {
  show: false,
  message: '',
  variant: EAlertVariant.INFO,
  duration: 3000
}

/* Alert Reducer. */
export default (
  state: IAlertState = initialState,
  action: IAlertAction
): IAlertState => {
  switch (action.type) {
    case EAlertTypes.SEND:
      return {
        ...state,
        show: true,
        message: action.message,
        variant: action.variant as EAlertVariant,
        duration: action.duration
      }
    case EAlertTypes.RESET:
      return {
        ...state,
        show: false,
        message: ''
      }
    default:
      return state
  }
}

/* Alert Action Creators Functions. */
export const sendAlert = (
  message: string,
  variant?: EAlertVariant,
  duration?: number
): IAlertSendAction => ({
  type: EAlertTypes.SEND,
  message,
  variant: variant || EAlertVariant.INFO,
  duration: duration || 3000
})

export const resetAlert = (): IAlertResetAction => ({
  type: EAlertTypes.RESET
})
