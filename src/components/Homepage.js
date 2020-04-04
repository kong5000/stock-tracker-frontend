import React, { useState } from 'react'
import Chart from "react-apexcharts"
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Signup from './Signup'
import Login from './Login'
import { Link } from 'react-router-dom'

const Homepage = () => {
    const exampleData = [100, 100, 100]

    const chartOptions = {
        chart: {
            type: 'pie'
        },
        legend: {
            show: false,
        },
        dataLabels: {
            enabled: false
        },
        seriesLabels: {
            enabled: false
        }
    }

    return (
        <div className="homepage">
            <div className="homepage-left-half">
                <h1 className="tagline">Watch Your Stocks Grow</h1>
                <ul>
                    <li>
                        BeanStock is a stock portfolio tracking app I built to practice web devlopment.
                </li>
                    <li>
                        Try making an account and add some stocks to your portfolio.
                </li>
                    <li>
                        Built using React, Redux, Express , Boostrap and MongoDB
                </li>
                    <li>
                        Market data provided by IEX Cloud
                </li>
                </ul>
                <div>
                    <Link to='/login' className="homepage-btn">Login</Link>
                    <Link to='/signup' className="homepage-btn">Signup</Link>
                </div>
            </div>
            <div className="homepage-right-half">
                <Chart
                    options={chartOptions}
                    series={exampleData}
                    type="pie"
                    width="500">
                </Chart>
            </div>
        </div>
    )
}

export default Homepage