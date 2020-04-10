
export const login = (user) => {
    return ({
        type: 'LOGIN',
        user
    })
}

export const logout = () => {
    window.localStorage.removeItem('loggedInUser')
    return({
        type: 'LOGOUT'
    })
}

const userReducer = (state = null, action) => {
    switch (action.type) {
        case 'LOGIN':
            return action.user
        case 'LOGOUT':
            return null
        default:
            return state
    }
}

export default userReducer

