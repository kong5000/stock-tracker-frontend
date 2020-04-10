import React, { useEffect, useState } from 'react'
import Chart from "react-apexcharts"
import assetsService from '../services/asset'

const LineChart = ({ stock }) => {
    const [dataPoints, setDataPoints] = useState(null)

    useEffect(() => {
        console.log(stock)
        if (stock) {
            console.log("EFFECT")
            assetsService.getChart(stock.ticker).then(
                quotes => {
                    const chart = quotes.chart
                    const points = [chart.length]
                    for (let i = 0; i < chart.length; i++) {
                        const dataPoint = [chart[i].date, chart[i].close]
                        points[i] = dataPoint
                    }
                    const series = [{
                        name: stock.ticker,
                        data: points
                    }]
                    setDataPoints(series)
                }
            )
        }
    }, [stock])

    const generateLineChartOptions = (stock) => {
        return (
            {
                chart: {
                    height: 350,
                    type: 'area',
                    zoom: {
                        enabled: false
                    },
                    foreColor: 'white'
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
                    type: 'datetime',
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

    const emptySeries = [{
        name: "6 Month",
        data: [0, 0, 0, 0, 0, 0]
    }]

    if (stock) {
        return (
            <div className="box">
                <Chart className="line-chart"
                    options={
                        stock
                            ? generateLineChartOptions(stock)
                            : generateLineChartOptions('click a stock')}
                    series={dataPoints
                        ? dataPoints
                        : emptySeries}
                    type="area"
                    height='100%'
                />
            </div>
        )
    }

    return (
        <div className="placeholder-box box">
            <div className="placeholder-text">
                Select a stock from pie chart to chart
            </div>
        </div>
    )


}

export default LineChart