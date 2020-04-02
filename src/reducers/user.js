
export const login = (user) => {
    return ({
        type: 'LOGIN',
        user
    })
}

export const logout = () => {
    return({
        type: 'LOGOUT'
    })
}
// export const login = (username, password) => {
//     return async dispatch => {
//         try {
//             const user = await signupService.login({
//                 username,
//                 password
//             })

//             window.localStorage.setItem(
//                 'loggedInUser', JSON.stringify(user)
//             )

//             assetService.setToken(user.token)
//             console.log(user)

//             dispatch({
//                 type: 'LOGIN',
//                 user
//             })
//         } catch (exception) {
//             console.log(exception)
//         }
//     }
// }


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

