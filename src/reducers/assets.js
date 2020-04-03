export const setAssets = (assets) => {
    return({
        type: 'SET',
        assets
    })
}

export const buyAsset = (asset) => {
    return({
        type: 'BUY',
        asset
    })
}

const assetsReducer = (state = null, action) => {
    switch(action.type){
        case 'SET':
            return action.assets
        default:
            return state
    }
}

export default assetsReducer