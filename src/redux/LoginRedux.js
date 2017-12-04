import { createReducer, createActions } from "reduxsauce"
import Immutable from "seamless-immutable"
//import Cookies from "js-cookie"
import api from "../utils/api"

const { Types, Creators } = createActions({
    setLogin: [ "status" ],
    setUserInfo: [ "userInfo" ],

    getUserInfo: () => {
        return dispatch => {
            api.request("GET_USER_INFO").then(res => {
                dispatch(Creators.setUserInfo(res))
                if (!res.uid) {
                    dispatch(Creators.setLogin(false))
                } else {
                    dispatch(Creators.setLogin(true))
                }
            })
        }
    },

    logOut: (callback) => {
        return dispatch => {
            api.request("LOGOUT").then(res => {
                dispatch(Creators.setLogin(false))
                dispatch(Creators.setUserInfo({}))
                callback && callback()
            })
        }
    }
})

export default Creators

const INITIAL_STATE = Immutable({
    isLogin: false,
    userInfo: {}
})

const setLogin = (state = INITIAL_STATE, { status }) => {
    return state.setIn([ "isLogin" ], status)
}

const setUserInfo = (state = INITIAL_STATE, { userInfo }) => {
    return state.setIn([ "userInfo" ], userInfo)
}

export const reducer = createReducer(INITIAL_STATE, {
    [Types.SET_LOGIN]: setLogin,
    [Types.SET_USER_INFO]: setUserInfo
})
