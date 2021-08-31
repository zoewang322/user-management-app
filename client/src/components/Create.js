import React from 'react';
import Form from './Form';
import { useHistory } from 'react-router-dom'

const Create = () => {
    const id = 0;
    const history = useHistory();

    return (
        <div>
            <div className="container" style={{marginTop: "3vh"}}>
                <button onClick={() => history.push('/')} className="btn btn-primary btn-sm">
                    Back to Home Page</button>
            </div>
            <Form currentId={id}/>
        </div>
    )
}

export default Create;