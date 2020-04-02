import React, { useState } from 'react'
import signupService from '../services/signup'

const Signup = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    const handleSignup = async (event) => {
        event.preventDefault()
        const newUser = {
            username,
            password
        }
        try{
            const newUser = await signupService.signup(newUser)
            setUser(newUser)
            setUsername('')
            setPassword('')
        }catch(exception){

        }
        
        console.log(user)
    }

    return (
        <div>
            <form onSubmit={handleSignup}>
                <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => { setUsername(target.value) }}
                />
                <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => { setPassword(target.value) }}
                />
                <button type="submit">Signup</button>
            </form>
        </div>
    )
}

export default Signup