import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setAssets } from '../reducers/assets'
import assetsService from '../services/asset'
import '../styles/orderform.css'
import './StockWeightSelector'
import Button from 'react-bootstrap/Button'

const AllocationForm = ({ stocks }) => {
    const [showError, setShowError] = useState(null)

    const dispatch = useDispatch()
    
    const onSubmit = async (event) => {
        event.preventDefault()
        const totalAllocation = inputRefs.current.reduce((total, input) => total + Number(input.value), 0)
        if (totalAllocation > 100) {
            setShowError(true)
            setTimeout(() => {
                setShowError(false)
            }, 3000)
        } else {
            const stocksToUpdate = [...stocks]
            for (let i = 0; i < stocksToUpdate.length; i++) {
                stocksToUpdate[i].targetWeight = inputRefs.current[i].value / 100
            }
            const update = await assetsService.updateAllocations(stocksToUpdate)
            dispatch(setAssets(update))
        }
    }

    const inputRefs = useRef([])

    const formatStockWeight = (stock) => {
        if (stock.targetWeight) {
            return Math.floor(stock.targetWeight * 100) + '%'
        }
        return 'Not Set'
    }

    if (stocks.length <= 0) {
        return (<div>No Stocks Available</div>)
    }

    let errorMessage = <div className="error-message-invisible">Placeholder</div>
    if(showError){
        errorMessage = <div className="error-message">Total allocation must be less than 100%</div>
    }

    return (
        <form onSubmit={onSubmit} className="allocation-form">
            <table className="allocation-form">
                <tbody>
                    <tr>
                        <th className="info-header">Symbol</th>
                        <th className="info-header">Current Target</th>
                        <th className="info-header">New Target %</th>
                    </tr>
                    {stocks.map((stock, index) =>
                        <tr className="">
                            <td>
                                <div className="">{stock.ticker}</div>
                            </td>
                            <td>
                                <div className="">{formatStockWeight(stock)}</div>
                            </td>
                            <td>
                                <input
                                    className="allocation-input"
                                    ref={(inputElement) => inputRefs.current[index] = inputElement}
                                    type="number"
                                    min="0"
                                    max="100"
                                    defaultValue={stock.targetWeight * 100}
                                />
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {errorMessage}
            <Button type="allocation-button">Update</Button>
        </form>
    )
}

export default AllocationForm