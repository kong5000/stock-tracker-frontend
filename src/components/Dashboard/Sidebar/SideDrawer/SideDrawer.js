import React from 'react'
import './SideDrawer.css'
import '../../../../Assets/css/all.css'
import FontButton from '../../../UI/FontButton/FontButton'
import { useDispatch } from 'react-redux'
import { logout } from '../../../../reducers/user'
import { Link } from 'react-router-dom'
import MenuButton from './MenuButton/MenuButton'

const SideDrawer = (props) => {
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }

    let classes = 'side-drawer'
    if (props.open) {
        classes += ' open'
    } else {
        classes += ' close'
    }

    const orderClickHanlder = () => {
        props.closeDrawer()
        props.onOrderClicked()
    }
    const allocationClickHanlder = () => {
        props.closeDrawer()
        props.onAllocationClicked()
    }
    const cashClickHanlder = () => {
        props.closeDrawer()
        props.onCashClicked()
    }
    const settingsClickHanlder = () => {
        props.closeDrawer()
        props.onSettingsClicked()
    }

    return (
        <div className="side-drawer-container">
            <MenuButton 
                menuClicked={props.menuClicked}
                open={props.open}
            />
            <div className={classes}>
                <div className='actions'>
                    <FontButton type="order" onClick={orderClickHanlder} />
                    <FontButton type="pie" onClick={allocationClickHanlder} />
                    <FontButton type="cash" onClick={cashClickHanlder} />
                </div>
                <FontButton type="gear" onClick={settingsClickHanlder} />
                <div className="scrollable">
                    <div className="cash-display">
                        <div>Total Cash</div>
                        <div className="cash">${Number(props.cash).toFixed(2)}</div>
                        <hr/>
                    </div>
                    <div className="profit-display">
                        <div>Total Profit</div>
                        <div className="cash">${Number(props.profit).toFixed(2)}</div>
                        <hr/>
                    </div>
                    <div className="latest-update-indicator">
                        Last Update
                    <div>{props.lastUpdate}</div>
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
    )
}

export default SideDrawer