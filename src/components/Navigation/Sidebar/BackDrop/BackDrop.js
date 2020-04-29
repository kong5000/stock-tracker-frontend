import React from 'react'
import './BackDrop.css'

const BackDrop = (props) => {
    return(
        props.show ? <div className="backdrop" onClick={props.onClick}></div> : null
    )
}

export default BackDrop