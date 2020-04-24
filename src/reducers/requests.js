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
                requests: [
                    ...requests,
                    {
                        name: name.trim(),
                        delay,
                        id: new Date().getTime(),
                        requested: false
                    }
                ],
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
        case actions.SET_REQUESTED: {
            const {id, requested} = action.payload;
            
            return {
                ...state,
                requests: state.requests.map(request => {
                    if (request.id === id) {
                        return {...request, requested};
                    } else {
                        return request;
                    }
                })
            };
        }
        case actions.SET_REQUESTED_ALL: {
            return {
                ...state,
                requests: state.requests.map(request => ({...request, requested: action.payload}))
            };
        }
        default:
            return state;
    }
}

export default requests;
