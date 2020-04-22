import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import assetsService from '../../../services/asset'
import { setAssets } from '../../../reducers/assets'
import { setSettings } from '../../../reducers/settings'

import './AssetsPage.css'

import { ReactComponent as Spinner } from '../../../Assets/spinner.svg'

import AssetTable from '../../Content/AssetTable/AssetTable'
import LineChart from '../../Content/Charts/LineChart/LineChart'
import PieChart from '../../Content/Charts/PieChart/PieChart'
import ButtonBox from '../../Content/ButtonBox/ButtonBox'

import ModalOrderForm from '../../Forms/OrderForm/ModalOrderForm'
import ModalAllocationForm from '../../Forms/AllocationForm/ModalAllocationForm'
import ModalCashForm from '../../Forms/CashForm/ModalCashForm'

import CashForm from '../../Forms/CashForm/CashForm'

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
        setShowCashForm(true)
    }

    const onFormSubmit = () => {
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

    const tableRowClicked = (stock) => {
        return (() => {
            setSelectedStock(stock)
            setShowOrderForm(true)
        })
    }

    useEffect(() => {
        (async function () {
            try {
                const assets = await assetsService.getAssets()
                dispatch(setAssets(assets))
                setPageIsLoading(false)

                const settings = await assetsService.getSettings()
                dispatch(setSettings(settings))
            } catch (error) {
                console.log('I caught', error)
            }
        })()
    }, [dispatch])

    if (pageIsLoading) {
        return <Spinner className="spinner" />
    } else {
        return (
            <div className="assets-page">
                <ModalOrderForm
                    showForm={showOrderForm}
                    handleClose={handleModalClose}
                    onFormSubmit={onFormSubmit}
                    selectedStock={selectedStock} />
                <ModalAllocationForm
                    showForm={showAllocationForm}
                    handleClose={handleModalClose}
                    onFormSubmit={onFormSubmit}
                    stocks={assets.stocks}
                />
                <CashForm
                    show={showCashForm}
                    onHide={handleModalClose}
                    onFormSubmit={onFormSubmit}
                    currentCash={assets.cash} 
                    />
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
                                        tableRowClicked={tableRowClicked}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default Assets