import React from 'react'

const Signup = ({username, password, handleSignup, handleLogin, onUsernameChange, onPasswordChange}) => {
    return (
        <div>
            <h2>Signup</h2>
            <form onSubmit={handleSignup}>
                <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={onUsernameChange}
                />
                <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={onPasswordChange}
                />
                <button type="submit">Signup</button>
            </form>
            <h2>Login</h2>
            <button onClick={handleLogin}>login</button>
        </div>
    )
}

export default Signup