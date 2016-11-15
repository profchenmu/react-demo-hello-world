import createReducer from 'UTIL/createReducer'
import { ACTION_HANDLERS } from '../action/nav'
import initState from 'STORE/initState'

export default createReducer(initState.userData, ACTION_HANDLERS)
