import { authHeader } from '../../helpers/auth-header';
import { responseHandler } from '../../helpers/responseHandler';
import { logoutHandler } from '../../helpers/logoutHandler';

export const userService = {
    login,
    logout: logoutHandler,
    register, 
    getAll,
    get,
    update,
    delete: _delete
};

function login(login, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password })
    };

    return fetch(`/api/auth/token`, requestOptions)
        .then(responseHandler)
        .then(user => {
            console.log(user);
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/users/`, requestOptions).then(responseHandler);
}

function get(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/users/${id}`, requestOptions).then(responseHandler);
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`/api/users/`, requestOptions).then(responseHandler);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`/api/users/${user.id}`, requestOptions).then(responseHandler);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    return fetch(`/api/users/${id}`, requestOptions).then(responseHandler);
}