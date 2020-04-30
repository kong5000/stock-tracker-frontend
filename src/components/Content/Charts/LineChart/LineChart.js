import React, { useEffect, useState } from 'react'
import Chart from "react-apexcharts"
import assetsService from '../../../../services/asset'
import { ReactComponent as Spinner } from '../../../../Assets/spinner.svg'
import '../Charts.css'
import './LineChart.css'

const LineChart = ({ stock }) => {
    const [dataPoints, setDataPoints] = useState(null)
    const [message, setMessage] = useState('Could not find stock')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (stock) {
            setIsLoading(true)
            assetsService.getChart(stock.ticker).then(
                quotes => {
                    if (quotes) {
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
                        setIsLoading(false)
                    } else {
                        setDataPoints(null)
                        setIsLoading(false)
                    }
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
                    align: 'center',
                    style: {
                        fontSize: '30px'
                    }
                },
                xaxis: {
                    type: 'datetime',
                    tooltip: {
                        enabled: true,
                        formatter: undefined,
                        offsetY: 0,
                        style: {
                            fontSize: '12px',
                        },
                    },
                },
                yaxis: {
                    labels: {
                        style: {
                            fontSize: '1rem'
                        }
                    }
                },
                tooltip: {
                    style: {
                        fontSize: '12px',
                    }
                },
                responsive: [{
                    breakpoint: 525,
                    options: {
                        chart: {
                            width: '90%',
                            height: '100%'
                        },
                        yaxis: {
                            labels: {
                                style: {
                                    fontSize: '0.6rem'
                                }
                            }
                        },
                    }
                }]
            }
        )
    }

    const emptySeries = [{
        name: "6 Month",
        data: [0, 0, 0, 0, 0, 0]
    }]

    if (isLoading) {
        return <div className="box"><Spinner className="spinner" /></div>
    }

    if (stock) {
        if (dataPoints) {
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
            <div className="placeholder-box box ">
                <div className="placeholder-text">
                    {message}
                </div>
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