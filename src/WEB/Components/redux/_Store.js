import {combineReducers, applyMiddleware, createStore} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import IconSearchReducer from './IconSearchReducer.js'
import SideBarReducer from './SideBarReducer.js'
import MainContentBoxReducer from './MainContentBoxReducer.js'
import CategoryContentBoxReducer from './CategoryContentBoxReducer.js'
import CompareContentBoxReducer from './CompareContentBoxReducer.js'

let originReducer = combineReducers({
    IconSearch : IconSearchReducer,
    SideBar : SideBarReducer,
    MainContentBox : MainContentBoxReducer,
    CategoryContentBox : CategoryContentBoxReducer,
    CompareContentBox : CompareContentBoxReducer 
})

let _Store = createStore(originReducer, applyMiddleware(logger, thunk))

export default _Store
