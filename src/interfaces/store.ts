import { IAuthenticationState } from './authentication';
import { IAlertState } from './alert';
import { IUserState } from './user';

export default interface IStore {
  authentication: IAuthenticationState;
  alert: IAlertState;
  user: IUserState;
}
