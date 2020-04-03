import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './components/Signup'
import Assets from './components/Assets'
import OrderForm from './components/OrderForm'
import assetService from './services/asset'
import { useSelector, useDispatch } from 'react-redux'
import { login } from './reducers/user'

const App = () => {
  // const [user, setUser] = useState(null)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      const userObj = JSON.parse(loggedInUser)
      dispatch(login(userObj))
      assetService.setToken(userObj.token)
    }
  }, [dispatch])

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
      <Signup
      ></Signup>
      {user && <Assets/>}
      <button onClick={testBuy}>test buying a stock</button>
      {user && <div>Logged in as {user.username}</div>}
      <OrderForm/>
    </div>
  )

}


export default App