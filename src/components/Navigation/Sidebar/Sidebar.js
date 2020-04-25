import React from 'react'
import './Sidebar.css'
import FontButton from '../../Content/ButtonBox/FontButton'
import { useDispatch } from 'react-redux'
import { logout } from '../../../reducers/user'
import { Link } from 'react-router-dom'


const Sidebar = (props) => {
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch( logout() )
    }

    return (
        <div className='sidebar'>
            <div className='actions'>
                <FontButton type="order" onClick={props.onOrderClicked} />
                <FontButton type="pie" onClick={props.onAllocationClicked} />
                <FontButton type="bell" onClick={props.onOrderClicked} />
                <FontButton type="cash" onClick={props.onCashClicked} />
            </div>
            <hr></hr>
            <FontButton type="gear" onClick={() => console.log('Bar button')} />
            <div className="side-bar-logout">
            <Link onClick={logoutHandler} to='/' href="#projects-section" className="sidebar-link">
            <FontButton type="signout" />
                </Link>
            </div>



            <hr/>
            <div>Portfolio Cash</div>
            <div className="cash-balance">${props.cash}</div>
            <hr/>
            <div>Portfolio Profit</div>
            <div className="cash-balance">{props.profit}</div>
        </div>
    )
}

export default Sidebar