import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css'
import Signup from './components/Signup'
import Login from './components/Login'
import Assets from './components/Assets'
import Homepage from './components/Homepage'
import NavigationBar from './components/NavigationBar'
import assetService from './services/asset'
import { useSelector, useDispatch } from 'react-redux'
import { login, logout } from './reducers/user'
import { setSettings } from './reducers/settings'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

const App = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  console.log(user)
  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      const userObj = JSON.parse(loggedInUser)
      dispatch(login(userObj))
      dispatch(setSettings(userObj.settings))
      assetService.setToken(userObj.token)
    }
  }, [dispatch])


  const onLogout = () => {
    dispatch(logout())
  }

  return (
    <div>
      <BrowserRouter>
        <NavigationBar user={user} onLogout={onLogout}/>
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="/portfolio">
            {user && <Assets/>}
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/signup'>
            <Signup />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}


export default App