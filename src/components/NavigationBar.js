import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

const NavigationBar = () => (
    <Navbar expand="lg" className='navigation-bar'>
        <Navbar.Brand>
            <h1>BeanS
                <i class="fas fa-seedling fa-1x icon"></i>
                ock
            </h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto mr-5">
                <Nav.Link href="#projects-section" className="my-link">Login</Nav.Link>
                <Nav.Link href="#contact-section" className="my-link">Signup</Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
)

export default NavigationBar