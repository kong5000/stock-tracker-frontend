import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import assetsService from '../services/asset'
import { setAssets } from '../reducers/assets'
import Chart from "react-apexcharts"
import { Modal } from 'react-bootstrap'
import OrderForm from './OrderForm'
import AssetCardList from './AssetCardList'
import { ReactComponent as Spinner } from '../Assets/spinner.svg'

const Assets = () => {
    const [selectedStock, setSelectedStock] = useState(null)
    const [showOrderForm, setShowOrderForm] = useState(false)
    const [pageIsLoading, setPageIsLoading] = useState(true)

    const assets = useSelector(state => state.assets)

    const dispatch = useDispatch()

    const handleModalClose = () => {
        setShowOrderForm(false)
        setSelectedStock(false)
    }
    const chartClick = (event, chartContext, config) => {
        setSelectedStock(assets.stocks[config.dataPointIndex])
        setShowOrderForm(true)
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
                setPageIsLoading(false)
            }
        )
    }, [dispatch])

    if (pageIsLoading) {
        return <Spinner className="spinner" />
    } else {
        return (
            <div>
                <div className="asset-page">
                    <Chart className="mixed-chart"
                        options={generateChartOptions()}
                        series={assets.stocks.map(stock => stock.shares * stock.price)}
                        type="pie"
                        width="500"
                    />
                    <AssetCardList assets={assets} className="asset-table" />

                    <Modal
                        show={showOrderForm}
                        onHide={handleModalClose}>
                        <Modal.Body>
                            <div>
                                {selectedStock
                                    ? <OrderForm onSubmissionFinished={onSubmissionFinished} symbol={selectedStock.ticker} />
                                    : <OrderForm onSubmissionFinished={onSubmissionFinished} />
                                }
                            </div>
                        </Modal.Body>
                    </Modal>
                </div>
                <button onClick={onOrderClicked}>Buy/Sell</button>
                {assets && <div>User cash: {assets.cash}</div>}
            </div>
        )
    }
}

export default Assets