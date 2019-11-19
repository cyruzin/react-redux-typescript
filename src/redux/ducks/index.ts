import { combineReducers } from 'redux';

import Authentication from './authentication';
import Alert from './alert';

export default combineReducers({
  authentication: Authentication,
  alert: Alert
});
