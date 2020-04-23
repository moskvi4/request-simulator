import {actions} from '../actions';

const defaultState = {
    requests: [],
    name: '',
    delay: 1,
    currentRequest: null,
    requesting: false
};

function requests(state = defaultState, action) {
    switch (action.type) {
        case actions.ADD_REQUEST: {
            const {requests, name, delay} = state;
            
            return {
                ...state,
                requests: [...requests, {name, delay, id: new Date().getTime()}],
                name: '',
                delay: 1
            };
        }
        case actions.CHANGE_NAME: {
            return {
                ...state,
                name: action.payload
            };
        }
        case actions.CHANGE_DELAY: {
            return {
                ...state,
                delay: action.payload
            };
        }
        case actions.DELETE_REQUEST: {
            return {
                ...state,
                requests: state.requests.filter(({id}) => id !== action.payload)
            };
        }
        case actions.SET_CURRENT_REQUEST: {
            return {
                ...state,
                currentRequest: action.payload
            };
        }
        case actions.SET_REQUESTING: {
            return {
                ...state,
                requesting: action.payload
            };
        }
        default:
            return state;
    }
}

export default requests;
