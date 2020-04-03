import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/portfolio'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const addStock = async stock => {
   const config = {
       headers: { Authorization: token}
   }
   const response = await axios.post(baseUrl +'/asset', stock, config)
   return response.data
}

const sellStock = async stock => {
    const config = {
        headers: { Authorization: token}
    }
    const response = await axios.post(baseUrl +'/sell', stock, config)
    return response.data
}

const getAssets = async () => {
    const config = {
        headers: { Authorization: token}
    }
    const response = await axios.get(baseUrl, config)
    return response.data
}

export default {setToken, addStock, sellStock, getAssets}