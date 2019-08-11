import { personsConstants } from '../persons.constants';

export function persons(state = {}, action) {
    switch (action.type) {
        case personsConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case personsConstants.GETALL_SUCCESS:
            return {
                items: action.persons
            };
        case personsConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        case personsConstants.DELETE_REQUEST:
            return {
                ...state,
                items: state.items.map(person =>
                    person.id === action.id
                        ? { ...person, deleting: true }
                        : person
                )
            };
        case personsConstants.DELETE_SUCCESS:
            return {
                items: state.items.filter(person => person.id !== action.id)
            };
        case personsConstants.DELETE_FAILURE:
            return {
                ...state,
                items: state.items.map(person => {
                    if (person.id === action.id) {
                        const { deleting, ...personCopy } = person;
                        return { ...personCopy, deleteError: action.error };
                    }
                    return person;
                })
            };
        case personsConstants.GET_REQUEST:
            return {
                loading: true
            };
        case personsConstants.GET_SUCCESS:
            return {
                item: action.person
            };
        case personsConstants.GET_FAILURE:
            return {
                error: action.error
            };
        case personsConstants.EDIT_REQUEST:
            return {
                updating: true
            };
        case personsConstants.EDIT_SUCCESS:
            return {};
        case personsConstants.EDIT_FAILURE:
            return {};
        case personsConstants.ADD_REQUEST:
            return {
                adding: true
            };
        case personsConstants.ADD_SUCCESS:
            return {};
        case personsConstants.ADD_FAILURE:
            return {};
        default:
            return state
  }
}