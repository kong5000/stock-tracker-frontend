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
                dispatch(setAssets(assets.stocks))
            }
        )
    }, [dispatch])

    if (assets.length > 0) {
        return (
            <div>
                {assets.map(stock => <div key={stock.ticker}>{stock.ticker} {stock.shares} {stock.price}</div>)}
            </div>
        )
    } else {
        return (null)
    }
}

export default Assets