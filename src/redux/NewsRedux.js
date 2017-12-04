import { createReducer, createActions } from "reduxsauce"
import Immutable from "seamless-immutable"

const { Types, Creators } = createActions({
    login: [ "username", "password" ]
})


export default Creators

const INITIAL_STATE = Immutable({
    username: null,
    token: null
})

const login = (state = INITIAL_STATE, { username, password }) => {
    return { username, password }
}

export const reducer = createReducer(INITIAL_STATE, {
    [Types.LOGIN]: login
})
