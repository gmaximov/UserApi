import { combineReducers } from 'redux';

import { authentication } from './auth/reducers/authentication.reducer';
import { registration } from './auth/reducers/registration.reducer';
import { users } from './auth/reducers/users.reducer';
import { alert } from './alerts/alert.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert
});

export default rootReducer;