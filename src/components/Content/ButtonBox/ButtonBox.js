import React from 'react'
import '../../../Assets/css/all.css'
import './ButtonBox.css'
import FontButton from './FontButton'

const ButtonBox = ({onOrderClicked, onAllocationClicked, onCashClicked}) => {
    return (
        <div className="box">
            <div className="button-holder">
                <div className="row">
                    <FontButton type="order" onClick={onOrderClicked}/>
                    <FontButton type="bell" onClick={onOrderClicked}/>
                </div>
                <div className="row">
                    <FontButton type="cash" onClick={onCashClicked}/>
                    <FontButton type="pie" onClick={onAllocationClicked}/>
                </div>
            </div>
        </div>
    )
}

export default ButtonBox