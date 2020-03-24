import { combineReducers } from 'redux'
import { merge, cloneDeep, pick } from 'lodash'

import * as ActionTypes from '../actions'
import paginate from './paginate'

let jwt = window.localStorage.getItem('jwt'),
    jwt_refresh = window.localStorage.getItem('jwt_refresh');

let hasToken = (jwt !== null || jwt_refresh !== null)
const commonState = { loggedIn: hasToken }

const common = (state = {...commonState}, action) => {
  switch(action.type){
      case ActionTypes['LOGIN_SUCCESS']:
      //case ActionTypes['SOCIAL_TOKEN_SUCCESS']:
        return merge({}, state, {loggedIn: true})
      case ActionTypes['LOGOUT']:
        return merge({}, state, {loggedIn: false})
    default:
        return state
  }
}

const entityState = { users: {}, clips: {}}
// Updates an entity cache in response to any action with response.entities.
const entities = (state = {...entityState}, action) => {

    if (action.response ) {
      if (action.response.entities) {
        return merge({}, state, action.response.entities)
      }

    }

  return state
}
const profileState = {username: null }
// Updates profile info for app to run
const profile = (state = {...profileState}, action) => {
  if (action.type === ActionTypes['PROFILE_SUCCESS']) {
    return merge({}, state, action.response )
  }
  return state
}

const msg = (state={}, action) => {
    const {type} = action
    
    if (type == ActionTypes.FORGOT_PASSWORD_SUCCESS){
        return { reset_password: 'Please check your email for a reset link' }
    } else if (type == ActionTypes.RESET_PASSWORD_SUCCESS){
        return { reset_password_success: true}
    }

  return state
}

// Updates error message to notify about the failed fetches.
const error = (state = null, action) => {
  const { type, error } = action

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null
  } else if (error && error.message !== "Unauthorized") {
    return error
  }

  return state
}

const pagination = combineReducers({
  userPagination: paginate({
    mapActionToKey: action => 'users',
    types: [
      ActionTypes.GET_USERS_REQUEST,
      ActionTypes.GET_USERS_SUCCESS,
      ActionTypes.GET_USERS_FAILURE
    ]
  })
})

const rootReducer = combineReducers({
  common,
  entities,
  profile,
  pagination,
  msg,
  error,
})

export default rootReducer
