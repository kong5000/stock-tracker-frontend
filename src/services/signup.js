import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/users'

const signup = async credentials => {
        console.log('SIGN UP')
    const response = await axios.post(baseUrl, credentials)

    return response.data
}

const test = () => {
    console.log('TEST')
}

export default { signup, test }