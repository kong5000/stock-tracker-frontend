export const setAssets = (assets) => {
    return({
        type: 'SET',
        assets
    })
}

const assetsReducer = (state ={}, action) => {
    switch(action.type){
        case 'SET':
            return action.assets
        default:
            return state
    }
}

export default assetsReducer