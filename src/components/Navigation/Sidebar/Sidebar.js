import React from 'react'
import './Sidebar.css'
import FontButton from '../../Content/ButtonBox/FontButton'

const Sidebar = (props) => {
    return (
        <div className='sidebar'>
            <FontButton type="order" onClick={()=>console.log('Bar button')} />
            <FontButton type="bell" onClick={()=>console.log('Bar button')} />
            <FontButton type="cash" onClick={()=>console.log('Bar button')} />
            <FontButton type="pie" onClick={()=>console.log('Bar button')} />
        </div>
    )
}

export default Sidebar