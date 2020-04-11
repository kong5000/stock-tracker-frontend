import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import assetsService from '../services/asset'
import { setAssets } from '../reducers/assets'
import PieChart from './PieChart'
import { Modal } from 'react-bootstrap'
import OrderForm from './OrderForm'
import AssetTable from './AssetTable'
import { ReactComponent as Spinner } from '../Assets/spinner.svg'
import LineChart from './LineChart'
import ButtonBox from './ButtonBox'


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
                                <PieChart assets={assets} chartClick={chartClick} />
                            </div>
                            <div className="col-lg-7  col-md-12 line">
                                <LineChart stock={selectedStock} />
                            </div>
                        </div>
                        <div className="row bottom-row">
                            <div className="col-lg-5  col-md-12 order">
                                <ButtonBox onOrderClicked={onOrderClicked} />
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