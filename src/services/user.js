import axios from 'axios'
const baseUrl = process.env.REACT_APP_USERS_URL
const loginUrl =process.env.REACT_APP_LOGIN_URL

const signup = async credentials => {
    const response = await axios.post(baseUrl, credentials)
    return response.data
}

const login = async credentials => {
    // const response = await axios.post('http://localhost:3003/api/login', credentials)
    const response = await axios.post(loginUrl, credentials)
    console.log(response.data)
    return response.data
}

export default { signup, login }