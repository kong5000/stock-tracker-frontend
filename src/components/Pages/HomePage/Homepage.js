import React from 'react'
import DummyPieChart from './DummyPieChart/DummyPieChart'
import './homepage.css'
import { Link } from 'react-router-dom'

const Homepage = () => {
    return (
        <div className="homepage">
            <div className="homepage-left-half">
                <h1 className="tagline">Watch Your Stocks Grow</h1>
                <ul>
                    <li className="description-text">
                        BeanStock is an asset allocation app that will notify you
                        if your portfolio goes out of your target balance.
                    </li>
                    <li>Market data provided by IEX Cloud</li>
                </ul>
                <div>
                    <Link to='/login' className="homepage-btn btn btn-primary">Login</Link>
                    <Link to='/signup' className="homepage-btn btn btn-primary">Signup</Link>
                </div>
            </div>
            <div className="homepage-right-half">
                <DummyPieChart/>
            </div>
        </div>
    )
}

export default Homepage