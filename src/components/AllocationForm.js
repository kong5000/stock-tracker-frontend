import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setAssets } from '../reducers/assets'
import assetsService from '../services/asset'
import '../styles/orderform.css'
import './StockWeightSelector'
import Button from 'react-bootstrap/Button'

const AllocationForm = ({ stocks, onSubmissionFinished }) => {
    const [showError, setShowError] = useState(null)
    const [tolerance, setTolerance] = useState(5)

    const inputRefs = useRef([])

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
            onSubmissionFinished()
        }
    }

    const onToleranceChange = (event) => {
        setTolerance(event.target.value)
    }

    const formatStockWeight = (stock) => {
        if (stock.targetWeight) {
            return Math.floor(stock.targetWeight * 100) + '%'
        }
        return 'Not Set'
    }

    let errorMessage = <div className="error-message-invisible">Placeholder</div>
    if (showError) {
        errorMessage = <div className="error-message">Total allocation must be less than 100%</div>
    }


    return (
        <div className="form-container">
            <div className="py-3 text-center">
                <i className="fas fa-seedling fa-3x icon"></i>
                <h4 className="mb-1">Asset Allocation</h4>
            </div>

            <form onSubmit={onSubmit} className="allocation-form">
                <table className="allocation-form">
                    <tbody>
                        <tr>
                            <th className="info-header">Symbol</th>
                            <th className="info-header">Target</th>
                            <th className="info-header">New Target</th>
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
                        <tr className="tolerance-row">
                            <td>
                                <div className="">TOLERANCE</div>
                            </td>
                            <td>
                                <div className="">X%</div>
                            </td>
                            <td>
                                <input
                                    className="allocation-input"
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={tolerance}
                                    onChange={onToleranceChange}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>


                {errorMessage}
                <Button type="allocation-button">Update</Button>
            </form>
        </div>
    )
}

export default AllocationForm