import { personsConstants } from './persons.constants';
import { personsService } from './persons.service';
import { alertActions } from '../alerts/alert.actions';
import { history } from '../../helpers/history';

export const personsActions = {
    add,
    getAll,
    update,
    get,
    delete: _delete
};

function add(person) {
    return dispatch => {
        dispatch(request(person));

        personsService.add(person)
            .then(
                person => { 
                    dispatch(success(person));
                    history.push('/persons');
                    dispatch(alertActions.success('Add successful')); 
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(person) { return { type: personsConstants.ADD_REQUEST, person } }
    function success(person) { return { type: personsConstants.ADD_SUCCESS, person } }
    function failure(error) { return { type: personsConstants.ADD_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        personsService.getAll()
            .then(
                persons => dispatch(success(persons)),
                error => {
                        dispatch(failure(error));
                        dispatch(alertActions.error(error));
                    }
            );
    };

    function request() { return { type: personsConstants.GETALL_REQUEST } }
    function success(persons) { return { type: personsConstants.GETALL_SUCCESS, persons } }
    function failure(error) { return { type: personsConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        personsService.delete(id)
            .then(
                () => { 
                    dispatch(success(id));
                    dispatch(alertActions.success('Delete successful'));
                },
                error => {
                    dispatch(failure(id, error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(id) { return { type: personsConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: personsConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: personsConstants.DELETE_FAILURE, id, error } }
}
function get(id) {
    return dispatch => {
        dispatch(request());

        return personsService.get(id)
            .then(
                person => dispatch(success(person)),
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: personsConstants.GET_REQUEST } }
    function success(person) { return { type: personsConstants.GET_SUCCESS, person } }
    function failure(error) { return { type: personsConstants.GET_FAILURE, error } }
}
function update(person) {
    return dispatch => {
        dispatch(request(person));

        personsService.update(person)
            .then(
                person => {
                    dispatch(success(person));
                    dispatch(alertActions.success('Edit successful'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(person) { return { type: personsConstants.EDIT_REQUEST, person } }
    function success(person) { return { type: personsConstants.EDIT_SUCCESS, person } }
    function failure(error) { return { type: personsConstants.EDIT_FAILURE, error } }
}