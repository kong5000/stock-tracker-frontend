import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { setAssets } from '../reducers/assets'
import assetsService from '../services/asset'
import '../styles/orderform.css'
import './StockWeightSelector'

const AllocationForm = ({ stocks }) => {
    const onSubmit = (event) => {
        event.preventDefault()
        //Make a post update request for the stock
        console.log(inputRefs.current[0].value)
        const updatedStocks = [...stocks]
        for (let i = 0; i < updatedStocks.length; i++) {
            updatedStocks[i].targetWeight = inputRefs.current[i].value
        }
        assetsService.updateAllocations(updatedStocks)
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
                        <input ref={(inputElement) => inputRefs.current[index] = inputElement} type="number" />
                    </div>
                )}
                <button type="submit">Update</button>
            </form>
        </div>
    )
}

export default AllocationForm