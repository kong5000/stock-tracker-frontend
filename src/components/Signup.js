import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/user'
import assetService from '../services/asset'
import userService from '../services/user'
import { useHistory } from 'react-router-dom'

const Signup = () => {
  const dispatch = useDispatch()

  const history = useHistory()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onUsernameChange = (event) => {
    setUsername(event.target.value)
  }
  const onPasswordChange = (event) => {
    setPassword(event.target.value)
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
      window.localStorage.setItem('loggedInUser', JSON.stringify(loggednInUser))
      history.push('/portfolio')
    } catch (exception) {

    }
    setUsername('')
    setPassword('')
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
    </div>
  )
}

export default Signup