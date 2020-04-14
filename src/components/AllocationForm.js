import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { setAssets } from '../reducers/assets'
import assetsService from '../services/asset'
import '../styles/orderform.css'
import './StockWeightSelector'

const AllocationForm = ({ stocks }) => {
    const onSubmit = (event) => {
        event.preventDefault()
        const totalAllocation = inputRefs.current.reduce((total, input) => total + Number(input.value), 0)
        if (totalAllocation > 100) {
            //Make an error message, total allocation is greater than 100%
        } else {
            const updatedStocks = [...stocks]
            for (let i = 0; i < updatedStocks.length; i++) {
                updatedStocks[i].targetWeight = inputRefs.current[i].value / 100
            }
            assetsService.updateAllocations(updatedStocks)
        }
    }

    const inputRefs = useRef([])

    return (
        <div className="allocation-form">
            <form onSubmit={onSubmit}>
                <h2>Set Allocations</h2>
                <div className="row">
                    <div className="col-md-4">Symbol</div>
                    <div className="col-md-4">Current</div>
                    <div className="col-md-4">New (%)</div>
                </div>
                {stocks.map((stock, index) =>
                    <div className="row">
                        <div className="col-md-4">{stock.ticker}</div>
                        <div className="col-md-4">{Math.floor(stock.targetWeight * 100) + '%'}</div>
                        <input
                            className="col-md-4"
                            ref={(inputElement) => inputRefs.current[index] = inputElement}
                            type="number"
                            min="0"
                            max="100"
                            defaultValue={stock.targetWeight * 100}
                        />
                    </div>
                )}
                <button type="submit">Update</button>
            </form>
        </div >
    )
}

export default AllocationForm