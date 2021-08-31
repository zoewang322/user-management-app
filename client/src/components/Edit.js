import React from 'react';
import Form from './Form';
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux';

const Edit = () => {
    const currentId = useSelector((state) => state.pageStatus.currentId);
    const history = useHistory();

    return (
        <div>
            <div className="container" style={{marginTop: "3vh"}}>
                <button onClick={() => history.push('/')} className="btn btn-primary btn-sm">
                    Back to Home Page</button>
            </div>
            <Form currentId={currentId}/>
        </div>
    )
}

export default Edit;