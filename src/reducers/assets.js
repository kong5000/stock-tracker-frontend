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

const assetsReducer = (state =[], action) => {
    switch(action.type){
        case 'SET':
            return action.assets
        case 'BUY':
            // return [...state , action.asset]
            console.log('what is this',action.asset)
            const fake = [...state ,{
                ticker: 'O',
                name: 'Some Company',
                shares: 5,
                price: 10.2
              },
            action.asset]
            return fake
        default:
            return state
    }
}

export default assetsReducer