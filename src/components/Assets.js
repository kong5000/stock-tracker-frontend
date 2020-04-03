import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import assetsService from '../services/asset'
import { setAssets } from '../reducers/assets'

const Assets = () => {
    const assets = useSelector(state => state.assets)

    const dispatch = useDispatch()

    useEffect(() => {
        assetsService.getAssets().then(
            assets => {
                dispatch(setAssets(assets))
            }
        )
    }, [dispatch])

    if (assets) {
        return (
            <div>
                {assets.stocks.map(stock => <div key={stock.ticker}>{stock.ticker} {stock.shares} {stock.price}</div>)}
            </div>
        )
    } else {
        return (null)
    }
}

export default Assets