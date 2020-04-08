import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import assetsService from '../services/asset'
import { setAssets } from '../reducers/assets'
import Chart from "react-apexcharts"
import { Modal } from 'react-bootstrap'
import OrderForm from './OrderForm'
import AssetTable from './AssetTable'
import { ReactComponent as Spinner } from '../Assets/spinner.svg'
import Button from 'react-bootstrap/Button'
import LineChart from './LineChart'

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

                <div id="asset-page-container">
                    <div >
                        <div className="row top-row">
                            <div className="col-lg-5 col-md-12">
                                <div className="box">
                                    <Chart className="pie-chart"
                                        options={generateChartOptions()}
                                        series={assets.stocks.map(stock => stock.shares * stock.price)}
                                        type="pie"
                                        height='100%'
                                    />
                                </div>
                            </div>
                            <div className="col-lg-7  col-md-12 line">
                                <div className="box">
                                    <LineChart stock={selectedStock}/>
                                </div>
                            </div>
                        </div>
                        <div className="row bottom-row">
                            <div className="col-lg-5  col-md-12 order">
                                <div className="box">
                                    <div className="button-holder">
                                        <div className="row">
                                            <div className="col text-center labeled-font">
                                                <span onClick={onOrderClicked} className="clickable-font">
                                                    <i className="fas fa-cash-register fa-4x"></i>
                                                </span>
                                                <div className="btn-label">Order</div>
                                            </div>
                                            <div className="col text-center labeled-font">
                                                <span onClick={() => { console.log('test') }} className="clickable-font">
                                                    <i className="fas fa-bell fa-4x"></i>
                                                </span>
                                                <div className="btn-label">Set Alerts</div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col text-center labeled-font">
                                                <span onClick={() => { console.log('test') }} className="clickable-font">
                                                    <i className="far fa-money-bill-alt fa-4x"></i>
                                                </span>
                                                <div className="btn-label">Add/Remove Cash</div>
                                            </div>
                                            <div className="col text-center labeled-font">
                                                <span onClick={() => { console.log('test') }} className="clickable-font">
                                                    <i className="fas fa-chart-pie fa-4x"></i>
                                                </span>
                                                <div className="btn-label">Set Target Allocation</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-7  col-md-12  stocks">
                                <div className="box my-custom-scrollbar">
                                    {assets && <div>Cash Balance: {assets.cash}</div>}
                                    <AssetTable assets={assets} className="asset-table" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default Assets