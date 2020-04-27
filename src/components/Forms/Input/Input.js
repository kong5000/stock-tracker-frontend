import React from 'react'
import './Input.css'
const Input = (props) => {
    return (
        <div className="custom-input">
            <div className="current-value">
            <label>{props.label}</label>
            </div>
            <div>
            <input type={props.type}/>
            </div>
        </div>
    )
}

export default Input