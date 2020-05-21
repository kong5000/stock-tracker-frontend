import axios from 'axios'
const baseUrl = process.env.REACT_APP_PORTFOLIO_URL
 
let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const addStock = async stock => {
    const config = {
        headers: { Authorization: token }
    }
    const response = await axios.post(baseUrl + '/asset', stock, config)
    return response.data
}

const sellStock = async stock => {
    const config = {
        headers: { Authorization: token }
    }
    const response = await axios.post(baseUrl + '/sell', stock, config)
    return response.data
}

const getAssets = async () => {
    const config = {
        headers: { Authorization: token }
    }
    console.log('Post')
    try {
        await axios.post(baseUrl + '/update', null, config)
        const response = await axios.get(baseUrl, config)
        return response.data
    }
    catch (error) {
        console.log('CAUGHT')
        let message = { message: 'API Key Exhausted' }
        throw message
    }

}

const getChart = async (symbol) => {
    const config = {
        headers: { Authorization: token }
    }
    const stock = {
        ticker: symbol
    }
    try {
        const response = await axios.post(baseUrl + '/chart', stock, config)
        console.log('The data', response.data)
        return response.data
    } catch (error) {
        //Error can be either
        // Payment Required
        // Not Found
        console.log('The Error', error.response.data.error)
        return null
    }
}

const updateCash = async (cash) => {
    const config = {
        headers: { Authorization: token }
    }
    const body = {
        cash
    }
    const response = await axios.post(baseUrl + '/cash', body, config)
    return response.data
}

const updateAllocations = async (stocks) => {
    const config = {
        headers: { Authorization: token }
    }
    const stocksToUpdate = {
        stocks
    }
    const response = await axios.post(baseUrl + '/allocation', stocksToUpdate, config)
    return response.data
}

const getSettings = async () => {
    const config = {
        headers: { Authorization: token }
    }
    const response = await axios.get('/api/users/settings', config)
    console.log(response.data)
    return response.data
}

const setAlerts = async (alertSettings) => {
    const config = {
        headers: { Authorization: token }
    }
    const response = await axios.post('/api/users/alerts', alertSettings, config)
    return response.data
}

const updateThreshold = async threshold => {
    const config = {
        headers: { Authorization: token }
    }
    const newThreshold = {
        balanceThreshold: threshold
    }
    const response = await axios.post('/api/users/threshold', newThreshold, config)
    return response.data
}


export default {
    setToken,
    addStock,
    sellStock,
    getAssets,
    getChart,
    updateAllocations,
    updateCash,
    updateThreshold,
    getSettings,
    setAlerts
}