import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setSettings } from '../../../reducers/settings'
import assetsService from '../../../services/asset'
import PropTypes from 'prop-types'

import withModal from '../../Modal/withModal'
import Button from 'react-bootstrap/Button'
import RadioButton from '../../UI/RadioButton/RadioButton'

import '../forms.css'
import './SettingsForm.css'

const SettingsForm = (props) => {
    const [email, setEmail] = useState('')
    const [alertFrequency, setAlertFrequency] = useState('never')
    const [showError, setShowError] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        if (props.email) {
            setEmail(props.email)
        }
    }, [props.email])

    useEffect(() => {
        if (props.alertFrequency) {
            setAlertFrequency(props.alertFrequency)
        }
    }, [props.alertFrequency])

    const onEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handleRadioSelect = (event) => {
        console.log(event.target.value)
        setAlertFrequency(event.target.value)
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        const userAlertSettings = {
            email,
            alertFrequency
        }
        try {
            const user = await assetsService.setAlerts(userAlertSettings)
            console.log(user.settings)
            dispatch(setSettings(user.settings))
        } catch (error) {
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
                        <RadioButton
                            id="never"
                            value="never"
                            checked={alertFrequency === 'never'}
                            onChange={handleRadioSelect}
                            label='Never'
                        />
                        <RadioButton
                            id="daily"
                            value="daily"
                            checked={alertFrequency === 'daily'}
                            onChange={handleRadioSelect}
                            label='Daily'
                        />
                        <RadioButton
                            id="monthly"
                            value="monthly"
                            checked={alertFrequency === 'monthly'}
                            onChange={handleRadioSelect}
                            label='Monthly'
                        />
                        <RadioButton
                            id="quarterly"
                            value="quarterly"
                            checked={alertFrequency === 'quarterly'}
                            onChange={handleRadioSelect}
                            label='Quarterly'
                        />
                    </div>
                    {errorMessage}
                    <Button type="allocation-button submit">Update</Button>
                </form>
            </div>
        </div >
    )
}

SettingsForm.propTypes = {
    onFormSubmit: PropTypes.func.isRequired
}

export default withModal(SettingsForm)