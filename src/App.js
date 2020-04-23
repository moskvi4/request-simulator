import React from 'react';
import {connect} from 'react-redux';
import Spinner from '@atlaskit/spinner';
import AddRequestRow from './components/AddRequestRow';
import RequestsList from './components/RequestsList';
import RequestsActions from './components/RequestsActions';
import './App.css';

function App({currentRequest}) {
    return (
        <div className='App'>
            <p>Request simulator</p>
            <div className='content'>
                <div className='requests'>
                    <AddRequestRow/>
                    <RequestsList/>
                    <RequestsActions/>
                </div>
                {currentRequest &&
                <div className='loading'>
                    <Spinner size='xlarge' className='spinner'/>
                    {currentRequest.name}
                    <br/>
                    {`(${currentRequest.delay} sec left)`}
                </div>}
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    currentRequest: state.requests.currentRequest
});

export default connect(mapStateToProps)(App);
