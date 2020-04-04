import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import assetsService from '../services/asset'
import { setAssets } from '../reducers/assets'
import Chart from "react-apexcharts"
import Modal from 'react-bootstrap/Modal'
import OrderForm from './OrderForm'

const Assets = () => {
    const [selectedStock, setSelectedStock] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [showOrderForm, setShowOrderForm] = useState(false)

    const assets = useSelector(state => state.assets)

    const dispatch = useDispatch()

    const handleModalClose = () => {
        setShowModal(false)
        setShowOrderForm(false)
    }
    const chartClick = (event, chartContext, config) => {
        // The last parameter config contains additional information like `seriesIndex` and `dataPointIndex` for cartesian charts
        console.log(config.dataPointIndex, assets.stocks[config.dataPointIndex])
        setSelectedStock(assets.stocks[config.dataPointIndex])
        setShowModal(true)
    }

    const onOrderClicked = (event) => {
        setShowOrderForm(true)
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

                <Modal show={showOrderForm} onHide={handleModalClose}>
                        <Modal.Body>
                            <div>
                                <OrderForm/>
                            </div>
                        </Modal.Body>
                </Modal>

                {selectedStock &&
                    <Modal show={showModal} onHide={handleModalClose}>
                        <Modal.Body>
                            <div>
                                {selectedStock.ticker}
                                shares:{selectedStock.shares}
                                value:{selectedStock.shares * selectedStock.price}
                            </div>
                        </Modal.Body>
                    </Modal>
                }

                {selectedStock &&
                    <div>
                        {selectedStock.ticker}
                        shares:{selectedStock.shares}
                        value:{selectedStock.shares * selectedStock.price}
                    </div>
                }
                <button onClick={onOrderClicked}>Buy/Sell</button>
            </div>
        )
    } else {
        return (null)
    }
}

export default Assets