import React from 'react'
import '../Assets/css/all.css'
import FontButton from './FontButton'

const ButtonBox = ({onOrderClicked, onAllocationClicked}) => {
    return (
        <div className="box">
            <div className="button-holder">
                <div className="row">
                    <FontButton type="order" onClick={onOrderClicked}/>
                    <FontButton type="bell" onClick={null}/>
                </div>
                <div className="row">
                    <FontButton type="cash" onClick={null}/>
                    <FontButton type="pie" onClick={onAllocationClicked}/>
                </div>
            </div>
        </div>
    )
}

export default ButtonBox