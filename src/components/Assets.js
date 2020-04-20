import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import assetsService from '../services/asset'
import { setAssets } from '../reducers/assets'
import { setSettings } from '../reducers/settings'
import PieChart from './PieChart'
import { Modal } from 'react-bootstrap'
import OrderForm from './OrderForm/OrderForm'
import AssetTable from './AssetTable'
import { ReactComponent as Spinner } from '../Assets/spinner.svg'
import LineChart from './LineChart'
import ButtonBox from './ButtonBox'
import AllocationForm from './AllocationForm'
import CashForm from './CashForm'

const Assets = () => {
    const [selectedStock, setSelectedStock] = useState(null)
    const [showOrderForm, setShowOrderForm] = useState(false)
    const [showCashForm, setShowCashForm] = useState(false)
    const [showAllocationForm, setShowAllocationForm] = useState(false)
    const [pageIsLoading, setPageIsLoading] = useState(true)

    const assets = useSelector(state => state.assets)

    const dispatch = useDispatch()

    const handleModalClose = () => {
        setShowOrderForm(false)
        setSelectedStock(false)
        setShowAllocationForm(false)
        setShowCashForm(false)
    }
    const chartClick = (event, chartContext, config) => {
        setSelectedStock(assets.stocks[config.dataPointIndex])
    }

    const onOrderClicked = (event) => {
        setShowOrderForm(true)
    }

    const onAllocationClicked = (event) => {
        setShowAllocationForm(true)
    }

    const onCashClicked = (event) => {
        console.log('Cash Clicked')
        setShowCashForm(true)
    }

    const onSubmissionFinished = () => {
        updateAssets()
        setShowOrderForm(false)
        setShowAllocationForm(false)
        setShowCashForm(false)
    }

    const updateAssets = () => {
        assetsService.getAssets().then(
            assets => {
                dispatch(setAssets(assets))
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
        assetsService.getSettings().then(
            settings => {
                dispatch(setSettings(settings))
            }
        )
    }, [dispatch])

    if (pageIsLoading) {
        return <Spinner className="spinner" />
    } else {
        return (
            <div className="assets-page">
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

                <Modal
                    show={showAllocationForm}
                    onHide={handleModalClose}
                    className="form-modal"

                >
                    <Modal.Body className="form-modal">
                        <AllocationForm
                            stocks={assets.stocks}
                            onSubmissionFinished={onSubmissionFinished}

                        />
                    </Modal.Body>
                </Modal>

                <Modal
                    show={showCashForm}
                    onHide={handleModalClose}
                    className="form-modal"
                    onSubmissionFinished={onSubmissionFinished}
                >
                    <Modal.Body className="form-modal">
                        <CashForm
                            currentCash={assets.cash}
                            onSubmissionFinished={onSubmissionFinished}
                        />
                    </Modal.Body>
                </Modal>



                <div id="asset-page-container">
                    <div >
                        <div className="row top-row">
                            <div className="col-lg-5 col-md-12">
                                <PieChart assets={assets} chartClick={chartClick} />
                            </div>
                            <div className="col-lg-7  col-md-12 line">
                                <LineChart stock={selectedStock} />
                            </div>
                        </div>
                        <div className="row bottom-row">
                            <div className="col-lg-5  col-md-12 order">
                                <ButtonBox
                                    onOrderClicked={onOrderClicked}
                                    onAllocationClicked={onAllocationClicked}
                                    onCashClicked={onCashClicked}
                                />
                            </div>
                            <div className="col-lg-7  col-md-12  stocks">
                                <div className="box my-custom-scrollbar">
                                    <AssetTable
                                        assets={assets}
                                        className="asset-table"
                                       />
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