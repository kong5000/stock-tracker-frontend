import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/users'
const loginUrl = 'http://localhost:3003/api/login'
// const baseUrl = '/api/users'
// const loginUrl ='/api/login'

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