import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/user'
import assetService from '../services/asset'
import userService from '../services/user'
import { useHistory } from 'react-router-dom'
import '../styles/form.css'

const Signup = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(true)

  const dispatch = useDispatch()

  const history = useHistory()

  const onUsernameChange = (event) => {
    setUsername(event.target.value)
  }
  const onPasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleCheckBoxChange = (event) => {
    setRememberMe(!rememberMe)
  }

  const handleSignup = async (event) => {
    event.preventDefault()

    const signupCredentials = {
      username,
      password
    }

    try {
      await userService.signup(signupCredentials)
      const loggednInUser = await userService.login(signupCredentials)
      assetService.setToken(loggednInUser.token)
      dispatch(login(loggednInUser))
      if (rememberMe) {
        window.localStorage.setItem('loggedInUser', JSON.stringify(loggednInUser))
      }
      history.push('/portfolio')
    } catch (exception) {

    }
    setUsername('')
    setPassword('')
  }

  return (
    <div className="text-center">
      <form className="form-signin" onSubmit={handleSignup}>
        <i class="fas fa-seedling fa-7x icon"></i>
        <h1 className="h3 mb-3 font-weight-normal">Sign Up</h1>
        <input value={username} onChange={onUsernameChange} type="text" className="form-control" placeholder="Username" required autofocus />
        <input value={password} onChange={onPasswordChange} type="password" className="form-control" placeholder="Password" required />
        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" checked={rememberMe} onChange={handleCheckBoxChange} /> Remember me
          </label>
        </div>
        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default Signup