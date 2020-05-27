import {select, put, delay, takeEvery} from 'redux-saga/effects';
import {actions} from '../actions';

function* getRequestsInfo() {
    const state = yield select();
    const {requests, ...rest} = state.requests;
    
    return {
        ...rest,
        requests: requests.filter(({requested}) => !requested)
    };
}

function* startRequests() {
    let {requests, requesting} = yield getRequestsInfo();
    
    if (!requesting) {
        yield put({type: actions.SET_REQUESTING, payload: true});
        yield put({type: actions.SET_REQUESTED_ALL, payload: false});
        
        ({requests, requesting} = yield getRequestsInfo());
        
        while (requests.length > 0 && requesting) {
            const [request] = requests;
            
            yield put({type: actions.SET_CURRENT_REQUEST, payload: {...request}});
            yield put({type: actions.SET_REQUESTED, payload: {id: request.id, requested: true}});
            
            for (let i = 1; i <= request.delay; i++) {
                yield delay(1000);
                
                ({requesting} = yield getRequestsInfo());
                
                if (!requesting) {
                    return;
                }
                
                yield put({
                    type: actions.SET_CURRENT_REQUEST,
                    payload: {
                        ...request,
                        delay: request.delay - i
                    }
                });
            }
            
            ({requests, requesting} = yield getRequestsInfo());
        }
        
        yield stopRequests();
    }
}

function* stopRequests() {
    yield put({type: actions.SET_REQUESTING, payload: false});
    yield put({type: actions.SET_CURRENT_REQUEST, payload: null});
    yield put({type: actions.SET_REQUESTED_ALL, payload: false});
}

export function* requestsSaga() {
    yield takeEvery(actions.START_REQUESTS, startRequests);
    yield takeEvery(actions.STOP_REQUESTS, stopRequests);
}
