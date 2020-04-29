import React, { useState } from 'react'
import './Sidebar.css'
import '../../../Assets/css/all.css'
import FontButton from '../../Content/ButtonBox/FontButton'
import { useDispatch } from 'react-redux'
import { logout } from '../../../reducers/user'
import { Link } from 'react-router-dom'
import SideDrawer from './SideDrawer/SideDrawer'
import BackDrop from './BackDrop/BackDrop'
const Sidebar = (props) => {
    const [showDrawer, setShowDrawer] = useState(false)
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }

    const formatDate = (inputDate) => {
        console.log('DATE', inputDate)
        if (!inputDate) {
            return 'N/A'
        }
        const date = new Date(inputDate)
        return (
            <div className="date-box">
                <div>
                    {`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} `}
                </div>
                <div>{`${date.getHours()}:${date.getMinutes()}`}</div>
            </div>
        )
    }

    const onMenuClicked = () => {
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
            <BackDrop
                show={showDrawer}
                onClick={onMenuClicked}
            />
            <div className='sidebar'>
                <div>
                    <h1 className="logo">BeanS<i className="fas fa-seedling fa-1x icon"></i>ock
                     </h1>
                </div>
                {/* <div className="side-bar-content"> */}
                    {/* <div className='actions'> */}
                        <FontButton type="order" onClick={props.onOrderClicked} />
                        <FontButton type="pie" onClick={props.onAllocationClicked} />
                        <FontButton type="cash" onClick={props.onCashClicked} />
                        <FontButton type="gear" onClick={props.onSettingsClicked} />
                    {/* </div> */}
                    <div className="scrollable">
                        <div className="cash-display">
                            <div>Total Cash</div>
                            <div className="cash">${Number(props.cash).toFixed(2)}</div>
                            <hr />
                        </div>
                        <div className="profit-display">
                            <div>Total Profit</div>
                            <div className="cash">${Number(props.profit).toFixed(2)}</div>
                            <hr />
                        </div>
                        <div className="latest-update-indicator">
                            Last Update
                    <div>{formatDate(props.lastUpdate)}</div>
                        </div>
                    </div>
                    <div className="side-bar-logout">
                        <Link onClick={logoutHandler} to='/' href="#projects-section" className="sidebar-link">
                            <FontButton type="signout" />
                        </Link>
                    </div>
                    <hr />
                </div>
            </div>
        // </div>
    )
}

export default Sidebar