import React from 'react'
import Chart from "react-apexcharts"

const PieChart = ({ assets, chartClick }) => {

    const generateChartOptions = () => {
        const labels = assets.stocks.map(stock => stock.ticker)
        return (
            {
                chart: {
                    type: 'pie',
                    events: {
                        dataPointSelection: chartClick
                    },
                    foreColor: 'white'
                },
                labels,
                legend: {
                    show: true,
                    fontSize: '20px'
                },
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
        )
    }
    if (assets.stocks.length > 0) {
        return (
            <div className="box">
                <Chart className="pie-chart"
                    options={generateChartOptions()}
                    series={assets.stocks.map(stock => stock.shares * stock.price)}
                    type="pie"
                    height='100%'
                />
            </div>
        )
    }
    return (
        <div className="placeholder-box box">
            <div className="placeholder-text">
                Add a stock with the Order button
            </div>
        </div>
    )
}

export default PieChart