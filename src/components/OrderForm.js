import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setAssets } from '../reducers/assets'
import assetsService from '../services/asset'
import '../styles/orderform.css'

const OrderForm = (props) => {
    const [symbol, setSymbol] = useState('')
    const [assetName, setAssetName] = useState('')
    const [price, setPrice] = useState('')
    const [shares, setShares] = useState('')
    const [orderType, setOrderType] = useState('Buy')
    const [useCash, setUseCash] = useState(true)

    const dispatch = useDispatch()

    useEffect( () => {
        if(props.symbol){
            setSymbol(props.symbol)
        }
    }, [props.symbol])

    const clearForm = () => {
        setPrice(0)
        setShares(0)
        setSymbol('')
        setAssetName('')
    }

    const toggleUseCash = () => {
        setUseCash(!useCash)
    }

    const onOrderSubmit = async (event) => {
        event.preventDefault()
        if (orderType === 'Buy') {
            await submitBuyOrder()
        } else {
            await submitSellOrder()
        }
        props.onSubmissionFinished()
        clearForm()
    }

    const submitBuyOrder = async () => {
        try {
            const order = {
                ticker: symbol,
                price,
                shares,
                name: assetName,
                useCash
            }
            const updatedAssets = await assetsService.addStock(order)
            dispatch(setAssets(
                updatedAssets
            ))
        } catch (exception) {
            console.log(exception)
        }
    }

    const submitSellOrder = async () => {
        try {
            const order = {
                ticker: symbol,
                price,
                shares,
                useCash
            }
            const updatedPortfolio = await assetsService.sellStock(order)
            dispatch(setAssets(
                updatedPortfolio
            ))
        } catch (exception) {
            console.log(exception)
        }
    }

    const onSymbolChange = (event) => {
        setSymbol(event.target.value)
    }
    const onSharesChange = (event) => {
        setShares(event.target.value)
    }
    const onPriceChange = (event) => {
        setPrice(event.target.value)
    }

    const onAssetNameChange = (event) => {
        setAssetName(event.target.value)
    }

    return (
        <div className="container">
            <div className="py-3 text-center">
                <i className="fas fa-seedling fa-5x icon"></i>
            </div>
            <div className="text-center">
                <h4 className="mb-3">Order Info</h4>
                <form onSubmit={onOrderSubmit}>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="symbol">Ticker Symbol</label>
                            <input
                                type="text"
                                className="form-control"
                                id="symbol"
                                required
                                value={symbol}
                                onChange={onSymbolChange}
                            />
                            <div className="invalid-feedback">
                                A symbol is required
                                </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="assetName">Asset name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="assetName"
                                required
                                value={assetName}
                                onChange={onAssetNameChange}
                            />
                            <div className="invalid-feedback">
                                A an asset name is required
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="shareQuantity">Share Quantity</label>
                            <input
                                type="number"
                                min="0"
                                className="form-control"
                                id="shareQuantity"
                                required
                                value={shares}
                                onChange={onSharesChange}
                            />
                            <div className="invalid-feedback">
                                Must buy or sell at least one share
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="price">Price</label>
                            <input
                                type="number"
                                step="0.0001"
                                min="0"
                                className="form-control"
                                id="price"
                                required
                                value={price}
                                onChange={onPriceChange}
                            />
                        </div>
                    </div>


                    <hr className="mb-4" />
                    <h4 className="mb-3">Order Type</h4>
                    <div className="d-block my-3">
                        <div className="custom-control custom-radio">
                            <input
                                id="buyOrder"
                                name="orderType"
                                type="radio"
                                className="custom-control-input"
                                checked={orderType === 'Buy'}
                                onChange={() => setOrderType('Buy')}
                                required
                            />
                            <label className="custom-control-label" htmlFor="buyOrder">Buy</label>
                        </div>
                        <div className="custom-control custom-radio">
                            <input
                                id="sellOrder"
                                name="orderType"
                                type="radio"
                                className="custom-control-input"
                                required
                                checked={orderType === 'Sell'}
                                onChange={() => setOrderType('Sell')}
                            />
                            <label className="custom-control-label" htmlFor="sellOrder">Sell</label>
                        </div>
                    </div>
                    <div className="custom-control custom-checkbox">
                        <input
                            type="checkbox"
                            className="custom-control-input"
                            id="useCash"
                            checked={useCash}
                            onChange={toggleUseCash}
                        />
                        <hr className="mb-4" />
                        {orderType === 'Buy' && <label className="custom-control-label" htmlFor="useCash">Use portfolio cash to purchase</label>}
                        {orderType === 'Sell' && <label className="custom-control-label" htmlFor="useCash">Add sell value to portfolio cash</label>}
                    </div>
                    <hr className="mb-4" />
                    <button className="btn btn-primary btn-lg btn-block" type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default OrderForm