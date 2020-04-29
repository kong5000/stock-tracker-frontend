import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Link } from 'react-router-dom'
import './NavigationBar.css'

const NavigationBar = ({user, onLogout}) => {
    return (
        <Navbar expand="lg" className='navigation-bar'>
            <Navbar.Brand>
                <div className="brand">
                <h1 className="logo-text">BeanS
                <i className="fas fa-seedling fa-1x icon"></i>
                    ock
                </h1>
                </div>
            </Navbar.Brand>
                <Nav className="ml-auto mr-5">
                    {user
                        ? <Link onClick={onLogout} to='/' href="#projects-section" className="my-link">Logout</Link>
                        : <Link to='/login' href="#projects-section" className="my-link">Login</Link>}
                    {!user && <Link to='/signup' href="#contact-section" className="my-link">Signup</Link>}
                </Nav>
        </Navbar>
    )
}

export default NavigationBar