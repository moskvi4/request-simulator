import React from 'react';
import {connect} from 'react-redux';
import Button from '@atlaskit/button';
import TextField from '@atlaskit/textfield';
import Select from '@atlaskit/select';
import {actions} from '../../actions';
import './AddRequestRow.css';

const options = Array.from({length: 10}).map((elem, index) => ({label: index + 1, value: index + 1}));

function AddRequestRow(props) {
    const {name, delay, addRequest, changeName, changeDelay, totalRequestsCount} = props;
    const trimmedName = name.trim();
    
    return (
        <div className='add-request-row'>
            <div className='add-request-row__name'>
                <label htmlFor='name'>Request name</label>
                <TextField name='name' value={name} onChange={changeName}/>
            </div>
            <div className='add-request-row__delay'>
                <label htmlFor='delay'>Delay (sec)</label>
                <Select
                    name='delay'
                    value={options.find(({value}) => value === delay)}
                    onChange={changeDelay}
                    options={options}/>
            </div>
            <Button
                className='add-request-row__add'
                onClick={addRequest}
                isDisabled={!trimmedName || !delay || totalRequestsCount >= 10}>
                Add
            </Button>
        </div>
    );
}

const mapStateToProps = ({requests}) => ({
        name: requests.name,
        delay: requests.delay,
        totalRequestsCount: requests.requests.length
    }),
    mapDispatchToProps = dispatch => ({
        addRequest: () => dispatch({type: actions.ADD_REQUEST}),
        changeName: ({target: {value}}) => dispatch({type: actions.CHANGE_NAME, payload: value}),
        changeDelay: ({value}) => dispatch({type: actions.CHANGE_DELAY, payload: value})
    });

export default connect(mapStateToProps, mapDispatchToProps)(AddRequestRow);
