import React from 'react'
import { useSelector } from 'react-redux'
import './AssetTable.css'
import PropTypes from 'prop-types'

const AssetTable = ({ tableRowClicked, assets }) => {
    const settings = useSelector(state => state.settings)
    const threshold = settings.balanceThreshold

    const getProfitAbsolute = (stock) => {
        let profit = stock.shares * (stock.price - stock.costBasis)
        if (profit > 0) {
            return <div className="profit-text">{`$${profit.toFixed(2)}`}</div>
        } else {
            profit *= -1
            return <div className="loss-text">{`$${profit.toFixed(2)}`}</div>
        }
    }
    const getStockWeight = (stock) => {
        const weightString = `${(stock.currentWeight * 100).toFixed(1)}%`
        return <div>{weightString}</div>
    }

    const getTarget = (stock) => {
        if (stock.targetWeight) {
            return `${(stock.targetWeight * 100).toFixed(1)}%`
        }
        return '--'
    }

    const getError = (stock) => {
        if (stock.targetWeight) {
            const error = ((stock.targetWeight - stock.currentWeight) * 100).toFixed(1)
            if (Math.abs(error) > Number(threshold)) {
                return <td className="loss-text">{error}%</td>
            }
            return <td className="profit-text">{error}</td>
        }
        return <td>--</td>
    }

    const outOfBalance = (stock) => {
        if (stock.targetWeight) {
            const error = ((stock.targetWeight - stock.currentWeight) * 100).toFixed(1)
            if (Math.abs(error) > Number(threshold)) {
                return true
            }
        }
        return false
    }

    return (
        <div>
            <table className="stock-table">
                <tbody>
                    <tr id="table-header">
                        <th className="info-header">Symbol</th>
                        <th className="info-header price-header">Current Price</th>
                        <th className="info-header shares-header">Shares</th>
                        <th className="info-header value-header">Value</th>
                        <th className="info-header profit-header">Profit</th>
                        <th className="info-header current-weight-header">Current Weight</th>
                        <th className="info-header target-weight-header">Target Weight</th>
                        <th className="info-header">Error</th>
                    </tr>
                    {assets && assets.stocks.map(stock => {
                        let rowClass = ''
                        if (outOfBalance(stock)) {
                            rowClass = "red-background"
                        }
                        return (
                            <tr key={stock.ticker} className={rowClass} onClick={tableRowClicked(stock)}>
                                <td>
                                    <div>
                                        <div>{stock.ticker}</div>
                                        <small>{stock.name}</small>
                                    </div>
                                </td>
                                <td className="price">${Number(stock.price).toFixed(2)}</td>
                                <td className="shares">{stock.shares}</td>
                                <td className="value"><span >${(stock.price * stock.shares).toFixed(2)}</span></td>
                                <td className="profit">{getProfitAbsolute(stock)}</td>
                                <td className="current-weight">{getStockWeight(stock)}</td>
                                <td className="target-weight">{getTarget(stock)}</td>
                                {getError(stock)}
                            </tr>
                        )
                    }
                    )}
                </tbody>
            </table>
        </div>
    )
}

AssetTable.propTypes = {
    assets: PropTypes.object,
    tableRowClicked: PropTypes.func
}

export default AssetTable