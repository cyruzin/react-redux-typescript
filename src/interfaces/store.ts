import { IAuthenticationState } from './authentication'
import { IAlertState } from './alert'

export default interface IStore {
  authentication: IAuthenticationState
  alert: IAlertState
}
