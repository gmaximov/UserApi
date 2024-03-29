import { userConstants } from './users.constants';
import { userService } from './users.service';
import { alertActions } from '../alerts/alert.actions';
import { history } from '../../helpers/history';

export const userActions = {
    login,
    logout,
    register,
    getAll,
    update,
    get,
    delete: _delete
};

function login(login, password) {
    return dispatch => {
        dispatch(request({ login }));

        userService.login(login, password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => { 
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                () => { 
                    dispatch(success(id));
                },
                error => {
                    dispatch(failure(id, error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}
function get(id) {
    return dispatch => {
        dispatch(request());

        return userService.get(id)
            .then(
                user => dispatch(success(user)),
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: userConstants.GET_REQUEST } }
    function success(user) { return { type: userConstants.GET_SUCCESS, user } }
    function failure(error) { return { type: userConstants.GET_FAILURE, error } }
}
function update(user) {
    return dispatch => {
        dispatch(request(user));

        userService.update(user)
            .then(
                user => {
                    dispatch(success(user));
                    dispatch(alertActions.success('Edit successful'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.EDIT_REQUEST, user } }
    function success(user) { return { type: userConstants.EDIT_SUCCESS, user } }
    function failure(error) { return { type: userConstants.EDIT_FAILURE, error } }
}