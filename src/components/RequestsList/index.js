import React from 'react';
import {connect} from 'react-redux';
import TrashIcon from '@atlaskit/icon/glyph/trash';
import {actions} from '../../actions';
import './RequestsList.css';

function RequestsList(props) {
    const {requests, deleteRequest} = props;
    
    return (
        <div className='requests-list'>
            {requests.map(({name, delay, id}) => (
                <div className='requests-list__item' key={id}>
                    <div className='requests-list__name'>
                        {name}
                    </div>
                    <div className='requests-list__delay'>
                        {delay}
                    </div>
                    <div onClick={() => deleteRequest(id)}>
                        <TrashIcon/>
                    </div>
                </div>
            ))}
        </div>
    );
}

const mapStateToProps = ({requests}) => ({requests: requests.requests}),
    mapDispatchToProps = dispatch => ({
        deleteRequest: id => dispatch({type: actions.DELETE_REQUEST, payload: id})
    });

export default connect(mapStateToProps, mapDispatchToProps)(RequestsList);
