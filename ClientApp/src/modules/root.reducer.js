import { combineReducers } from 'redux';

import { authentication } from './users/reducers/authentication.reducer';
import { registration } from './users/reducers/registration.reducer';
import { users } from './users/reducers/users.reducer';
import { persons } from './persons/reducers/persons.reducer';

import { alert } from './alerts/alert.reducer';

const rootReducer = combineReducers({
    authentication,
    registration,
    users,
    persons,
    alert
});

export default rootReducer;