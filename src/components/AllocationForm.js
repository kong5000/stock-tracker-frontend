import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { setAssets } from '../reducers/assets'
import assetsService from '../services/asset'
import '../styles/orderform.css'
import './StockWeightSelector'

const AllocationForm = ({ stocks }) => {
    const onSubmit = (event) => {
        event.preventDefault()
        const totalAllocation = inputRefs.current.reduce((total, input) => total + Number(input.value), 0)
        if(totalAllocation > 100){
            //Make an error message, total allocation is greater than 100%
        }else{
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
                {stocks.map((stock, index) =>
                    <div>
                        <div>{stock.ticker}</div>
                        <div>{stock.currentWeight}</div>
                        <div>{stock.targetWeight}</div>
                        <input
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
        </div>
    )
}

export default AllocationForm