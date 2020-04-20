import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createStore, combineReducers } from 'redux'
import {Provider} from 'react-redux'
import userReducer from './reducers/user'
import assetsReducer from './reducers/assets'
import settingsReducer from './reducers/settings'

const reducer = combineReducers({
    user: userReducer,
    assets: assetsReducer,
    settings: settingsReducer
})
const store = createStore(reducer)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'))