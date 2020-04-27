import React from 'react'
import './Sidebar.css'
import '../../../Assets/css/all.css'
import FontButton from '../../Content/ButtonBox/FontButton'
import { useDispatch } from 'react-redux'
import { logout } from '../../../reducers/user'
import { Link } from 'react-router-dom'


const Sidebar = (props) => {
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <div className='sidebar'>
            <div>
                <h1 className="logo">BeanS
                <i className="fas fa-seedling fa-1x icon"></i>
                    ock
            </h1>
            </div>
            <div className='actions'>
                <FontButton type="order" onClick={props.onOrderClicked} />
                <FontButton type="pie" onClick={props.onAllocationClicked} />
                <FontButton type="cash" onClick={props.onCashClicked} />
            </div>
            <hr></hr>
            <FontButton type="gear"  onClick={props.onSettingsClicked} />
            <FontButton type="key" />
            <hr />
            <div>Total Cash</div>
            <div className="cash">${Number(props.cash).toFixed(2)}</div>
            <hr />
            <div>Total Profit</div>
            <div className="cash">${Number(props.profit).toFixed(2)}</div>
            <hr />
            <div className="side-bar-logout">
                <Link onClick={logoutHandler} to='/' href="#projects-section" className="sidebar-link">
                    <FontButton type="signout" />
                </Link>
            </div>
            <hr/>
        </div>
    )
}

export default Sidebar