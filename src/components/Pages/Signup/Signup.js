import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../../reducers/user'
import assetService from '../../../services/asset'
import userService from '../../../services/user'
import { useHistory } from 'react-router-dom'
import { setSettings } from '../../../reducers/settings'
import './Signup.css'

const Signup = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(true)
  const [showLoginError, setShowLoginError] = useState(false)
  const [errorString, setErrorString] = useState('')

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
      dispatch(login(loggednInUser))
      assetService.setToken(loggednInUser.token)

      const settings = await assetService.getSettings()
      dispatch(setSettings(settings))
      
      if (rememberMe) {
        window.localStorage.setItem('loggedInUser', JSON.stringify(loggednInUser))
      }
      
      history.push('/portfolio')
    } catch (error) {
      if(error.response){
        const errorResponse = error.response.data.error
        setErrorString(errorResponse)
        setShowLoginError(true)
        setTimeout(() => {
          setShowLoginError(false)
        }, 3000)
      }
      console.log(error)


    }
    setUsername('')
    setPassword('')
  }

  let errorMessage = <div className="error-message-invisible">placeholder</div>
  if (showLoginError) {
    errorMessage = <div className="error-message">{errorString}</div>
  }

  return (
    <div className="text-center signup-page">
      <form className="form-signin" onSubmit={handleSignup}>
        <i class="fas fa-seedling fa-7x icon"></i>
        <h1 className="h3 mb-3 font-weight-normal">Sign Up</h1>
        <input value={username} onChange={onUsernameChange} type="text" className="form-control mb-2" placeholder="Username" required autofocus />
        <input value={password} onChange={onPasswordChange} type="password" className="form-control mb-2" placeholder="Password" required />
        {errorMessage}
        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" checked={rememberMe} onChange={handleCheckBoxChange} /> Remember me
          </label>
        </div>
        <button className="btn btn-lg btn-primary btn-block signup-btn" type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default Signup