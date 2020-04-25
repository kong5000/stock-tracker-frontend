import React from 'react'
import './Sidebar.css'
import FontButton from '../../Content/ButtonBox/FontButton'

const Sidebar = (props) => {

    return (
        <div className='sidebar'>
            <div className='actions'>
                <FontButton type="order" onClick={props.onOrderClicked} />
                <FontButton type="bell" onClick={props.onOrderClicked} />
                <FontButton type="cash" onClick={props.onCashClicked} />
                <FontButton type="pie" onClick={props.onAllocationClicked} />
            </div>
            <hr></hr>
            <FontButton type="gear" onClick={() => console.log('Bar button')} />
            <FontButton type="signout" onClick={() => console.log('Bar button')} />
            <hr/>
            <div>Portfolio Cash</div>
            <div className="cash-balance">$100,000</div>
            <hr/>
            <div>Portfolio Profit</div>
            <div className="cash-balance">$100,000</div>
        </div>
    )
}

export default Sidebar