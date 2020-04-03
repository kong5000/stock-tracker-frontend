import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import assetsService from '../services/asset'
import { setAssets } from '../reducers/assets'
import Chart from "react-apexcharts"

const Assets = () => {
    const [selectedStock, setSelectedStock] = useState(null)
    const assets = useSelector(state => state.assets)

    const dispatch = useDispatch()

    const chartClick = (event, chartContext, config) => {
        // The last parameter config contains additional information like `seriesIndex` and `dataPointIndex` for cartesian charts
        console.log(config.dataPointIndex, assets.stocks[config.dataPointIndex])
        setSelectedStock(assets.stocks[config.dataPointIndex])
    }

    const generateChartOptions = () => {
        const labels = assets.stocks.map(stock => stock.ticker)
        console.log('GENERATE', labels)
        return (
            {
                chart: {
                    type: 'pie',
                    events: {
                        dataPointSelection: chartClick
                    }
                },
                labels,
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




    const options = {
        chart: {
            type: 'pie',

        },
        labels: ['a', 'b', 'c'],
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


    // const series = [1, 10 , 20]

    useEffect(() => {
        assetsService.getAssets().then(
            assets => {
                dispatch(setAssets(assets))
            }
        )
    }, [dispatch])

    if (assets) {
        return (
            <div>
                {assets.stocks.map(stock => <div key={stock.ticker}>{stock.ticker} {stock.shares} {stock.price}</div>)}
                <div className="mixed-chart">
                    <Chart
                        options={generateChartOptions()}
                        series={assets.stocks.map(stock => stock.shares * stock.price)}
                        type="pie"
                        width="500"
                    />
                </div>
                {selectedStock &&
                    <div>
                        {selectedStock.ticker}
                        shares:{selectedStock.shares}
                        value:{selectedStock.shares * selectedStock.price}
                    </div>
                }
            </div>
        )
    } else {
        return (null)
    }
}

export default Assets