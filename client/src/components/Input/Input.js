import React from 'react';

import classes from './Input.module.css';

const input = (props) => {
    return (
        <div>
            <input 
                className={classes.InputTest} 
                type={props.type} 
                placeholder={props.placeholder}
                onChange={props.changed}
                value={props.inputUrl}></input>
        </div>
    )
}

export default input;