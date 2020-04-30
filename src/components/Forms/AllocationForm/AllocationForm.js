import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAssets } from '../../../reducers/assets'
import { setSettings } from '../../../reducers/settings'
import assetsService from '../../../services/asset'
import '../forms.css'
import Button from 'react-bootstrap/Button'
import withModal from '../../Modal/withModal'
import PropTypes from 'prop-types'
import AllocationTable from './AllocationTable/AllocationTable'
import ToleranceSettings from './ToleranceSettings/ToleranceSettings'

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

    let errorMessage = <div className="error-message-invisible">Placeholder</div>
    if (showError) {
        errorMessage = <div className="error-message">Total allocation must be less than 100%</div>
    }

    return (
        <div className="form-container">
            <div className="form-header">
                <i class="fas fa-times-circle close-btn" onClick={onFormSubmit}></i>
                <div className="py-3 text-center">
                    <i className="fas fa-seedling fa-3x icon"></i>
                    <h2 className="mb-1">Asset Allocation</h2>
                </div>
            </div>
            <form onSubmit={onSubmit} className="form-content allocation-form">
                <AllocationTable stocks={stocks} inputRefs={inputRefs} />
                <ToleranceSettings
                    tolerance={tolerance}
                    threshold={threshold}
                    onToleranceChange={onToleranceChange}
                />
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