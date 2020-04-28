import React from 'react'
import './BackDrop.css'

const BackDrop = (props) => {
    return(
        props.show ? <div className="backdrop"></div> : null
 
    )
}

export default BackDrop