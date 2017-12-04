import { createStore, applyMiddleware, compose, combineReducers } from "redux"
import thunkMiddleware from "redux-thunk"


const composeEnhancers =
typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose

const enhancers = []

const middlewares = [ thunkMiddleware ]

enhancers.push(applyMiddleware(...middlewares))

const INIT_STATE = {
    entities: {},
}

/*
const combinedReducer = (state = {}, action) => {
    switch (action.type) {
        case "USER_LOGOUT":
            return {}
        default:
            return state
    }
}
*/

const rootReducer = combineReducers({
    //entities: combineReducers({
    login: require("./LoginRedux").reducer,
    news: require("./NewsRedux").reducer,
    //})
})

const store = createStore(rootReducer, composeEnhancers(...enhancers))

/*
store.subscribe(() => {
    console.log("REDUX STATE:", store.getState())
})
*/

export default store

