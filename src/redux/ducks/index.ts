import { combineReducers } from 'redux';

import Authentication from './authentication';
import Alert from './alert';
import User from './user';

export default combineReducers({
  authentication: Authentication,
  alert: Alert,
  user: User
});
