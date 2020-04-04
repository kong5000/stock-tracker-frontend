import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/user'
import assetService from '../services/asset'
import userService from '../services/user'
import { useHistory } from 'react-router-dom'

const Login = (props) => {
    const dispatch = useDispatch()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    let history = useHistory()
    
    const onUsernameChange = (event) => {
        setUsername(event.target.value)
    }
    const onPasswordChange = (event) => {
        setPassword(event.target.value)
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
            window.localStorage.setItem('loggedInUser', JSON.stringify(user))
            history.push("/portfolio");
            console.log('HERE')
        } catch (exception) {
            console.log(exception)
        }
        setUsername('')
        setPassword('')
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={onUsernameChange}
                />
                <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={onPasswordChange}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login