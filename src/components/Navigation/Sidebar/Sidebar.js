import React, {useState} from 'react'
import './Sidebar.css'
import '../../../Assets/css/all.css'
import FontButton from '../../Content/ButtonBox/FontButton'
import { useDispatch } from 'react-redux'
import { logout } from '../../../reducers/user'
import { Link } from 'react-router-dom'
import SideDrawer from './SideDrawer/SideDrawer'
const Sidebar = (props) => {
    const [showDrawer, setShowDrawer] = useState(false)
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }

    const formatDate = (date) => {
        return (
            <div className="date-box">
                <div>
                    {`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} `}
                </div>
                <div>{`${date.getHours()}:${date.getMinutes()}`}</div>
            </div>
        )
    }

    const onMenuClicked = () =>{
        setShowDrawer(!showDrawer)
    }
    const closeDrawer = () => setShowDrawer(false)

    return (
        <div>
            <SideDrawer
                onOrderClicked={props.onOrderClicked}
                onAllocationClicked={props.onAllocationClicked}
                onCashClicked={props.onCashClicked}
                onSettingsClicked={props.onSettingsClicked}
                cash={props.cash}
                profit={Number(props.profit).toFixed(2)}
                lastUpdate={formatDate(new Date(props.lastUpdate))}
                open={showDrawer}
                menuClicked={onMenuClicked}
                closeDrawer={closeDrawer}
            />
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
                <FontButton type="gear" onClick={props.onSettingsClicked} />
                <hr />
                <div>Total Cash</div>
                <div className="cash">${Number(props.cash).toFixed(2)}</div>
                <hr />
                <div>Total Profit</div>
                <div className="cash">${Number(props.profit).toFixed(2)}</div>
                <hr />
                <div className="latest-update-indicator">
                    Last Update
                <div>{formatDate(new Date(props.lastUpdate))}</div>
                </div>
                <hr />
                <div className="side-bar-logout">
                    <Link onClick={logoutHandler} to='/' href="#projects-section" className="sidebar-link">
                        <FontButton type="signout" />
                    </Link>
                </div>
                <hr />
            </div>
        </div>
    )
}

export default Sidebar