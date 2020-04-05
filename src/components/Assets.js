import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import assetsService from '../services/asset'
import { setAssets } from '../reducers/assets'
import Chart from "react-apexcharts"
import Modal from 'react-bootstrap/Modal'
import OrderForm from './OrderForm'
import AssetCardList from './AssetCardList'

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
        setSelectedStock(assets.stocks[config.dataPointIndex])
        setShowModal(true)
    }

    const onOrderClicked = (event) => {
        setShowOrderForm(true)
    }

    const onSubmissionFinished = () => {
        updateAssets()
        setShowOrderForm(false)
    }

    const updateAssets = () => {
        assetsService.getAssets().then(
            assets => {
                dispatch(setAssets(assets))
            }
        )
    }

    const generateChartOptions = () => {
        const labels = assets.stocks.map(stock => stock.ticker)
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

    return (
        <div>
            {assets &&
                <div className="mixed-chart">
                    <Chart
                        options={generateChartOptions()}
                        series={assets.stocks.map(stock => stock.shares * stock.price)}
                        type="pie"
                        width="500"
                    />
                </div>
            }

            <AssetCardList assets={assets}/>

            <Modal show={showOrderForm} onHide={handleModalClose}>
                <Modal.Body>
                    <div>
                        <OrderForm onSubmissionFinished={onSubmissionFinished} />
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
            {assets && <div>User cash: {assets.cash}</div>}
        </div>
    )

}

export default Assets