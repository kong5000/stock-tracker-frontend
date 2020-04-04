import React from 'react'
import Chart from "react-apexcharts"

const Homepage = () => {
    const exampleData = [100, 100, 100]
    const exampleLabels = ['SIGNUP', 'LOGIN', 'ABOUT']

    const chartOptions = {
        chart: {
            type: 'pie'
        },
        labels: exampleLabels,
        responsive: [{
            breakpoint: 40,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    }


    return (
        <div className="homepage">
            <div className="homepage-left-half">
                <div className="tagline">
                    <h1>Watch Your Stocks Grow</h1>
                </div>
                <ul>
                    <li>
                        BeanStock is a stock tracking app I built to practice full stack web devlopment.
                </li>
                    <li>
                        Try signing up to add stocks to your portfolio.
                </li>
                    <li>
                        Built with React, Redux, Express , Boostrap and MongoDB
                </li>
                </ul>
            </div>
            <div className="homepage-right-half">
                <Chart
                    options={chartOptions}
                    labels={exampleLabels}
                    series={exampleData}
                    type="pie"
                    width="500">
                </Chart>
            </div>
        </div>
    )
}

export default Homepage