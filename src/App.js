import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './components/Signup'
import signupService from './services/signup'
import assetService from './services/asset'

const App = () => {
  const [user, setUser] = useState(null)
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
    const newUser = {
      username,
      password
    }
    try {
      const user = await signupService.signup(newUser)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {

    }
    console.log(user)
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
      setUser(user)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
    } catch (exception) {

    }
    setUsername('')
    setPassword('')
    console.log(user)
  }

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if(loggedInUser){
      const user = JSON.parse(loggedInUser)
      setUser(user)
      assetService.setToken(user.token)
    }
  }, [])

  const testBuy = async () => {
    const stock = {
      ticker: 'O',
      name: 'Some Company',
      shares: 5,
      price: 10.2
    }
    const bought = await assetService.addStock(stock)
    console.log(bought)
  }

  return (
    <div>
      <p>Hello world</p>
      {user && <div>logged in</div>}
      <Signup
        username={username}
        password={password}
        onPasswordChange={onPasswordChange}
        onUsernameChange={onUsernameChange}
        handleSignup={handleSignup}
        handleLogin={handleLogin}
      ></Signup>
      <button onClick={testBuy}>test buying a stock</button>
    </div>
  )

}


export default App