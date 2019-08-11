import { authHeader } from '../../helpers/auth-header';
import { responseHandler } from '../../helpers/responseHandler';

export const personsService = {
    add,
    getAll,
    get,
    update,
    delete: _delete
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/persons/`, requestOptions).then(responseHandler);
}

function get(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/persons/${id}`, requestOptions).then(responseHandler);
}

function add(person) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(person)
    };

    return fetch(`/api/persons/`, requestOptions).then(responseHandler);
}

function update(person) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(person)
    };

    return fetch(`/api/persons/${person.id}`, requestOptions).then(responseHandler);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    return fetch(`/api/persons/${id}`, requestOptions).then(responseHandler);
}