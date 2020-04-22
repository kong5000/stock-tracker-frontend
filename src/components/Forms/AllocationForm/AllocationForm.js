import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAssets } from '../../../reducers/assets'
import { setSettings } from '../../../reducers/settings'
import assetsService from '../../../services/asset'
import '../forms.css'
import Button from 'react-bootstrap/Button'
import withModal from '../../HOC/withModal'
import PropTypes from 'prop-types'

const AllocationForm = ({ stocks, onFormSubmit }) => {
    const [showError, setShowError] = useState(null)
    const threshold = useSelector(state => state.settings.balanceThreshold)
    const [tolerance, setTolerance] = useState(threshold)

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
            const newSettings = await assetsService.updateThreshold(tolerance)
            dispatch(setSettings(newSettings))

            const update = await assetsService.updateAllocations(stocksToUpdate)
            dispatch(setAssets(update))

            onFormSubmit()
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
            <i class="fas fa-times-circle close-btn" onClick={onFormSubmit}></i>
            <div className="py-3 text-center">
                <i className="fas fa-seedling fa-3x icon"></i>
                <h4 className="mb-1">Asset Allocation</h4>
            </div>

            <form onSubmit={onSubmit} className="allocation-form">
                <table className="allocation-form mb-3">
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
                    </tbody>

                </table>
                <div className>
                    <h4>Tolerance</h4>
                    <div clasName="row">
                        <div className="col-12">
                            Current +-{threshold}%
                        </div>
                        <div className="col-12">
                            <input
                                className="allocation-input"
                                type="number"
                                min="0"
                                max="100"
                                value={tolerance}
                                onChange={onToleranceChange}
                            />
                        </div>
                    </div>
                </div>
                {errorMessage}
                <Button type="allocation-button">Update</Button>
            </form>
        </div>
    )
}

AllocationForm.propTypes = {
    onFormSubmit: PropTypes.func.isRequired
}

export default withModal(AllocationForm)