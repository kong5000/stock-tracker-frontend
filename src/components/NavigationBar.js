import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Link } from 'react-router-dom'
import '../styles/NavigationBar.css'

const NavigationBar = () => (
    <Navbar expand="lg" className='navigation-bar'>
        <Navbar.Brand>
            <h1>BeanS
                <i className="fas fa-seedling fa-1x icon"></i>
                ock
            </h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto mr-5">                   
                <Link to='/login' href="#projects-section" className="my-link">Login</Link>
                <Link to='/signup' href="#contact-section" className="my-link">Signup</Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
)

export default NavigationBar