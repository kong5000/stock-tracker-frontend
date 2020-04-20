import React from 'react'
import { useSelector } from 'react-redux'

const AssetTable = (props) => {
    const assets = props.assets
    const settings = useSelector(state => state.settings)

    const getProfitPercentage = (stock) => {
        let ratio = stock.price / stock.costBasis
        if (stock.price > stock.costBasis) {
            return <div className="profit-text">{((ratio - 1) * 100).toFixed(1) + '%'}</div>
        } else {
            return <div className="loss-text">{((1 - ratio) * 100).toFixed(1) + '%'}</div>
        }
    }
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
        const threshold = 0.05
        const weightString = `${(stock.currentWeight * 100).toFixed(1)}%`
        if (stock.targetWeight) {
            if (Math.abs(stock.currentWeight - stock.targetWeight) > threshold) {
                return <div className="loss-text">{weightString}</div>
            }
        }
        return <div className="profit-text">{weightString}</div>
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
            if (error > 0) {
                return <td className="profit-text">{error}</td>
            }
            return <td className="loss-text">{error}</td>
        }
        return '--'
    }

    return (
        <div>
            <div>Cash Balance: ${assets.cash}  threshold: +-{settings.balanceThreshold}%</div>
            <table className="stock-table">
                <tbody>
                    <tr>
                        <th className="info-header">Symbol</th>
                        <th className="info-header">Value</th>
                        <th className="info-header">Profit</th>
                        <th className="info-header">Target</th>
                        <th className="info-header">Current</th>
                        <th className="info-header">Error</th>
                    </tr>
                    {assets && assets.stocks.map(stock =>
                        <tr key={stock.ticker}>
                            <td>
                                <div>
                                    <div>{stock.ticker}</div>
                                    <small>{stock.name}</small>
                                </div>
                            </td>
                            <td><span >${(stock.price * stock.shares).toFixed(2)}</span></td>
                            <td>{getProfitAbsolute(stock)}</td>
                            <td>{getTarget(stock)}</td>
                            <td>{getStockWeight(stock)}</td>
                            <td>{getError(stock)}</td>
                        </tr>)}
                </tbody>
            </table>
        </div>
    )
}

export default AssetTable