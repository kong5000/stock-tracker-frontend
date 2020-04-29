import React from 'react'

const MenuButton = (props) => {
    let classes = "menu-button fas fa-bars"
    props.open ? classes += " menu-open" : classes += " menu-close"
    
    return (
        <i onClick={props.menuClicked} className={classes}></i>
    )
}

export default MenuButton