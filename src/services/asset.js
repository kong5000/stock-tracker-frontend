import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/portfolio'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
    console.log(token)
}

const addStock = async stock => {
   const config = {
       headers: { Authorization: token}
   }
   const response = await axios.post(baseUrl +'/asset', stock, config)
   return response.data
}

export default {setToken, addStock}