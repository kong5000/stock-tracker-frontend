import React from 'react'
import PropTypes from 'prop-types'
import './FontButton.css'

const FontButton = ({ onClick, type }) => {
    let font = null
    let label = null

    switch (type) {
        case 'bell':
            font = <i className="fas fa-bell fa-2x font"></i>
            label = <div className="btn-label">Alerts</div>
            break;
        case 'cash':
            font = <i className="far fa-money-bill-alt fa-2x font"></i>
            label = <div className="btn-label">Cash</div>
            break
        case 'order':
            font = <i className="fas fa-cash-register fa-2x font"></i>
            label = <div className="btn-label">Order</div>
            break;
        case 'pie':
            font = <i className="fas fa-chart-pie fa-2x font"></i>
            label = <div className="btn-label">Allocation</div>
            break
        case 'gear':
            font = <i class="fas fa-cogs fa-2x font"></i>
            label = <div className="btn-label">Settings</div>
            break
        case 'signout':
            font = <i class="fas fa-sign-out-alt fa-2x font"></i>
            label = <div className="btn-label">Logout</div>
            break
        default:
    }

    return (
        <span onClick={onClick} className="menu-item">
            <div className=" text-center font-button">
                {font}
                {label}
            </div>
        </span>
    )
}

FontButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired
}

export default FontButton