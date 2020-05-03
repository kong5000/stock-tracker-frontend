export const setSettings = (settings) => {
    return({
        type: 'CHANGE_SETTINGS',
        settings
    })
}

const settingsReducer = (state = null, action) => {
    switch(action.type){
        case 'CHANGE_SETTINGS':
            return action.settings
        default:
            return state
    }
}

export default settingsReducer