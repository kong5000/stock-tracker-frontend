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
        } catch (exception) {
            console.log(exception)
        }
        setUsername('')
        setPassword('')
    }

    return (
        <div className="text-center">
            <form className="form-signin" onSubmit={handleLogin}>
                <i class="fas fa-seedling fa-7x icon"></i>
                <h1 className="h3 mb-3 font-weight-normal">Log In</h1>
                <input value={username} onChange={onUsernameChange} type="text" className="form-control" placeholder="Username" required autofocus />
                <input value={password} onChange={onPasswordChange} type="password" className="form-control" placeholder="Password" required />
                <div className="checkbox mb-3">
                    <label>
                        <input type="checkbox" value="remember-me" checked={rememberMe} onChange={handleCheckBoxChange}/> Remember me
                    </label>
                </div>
                <button className="btn btn-lg btn-primary btn-block" type="submit">Log In</button>
            </form>
        </div>
    )
}

export default Login