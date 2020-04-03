 import React, {useState} from 'react'
 import { useDispatch } from 'react-redux'
 import { buyAsset } from '../reducers/assets'
 import assetsService from '../services/asset'

const OrderForm = () => {
    const [symbol, setSymbol] = useState('')
    const [price, setPrice] = useState(0)
    const [shares, setShares] = useState(0)

    const dispatch = useDispatch()

    const clearForm = () => {
        setPrice(0)
        setShares(0)
        setSymbol('')
    }

    const onSubmitBuy = async (event) => {
        event.preventDefault()
        try{
            const stock = {
                ticker: symbol,
                price,
                shares,
                name: 'Temporary'
            }
            await assetsService.addStock(stock)
            dispatch(buyAsset(
                stock
            ))
        }catch(exception){
            console.log(exception)
        }

        clearForm()
    }

    const onSubmitSell = (event) => {
        event.preventDefault()
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

    return(
        <form>
            <label for="symbol">ticker symbol</label>
            <input name="symbol"type="text" value={symbol} onChange={onSymbolChange}></input>
            <label for="shares">shares</label>
            <input name="shares"type="text" value={shares} onChange={onSharesChange}></input>
            <label for="price">price</label>
            <input name="price"type="text" value={price} onChange={onPriceChange}></input>

            <button onClick={onSubmitBuy}>buy</button>
            <button onClick={onSubmitSell}>sell</button>
        </form>
    )
}

export default OrderForm