import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setSettings } from '../../../reducers/settings'
import '../forms.css'
import './AlertsForm.css'
import assetsService from '../../../services/asset'
import withModal from '../../HOC/withModal'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import Input from '../Input/Input'

const AlertsForm = (props) => {
    const [email, setEmail] = useState('')
    const [alertFrequency, setAlertFrequency] = useState('never')
    const [alertsEnabled, setAlertsEnabled] = useState(true)
    const [showError, setShowError] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        if (props.email) {
            setEmail(props.email)
        }
    }, [props.email])

    useEffect(() => {
        if(props.alertFrequency){
            setAlertFrequency(props.alertFrequency)
        }
    }, [props.alertFrequency])

    const onEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handleRadioSelect = (event) => {
        setAlertFrequency(event.target.value)
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        const userAlertSettings = {
            email,
            alertFrequency
        }
        try{
            const user = await assetsService.setAlerts(userAlertSettings)
            console.log(user.settings)
            dispatch(setSettings(user.settings))
        }catch(error){
            console.log('Could not set alert settings')
        }
        props.onFormSubmit()
    }
    let errorMessage = <div className="error-message-invisible">Placeholder</div>
    if (showError) {
        errorMessage = <div className="error-message">Insufficient funds</div>
    }

    return (
        <div className="alert-form-container">
            <i class="fas fa-times-circle close-btn" onClick={props.onFormSubmit}></i>
            <div className="py-3 text-center">
                <i className="fas fa-seedling fa-3x icon"></i>
            </div>
            <div className="text-center">
                <h2 className="mb-1">Settings</h2>
                <hr />
                <form onSubmit={onSubmit}>
                    <h4>Email Alert Address</h4>
                    <div className="custom-input">
                        <div>
                            <input
                                type="email"
                                value={email}
                                onChange={onEmailChange} />
                        </div>
                    </div>

                    <hr />
                    <h4>Alert If Unbalanced</h4>
                    <div className="radio-container">
                        <div className="radio">
                            <label className="radio-label">
                                <input
                                    className="radio-input"
                                    type="radio"
                                    value="never"
                                    checked={alertFrequency === 'never'}
                                    onChange={handleRadioSelect} />
                                Never
                            </label>
                        </div>
                        <div className="radio">
                            <label className="radio-label">
                                <input
                                    type="radio"
                                    value="daily"
                                    checked={alertFrequency === 'daily'}
                                    onChange={handleRadioSelect} />
                                Daily
                            </label>
                        </div>
                        <div className="radio">
                            <label className="radio-label">
                                <input
                                    className="radio-input"
                                    type="radio"
                                    value="monthly"
                                    checked={alertFrequency === 'monthly'}
                                    onChange={handleRadioSelect}
                                />
                                Monthly
                            </label>
                        </div>
                        <div className="radio">
                            <label className="radio-label">
                                <input
                                    type="radio"
                                    value="quarterly"
                                    checked={alertFrequency === 'quarterly'}
                                    onChange={handleRadioSelect}
                                />
                                Quarterly
                            </label>
                        </div>
                    </div>
                    {errorMessage}
                    <Button type="allocation-button submit">Update</Button>
                </form>
            </div>
        </div >
    )
}

AlertsForm.propTypes = {
    onFormSubmit: PropTypes.func.isRequired
}

export default withModal(AlertsForm)