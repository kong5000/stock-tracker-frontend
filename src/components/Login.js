import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/user'
import assetService from '../services/asset'
import userService from '../services/user'
import { useHistory } from 'react-router-dom'

const Login = () => {
    const dispatch = useDispatch()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(true)
    const [showLoginError, setShowLoginError] = useState(false)
    const [errorString, setErrorString] = useState('')

    let history = useHistory()

    const onUsernameChange = (event) => {
        setUsername(event.target.value)
    }
    const onPasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleCheckBoxChange = (event) => {
        setRememberMe(!rememberMe)
    }

    const handleLogin = async (event) => {
        event.preventDefault()

        const loginCredentials = {
            username,
            password
        }
        try {
            const user = await userService.login(loginCredentials)
            assetService.setToken(user.token)
            dispatch(login(user))
            if(rememberMe){
                window.localStorage.setItem('loggedInUser', JSON.stringify(user))
            }
            history.push("/portfolio");
        } catch (error) {
            setErrorString(error.response.data.error)
            setShowLoginError(true)
            setTimeout(() => {
                console.log('timeout')
                setShowLoginError(false)
            }, 3000)
        }
        setUsername('')
        setPassword('')
    }

    let errorMessage = <div className="error-message-invisible">Placeholder</div>
    if(showLoginError){
        errorMessage = <div className="error-message">{errorString}</div>
    }

    return (
        <div className="text-center">
            <form className="form-signin" onSubmit={handleLogin}>
                <i class="fas fa-seedling fa-7x icon"></i>
                <h1 className="h3 mb-3 font-weight-normal">Log In</h1>
                <input value={username} onChange={onUsernameChange} type="text" className="form-control mb-2" placeholder="Username" required autofocus />
                <input value={password} onChange={onPasswordChange} type="password" className="form-control mb-2" placeholder="Password" required />
                {errorMessage}
                <div className="checkbox mb-3">
                    <label>
                        <input type="checkbox" value="remember-me" checked={rememberMe} onChange={handleCheckBoxChange}/> Remember me
                    </label>
                </div>
                <button className="btn btn-lg btn-primary btn-block signup-btn" type="submit">Log In</button>
            </form>
        </div>
    )
}

export default Login