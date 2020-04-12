import React, { useState } from 'react'

const StockWeightSelector = ({ stock }) => {
    const [weight, setWeight] = useState(stock.targetWeight)
    const onSubmit = (event) => {
        event.preventDefault()
        //Make a post update request for the stock
        console.log('Submit', weight)
    }

    const onInputChange = (event) => setWeight(event.target.value)


    return (
        <form onSubmit={onSubmit}>
            <div>{stock.ticker}</div>
            <div>{stock.currentWeight}</div>
            <div>{stock.targetWeight}</div>
            <input onChange={onInputChange} value={weight} type="number" />
            <button type="submit">Update</button>
        </form>
    )
}

export default StockWeightSelector