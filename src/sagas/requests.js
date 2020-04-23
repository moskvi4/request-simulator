import {select, put, delay, takeEvery} from 'redux-saga/effects';
import {actions} from '../actions';

function* getRequestsInfo() {
    const state = yield select();
    
    return state.requests;
}

function* startRequests() {
    let {requests, requesting} = yield getRequestsInfo();
    
    if (!requesting) {
        yield put({type: actions.SET_REQUESTING, payload: true});
        
        ({requests, requesting} = yield getRequestsInfo());
        
        while (requests.length > 0 && requesting) {
            const [request] = requests;
            
            yield put({type: actions.SET_CURRENT_REQUEST, payload: request});
            yield put({type: actions.DELETE_REQUEST, payload: request.id});
            
            for (let i = 1; i <= request.delay; i++) {
                yield delay(1000);
                ({requests, requesting} = yield getRequestsInfo());
                
                if (!requesting) {
                    return;
                }
                
                yield put({type: actions.SET_CURRENT_REQUEST, payload: {...request, delay: request.delay - i}});
            }
            
            ({requests, requesting} = yield getRequestsInfo());
        }
        
        yield stopRequests();
    }
}

function* stopRequests() {
    yield put({type: actions.SET_REQUESTING, payload: false});
    yield put({type: actions.SET_CURRENT_REQUEST, payload: null});
}

export function* requestsSaga() {
    yield takeEvery(actions.START_REQUESTS, startRequests);
    yield takeEvery(actions.STOP_REQUESTS, stopRequests);
}
