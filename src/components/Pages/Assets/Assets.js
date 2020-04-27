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
import Sidebar from '../../Navigation/Sidebar/Sidebar'

import CashForm from '../../Forms/CashForm/CashForm'
import AllocationForm from '../../Forms/AllocationForm/AllocationForm'
import OrderForm from '../../Forms/OrderForm/OrderForm'
import SettingsForm from '../../Forms/SettingsForm/SettingsForm'

const Assets = () => {
    const [selectedStock, setSelectedStock] = useState(null)
    const [showOrderForm, setShowOrderForm] = useState(false)
    const [showCashForm, setShowCashForm] = useState(false)
    const [showSettingsForm, setShowSettingsForm] = useState(false)
    const [showAllocationForm, setShowAllocationForm] = useState(false)
    const [pageIsLoading, setPageIsLoading] = useState(true)

    const assets = useSelector(state => state.assets)
    const userSettings = useSelector(state => state.settings)

    const dispatch = useDispatch()

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

    const handleModalClose = () => {
        setShowOrderForm(false)
        setShowAllocationForm(false)
        setShowCashForm(false)
        setShowSettingsForm(false)
    }

    const onOrderClicked = () => setShowOrderForm(true)
    const onAllocationClicked = () => setShowAllocationForm(true)
    const onCashClicked = () => setShowCashForm(true)
    const onSettingsClicked = () => setShowSettingsForm(true)

    const chartClick = (event, chartContext, config) => {
        setSelectedStock(assets.stocks[config.dataPointIndex])
    }

    const tableRowClicked = (stock) => {
        return (() => {
            setSelectedStock(stock)
            setShowOrderForm(true)
        })
    }

    const onFormSubmit = () => {
        updateAssets()
        setShowOrderForm(false)
        setShowAllocationForm(false)
        setShowCashForm(false)
        setShowSettingsForm(false)
    }

    const updateAssets = () => {
        assetsService.getAssets().then(
            assets => {
                dispatch(setAssets(assets))
            }
        )
    }

    const getTotalProfit = (stocks) => {
        return stocks.reduce((totalProfit, stock) => {
            return totalProfit + stock.shares * (stock.price - stock.costBasis)
        }, 0)
    }

    if (pageIsLoading) {
        return <Spinner className="spinner" />
    } else {
        return (
            <div>
                <Sidebar
                    onOrderClicked={onOrderClicked}
                    onAllocationClicked={onAllocationClicked}
                    onCashClicked={onCashClicked}
                    onSettingsClicked={onSettingsClicked}
                    cash={assets.cash}
                    profit={getTotalProfit(assets.stocks)}
                />
                <div className="assets-page">
                    <OrderForm
                        show={showOrderForm}
                        onHide={handleModalClose}
                        onFormSubmit={onFormSubmit}
                        selectedStock={selectedStock} />
                    <AllocationForm
                        show={showAllocationForm}
                        onHide={handleModalClose}
                        onFormSubmit={onFormSubmit}
                        stocks={assets.stocks}
                    />
                    <CashForm
                        show={showCashForm}
                        onHide={handleModalClose}
                        onFormSubmit={onFormSubmit}
                        currentCash={assets.cash}
                    />
                    <SettingsForm
                        show={showSettingsForm}
                        onHide={handleModalClose}
                        onFormSubmit={onFormSubmit}
                        email={userSettings.email}
                        alertFrequency={userSettings.alertFrequency}
                    />
                    <div id="asset-page-container">
                        <div >
                            <div className="row top-row">
                                <div className="col-lg-5 col-md-12 box-container">
                                    <PieChart assets={assets} chartClick={chartClick} />
                                </div>
                                <div className="col-lg-7  col-md-12 box-container">
                                    <LineChart stock={selectedStock} />
                                </div>
                            </div>
                            <div className="row bottom-row">
                                <div className="col-lg-12 col-md-12 stocks">
                                    <div className="box my-custom-scrollbar box-container">
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
            </div>
        )
    }
}

export default Assets