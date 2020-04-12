import React from 'react'

const ButtonBox = ({onOrderClicked, onAllocationClicked}) => {
    return (
        <div className="box">
            <div className="button-holder">
                <div className="row">
                    <div onClick={onOrderClicked} className="col text-center labeled-font">
                        <span  className="clickable-font">
                            <i className="fas fa-cash-register fa-4x"></i>
                        </span>
                        <div className="btn-label">Order</div>
                    </div>
                    <div className="col text-center labeled-font">
                        <span onClick={() => { console.log('test') }} className="clickable-font">
                            <i className="fas fa-bell fa-4x"></i>
                        </span>
                        <div className="btn-label">Set Alerts</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col text-center labeled-font">
                        <span onClick={() => { console.log('test') }} className="clickable-font">
                            <i className="far fa-money-bill-alt fa-4x"></i>
                        </span>
                        <div className="btn-label">Add/Remove Cash</div>
                    </div>
                    <div className="col text-center labeled-font">
                        <span onClick={onAllocationClicked} className="clickable-font">
                            <i className="fas fa-chart-pie fa-4x"></i>
                        </span>
                        <div className="btn-label">Set Target Allocation</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ButtonBox