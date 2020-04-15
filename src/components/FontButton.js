import React from 'react'

const FontButton = ({ onClick, type }) => {
    let font = null
    let label = null
    
    switch (type) {
        case 'bell':
            font = <i className="fas fa-bell fa-4x"></i>
            label = <div className="btn-label">Set Alerts</div>
            break;
        case 'cash':
            font = <i className="far fa-money-bill-alt fa-4x"></i>
            label = <div className="btn-label">Add or Remove Cash</div>
            break
        case 'order':
            font = <i className="fas fa-cash-register fa-4x"></i>
            label = <div className="btn-label">Order</div>
            break;
        case 'pie':
            font = <i className="fas fa-chart-pie fa-4x"></i>
            label = <div className="btn-label">Set Target Allocation</div>
            break
        default:
    }

    return (
        <div className="col text-center labeled-font">
            <span onClick={onClick} className="clickable-font">
                {font}
            </span>
            {label}
        </div>
    )
}

export default FontButton