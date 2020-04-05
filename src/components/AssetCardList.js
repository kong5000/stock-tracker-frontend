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
    return (
        <ul className="list-group mb-3">
            {assets && assets.stocks.map(stock => <li key={stock.ticker} className="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                    <h6 className="my-0">{stock.ticker}</h6>
                    <small className="text-muted">{stock.name}</small>
                </div>
                <span className="text-muted">{stock.price * stock.shares}</span>
                <span className="text-muted">{getProfitPercentage(stock)} %</span>
                <div>basis{stock.costBasis}</div>
                <div>price{stock.price}</div>
                <div>share{stock.shares}</div>
            </li>)}
        </ul>
    )
}

export default AssetCardList