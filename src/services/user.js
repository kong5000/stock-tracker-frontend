import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/users'

const signup = async credentials => {
    const response = await axios.post(baseUrl, credentials)
    return response.data
}

const login = async credentials => {
    const response = await axios.post('http://localhost:3003/api/login', credentials)
    return response.data
}

export default { signup, login }