import React from 'react'


const AssetCardList = (props) => {
    const assets = props.assets
    const getProfitPercentage = (stock) => {
        let ratio = stock.price / stock.costBasis
        if (stock.price > stock.costBasis) {
            return <div className="profit-percent">{((ratio - 1) * 100).toFixed(1) + '%'}</div>
        } else {
            return <div className="loss-percent">{((1 - ratio) * 100).toFixed(1) + '%'}</div>
        }
    }
    const getProfitAbsolute = (stock) => {
        let profit = stock.shares * (stock.price - stock.costBasis)
        if (profit > 0) {
            return <div className="profit-percent">{`$${profit.toFixed(2)}`}</div>
        } else {
            profit *= -1
            return <div className="loss-percent">{`$${profit.toFixed(2)}`}</div>
        }
    }
    const getStockWeight = (stock) => {
        const threshold = 5
        const weightString = `${stock.currentWeight.toFixed(3) * 100}%`
        if(stock.targetWeight){
            if(Math.abs(stock.currentWeight - stock.targetWeight) > threshold){
                return <div className="loss-percent">{weightString}</div>
            }
        }
        return <div className="profit-percent">{weightString}</div>
    }

    return (
        <table className="stock-table">
            <tbody>
                <tr>
                    <th className="info-header">Symbol</th>
                    <th className="info-header">Value</th>
                    <th className="info-header">Profit %</th>
                    <th className="info-header">Latest Price</th>
                    <th className="info-header">Shares</th>
                    <th className="info-header">Weight</th>
                    <th className="info-header">Total Profit/Loss</th>
                </tr>
                {assets && assets.stocks.map(stock =>
                    <tr key={stock.ticker}>
                        <td>
                            <div>
                                <h6 className="my-0">{stock.ticker}</h6>
                                <small className="text-muted">{stock.name}</small>
                            </div>
                        </td>
                        <td>
                            <span className="text-muted">${stock.price * stock.shares}</span>
                        </td>
                        <td>
                            <span className="text-muted">{getProfitPercentage(stock)}</span>
                        </td>
                        <td>
                            {stock.price}
                        </td>
                        <td>
                            {stock.shares}
                        </td>
                        <td>
                            {getStockWeight(stock)}
                        </td>
                        <td>
                            {getProfitAbsolute(stock)}
                        </td>
                    </tr>)}
            </tbody>
        </table>
    )
}

export default AssetCardList