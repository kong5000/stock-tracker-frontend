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
        const delta = stock.shares * (stock.price - stock.costBasis)
        if(delta > 0){
            return <div className="profit-percent">{`$${delta}`}</div>
        }else{
            return <div className="loss-percent">{`$${delta}`}</div>
        }
    }
    return (
            <table className="stock-table">
                <tr>
                    <th className="info-header">Symbol</th>
                    <th className="info-header">Shares</th>
                    <th className="info-header">Avg Buy Price</th>
                    <th className="info-header">Latest Price</th>
                    <th>Value</th>
                    <th>Weight</th>
                    <th>Profit/Loss</th>
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
                            <div>{stock.shares}</div>
                        </td>
                        <td>
                            100%
                        </td>
                        <td>
                             {getProfitAbsolute(stock)}
                        </td>
                    </tr>)}
            </table>
    )
}

export default AssetCardList