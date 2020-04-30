import React from 'react'

const RadioButton = ({id, value, checked, onChange, label }) => {
    return(
        <div className="custom-control custom-radio">
        <input
            id={id}
            type="radio"
            value={value}
            className="custom-control-input"
            required
            checked={checked}
            onChange={onChange}
        />
        <label className="custom-control-label" htmlFor={id}>{label}</label>
    </div>
    )
}

export default RadioButton