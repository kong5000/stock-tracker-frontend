import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setAssets } from '../../../reducers/assets'
import assetsService from '../../../services/asset'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import '../forms.css'
import NYSE from './NYSE_SYMBOLS.json'

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
            props.onSubmissionFinished()
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
            props.onSubmissionFinished()
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
        <div className="form-container">
            <i class="fas fa-times-circle close-btn" onClick={props.onSubmissionFinished}></i>
            <div className="py-3 text-center">
                <i className="fas fa-seedling fa-3x icon"></i>
            </div>
            <div className="text-center">
                <h4 className="mb-1">Order Info</h4>
                <form onSubmit={onOrderSubmit}>
                    <div className="row">
                        <div className="col-md-6 mb-1 form-input-container">
                            <label htmlFor="symbol">Ticker Symbol</label>
                            <Autocomplete
                            value={symbol}
                                freeSolo
                                className="symbol-input"
                                options={filteredSymbols}
                                autoHighlight
                                getOptionLabel={(option) => {
                                    if (option.Name) {
                                        return (option.Symbol)
                                    }
                                    return symbol
                                }}
                                style={{
                                    width: 200,
                                    margin: "auto",
                                    borderRadius: 5
                                }}
                                renderOption={(option) => {
                                    if (option.Name) {
                                        return (
                                            <div>
                                                <div>{(option.Symbol)}</div>
                                                <div className="company-name"> {option.Name}</div>
                                            </div>
                                        )
                                    }
                                    return (null)
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        value={symbol}
                  
                                        onChange={onSymbolChange}
                                        {...params}
                                        variant="outlined"
                                    />
                                )}
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

export default OrderForm