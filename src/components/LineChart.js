import React from 'react'
import Chart from "react-apexcharts"
const LineChart = ({ stock }) => {

    const generateLineChartOptions = (stock) => {
        return (
            {
                chart: {
                    height: 350,
                    type: 'area',
                    zoom: {
                        enabled: false
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'straight'
                },
                title: {
                    text: stock.ticker,
                    align: 'left'
                },
                xaxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                    labels: {
                        style: {
                            fontSize: '1rem'
                        }
                    }
                },
                yaxis: {
                    labels: {
                        style: {
                            fontSize: '1rem'
                        }
                    }
                }
            }
        )
    }

    const testSeries = [{
        name: "Desktops",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
    }]

    return (
        <Chart className="line-chart"
            options={
                stock
                    ? generateLineChartOptions(stock)
                    : generateLineChartOptions('click a stock')}
            series={testSeries}
            type="line"
            type="area"
            height='100%'
        />
    )
}

export default LineChart