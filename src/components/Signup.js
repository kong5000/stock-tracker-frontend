import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { login, logout } from '../reducers/user'
import assetService from '../services/asset'
import signupService from '../services/signup'

const Signup = ({ handleSignup }) => {
    const dispatch = useDispatch()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onUsernameChange = (event) => {
        setUsername(event.target.value)
      }
      const onPasswordChange = (event) => {
        setPassword(event.target.value)
      }

    const handleLogin = async (event) => {
        event.preventDefault()
    
        const newUser = {
          username,
          password
        }
        try {
          const user = await signupService.login(newUser)
          assetService.setToken(user.token)
          dispatch(login(user))
          window.localStorage.setItem('loggedInUser', JSON.stringify(user))
        } catch (exception) {
    
        }
        setUsername('')
        setPassword('')
      }
    
      const handleLogout = (event) =>{
        event.preventDefault()
        window.localStorage.removeItem('loggedInUser')
        dispatch(logout())
      }

    return (
        <div>
            <h2>Signup</h2>
            <form onSubmit={handleSignup}>
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
                <button type="submit">Signup</button>
            </form>
            <h2>Login</h2>
            <button onClick={handleLogin}>login</button>
            <button onClick={handleLogout}>logout</button>
        </div>
    )
}

export default Signup