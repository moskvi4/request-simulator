import React from 'react';
import {connect} from 'react-redux';
import Button from '@atlaskit/button';
import {actions} from '../../actions';
import './RequestsActions.css';

function RequestsActions(props) {
    const {start, stop, requesting, empty} = props;
    
    return (
        <div className='requests-actions'>
            <Button
                appearance='primary'
                className='requests-actions__run'
                onClick={start}
                isDisabled={requesting || empty}>
                Run
            </Button>
            <Button className='requests-actions__stop' onClick={stop} isDisabled={!requesting}>
                Stop
            </Button>
        </div>
    );
}

const mapStateToProps = state => ({
        requesting: state.requests.requesting,
        empty: state.requests.requests.length === 0
    }),
    mapDispatchToProps = dispatch => ({
        start: () => dispatch({type: actions.START_REQUESTS}),
        stop: () => dispatch({type: actions.STOP_REQUESTS})
    });

export default connect(mapStateToProps, mapDispatchToProps)(RequestsActions);
