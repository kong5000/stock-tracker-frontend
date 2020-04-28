import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setAssets } from '../../../reducers/assets'
import assetsService from '../../../services/asset'
import '../forms.css'
import NYSE from './NYSE_SYMBOLS.json'
import withModal from '../../HOC/withModal'
import PropTypes from 'prop-types'
import SymbolAutoComplete from './SymbolAutoComplete/SymbolAutoComplete'

const OrderForm = (props) => {
    const [symbol, setSymbol] = useState('')
    const [assetName, setAssetName] = useState('')
    const [price, setPrice] = useState('')
    const [shares, setShares] = useState('')
    const [orderType, setOrderType] = useState('Buy')
    const [useCash, setUseCash] = useState(false)
    const [filteredSymbols, setFilteredSymbols] = useState([])
    const [showError, setShowError] = useState(false)

    const dispatch = useDispatch()

    useEffect(() =>{
        if(props.selectedStock){
            setSymbol(props.selectedStock.ticker)
            setPrice(props.selectedStock.price)
            setAssetName(props.selectedStock.name)
            setShares(props.selectedStock.shares)
        }
    },[props.selectedStock])

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
    }

    const submitBuyOrder = async () => {
        try {
            const order = {
                ticker: symbol,
                price,
                shares,
                name: assetName,
                useCash,
            }
            const updatedAssets = await assetsService.addStock(order)
            dispatch(setAssets(
                updatedAssets
            ))
            props.onFormSubmit()
            clearForm()
        } catch (error) {
            console.log(error)
            setShowError(true)
            setTimeout(() => {
                setShowError(false)
            }, 3000)
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
            props.onFormSubmit()
            clearForm()
        } catch (error) {
            console.log(error)
            setShowError(true)
            setTimeout(() => {
                setShowError(false)
            }, 3000)
        }
    }

    const onSymbolChange = (event) => {
        const symbolString = event.target.value.toUpperCase()
        setSymbol(symbolString)
        if (symbolString.length > 1) {
            setFilteredSymbols(NYSE.filter((stock) => stock.Symbol.includes(symbolString)))
        }
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

    const onOrderTypeChange = () => {
        toggleUseCash()
        if (orderType === 'Buy') {
            setOrderType('Sell')
        } else {
            setOrderType('Buy')
        }
    }

    let errorMessage = <div className="error-message-invisible">Placeholder</div>
    if (showError) {
        errorMessage = <div className="error-message">Insufficient funds</div>
    }

    return (
        <div className="form-container" id="order-form-container">
            <i class="fas fa-times-circle close-btn" onClick={props.onFormSubmit}></i>
            <div className="py-1 text-center">
                <i className="fas fa-seedling fa-3x icon"></i>
            </div>
            <div className="text-center">
                <h2 className="mb-2">Stock Order</h2>
                <form onSubmit={onOrderSubmit}>
                    <div className="row">
                        <div className="col-md-6 mb-1 form-input-container">
                            <label htmlFor="symbol">Ticker Symbol</label>
                            <SymbolAutoComplete
                                symbol={symbol}
                                onSymbolChange={onSymbolChange}
                                symbols={filteredSymbols}
                            />
                            <div className="invalid-feedback">
                                A symbol is required
                                </div>
                        </div>
                        <div className="col-md-6 mb-1 form-input-container">
                            <label htmlFor="assetName">Name (optional)</label>
                            <input
                                type="text"
                                className="form-control"
                                id="assetName"
                                value={assetName}
                                onChange={onAssetNameChange}
                                maxLength= '10'
                            />
                            <div className="invalid-feedback">
                                A an asset name is required
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-md-6 mb-1 form-input-container">
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
                        <div className="col-md-6 mb-1 form-input-container">
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
                    <div className="row">
                        <div className="col-md-6 mb-1">
                            <div className="invalid-feedback">
                                Must buy or sell at least one share
                            </div>
                        </div>
                    </div>
                    <div className="d-block my-3">
                        <div className="custom-control custom-radio">
                            <input
                                id="buyOrder"
                                name="orderType"
                                type="radio"
                                className="custom-control-input"
                                checked={orderType === 'Buy'}
                                onChange={onOrderTypeChange}
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
                                onChange={onOrderTypeChange}
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
                        {orderType === 'Buy' && <label className="custom-control-label" htmlFor="useCash">Use portfolio cash to purchase</label>}
                        {orderType === 'Sell' && <label className="custom-control-label" htmlFor="useCash">Add sell value to portfolio cash</label>}
                    </div>
                    {errorMessage}
                    <button className="btn btn-primary btn-lg btn-block submit-btn" type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

OrderForm.propTypes = {
    onFormSubmit: PropTypes.func.isRequired
}

export default withModal(OrderForm)