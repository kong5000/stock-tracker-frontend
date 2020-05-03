import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setAssets } from '../../../reducers/assets'
import assetsService from '../../../services/asset'
import PropTypes from 'prop-types'

import Button from 'react-bootstrap/Button'
import withModal from '../../Modal/withModal'

import '../forms.css'


const CashForm = ({ currentCash, onFormSubmit }) => {
    const dispatch = useDispatch()

    const [orderType, setOrderType] = useState('deposit')
    const [cash, setCash] = useState(0)
    const [showError, setShowError] = useState(false)

    const onSubmit = async (event) => {
        event.preventDefault()
        let signedCash = cash;
        if (orderType === "withdraw") {
            signedCash *= -1
        }
        try {
            const updatedUserAssets = await assetsService.updateCash(signedCash)
            dispatch(setAssets(updatedUserAssets))
            onFormSubmit()
        } catch (error) {
            setShowError(true)
            setTimeout(() => {
                setShowError(false)
            }, 3000)
            console.log(error)
        }
    }

    const onOrderTypeChange = () => {
        if (orderType === 'deposit') {
            setOrderType('withdraw')
        } else {
            setOrderType('deposit')
        }
    }

    const onCashChange = (event) => {
        setCash(event.target.value)
    }

    let errorMessage = <div className="error-message-invisible mb-2">Placeholder</div>
    if (showError) {
        errorMessage = <div className="error-message mb-2">Insufficient funds</div>
    }

    return (
        <form onSubmit={onSubmit} className="form-container text-center">
            <i className="fas fa-times-circle close-btn" onClick={onFormSubmit}></i>
            <div className="py-2 text-center">
                <i className="fas fa-seedling fa-3x icon"></i>
            </div>
            <h2 className="mb-3">Portfolio Cash</h2>
            <div className="mb-3">Current Balance: ${Number(currentCash).toFixed(2)}</div>
            <input
                type="number"
                step="0.01"
                min="0"
                className="form-control"
                id="cash"
                required
                value={cash}
                onChange={onCashChange}
            />
            <div className='mt-3 mb-3 radio-container'>
                <div className="custom-control custom-radio">
                    <input
                        id="buyOrder"
                        name="orderType"
                        type="radio"
                        className="custom-control-input"
                        checked={orderType === 'deposit'}
                        onChange={onOrderTypeChange}
                        required
                    />
                    <label className="custom-control-label" htmlFor="buyOrder">Deposit</label>
                </div>
                <div className="custom-control custom-radio">
                    <input
                        id="sellOrder"
                        name="orderType"
                        type="radio"
                        className="custom-control-input"
                        required
                        checked={orderType === 'withdraw'}
                        onChange={onOrderTypeChange}
                    />
                    <label className="custom-control-label" htmlFor="sellOrder">Withdraw</label>
                </div>
            </div>
            {errorMessage}
            <Button type="allocation-button submit">Transact</Button>
        </form>
    )
}

CashForm.propTypes = { 
    currentCash: PropTypes.number.isRequired,
    onFormSubmit: PropTypes.func.isRequired
}

export default withModal(CashForm)