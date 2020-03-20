import { CALL_API, Schemas } from '../middleware/api'

export const GET_USERS_REQUEST = 'GET_USERS_REQUEST' 
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS' 
export const GET_USERS_FAILURE = 'GET_USERS_FAILURE' 

const fetchUsers = ( nextPageUrl ) => ({
  [CALL_API]: {
    types: [ 
      GET_USERS_REQUEST, 
      GET_USERS_SUCCESS, 
      GET_USERS_FAILURE 
    ],
    endpoint: nextPageUrl,
    schema: Schemas.USER_ARRAY
  }
})

export const loadUsers = (nextPage) => (dispatch, getState) => {
  const {
    nextPageUrl = '/users/',
    pageCount = 0
  } = getState().pagination.userPagination['users'] || {}


  // shortcircuits if the nextPage wasn't explicitly requested
  if (pageCount > 0 && !nextPage){
    return null
  }

  return dispatch(fetchUsers(nextPageUrl))
}

export const LOGOUT = 'LOGOUT'
export const handleLogout = ()=> (dispatch) => dispatch({type:LOGOUT})

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export const postLogin = (formData) => ({
    [CALL_API]: {
      types: [
        LOGIN_REQUEST,
        LOGIN_SUCCESS,
        LOGIN_FAILURE
      ],
      endpoint: '/auth/jwt/create/',
      schema: false,
      options: {
        method: 'POST',
        data: formData
      }
    }
})

export const submitLogin = (formData) => dispatch => dispatch(postLogin(formData))

export const REGISTER_REQUEST = 'REGISTER_REQUST'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAILURE = 'REGISTER_FAILURE'

export const submitRegister = (formData) => dispatch =>{
  return dispatch({
    formData,
    [CALL_API]: {
      types: [
        REGISTER_REQUEST,
        REGISTER_SUCCESS,
        REGISTER_FAILURE
      ],
      endpoint: '/auth/users/',
      schema: false,
      options: {
        method: 'POST',
        data: formData
      }
    }
  })
}

export const USER_REQUEST = 'USER_REQUEST'
export const USER_SUCCESS = 'USER_SUCCESS'
export const USER_FAILURE = 'USER_FAILURE'

// Fetches a single user from API.
// Relies on the custom API middleware defined in ../middleware/api.js.
const fetchUser = username => ({
  [CALL_API]: {
    types: [ USER_REQUEST, USER_SUCCESS, USER_FAILURE ],
    endpoint: `/users/${username}/`,
    schema: Schemas.USER,
  }
})

// Fetches a single user from API unless it is cached.
// Relies on Redux Thunk middleware.
export const loadUser = (username, requiredFields = []) => (dispatch, getState) => {
  const user = getState().entities.users[username]
  if (user && requiredFields.every(key => user.hasOwnProperty(key))) {
    return null
  }
  return dispatch(fetchUser(username))
}

export const PROFILE_REQUEST = 'PROFILE_REQUEST'
export const PROFILE_SUCCESS = 'PROFILE_SUCCESS'
export const PROFILE_FAILURE = 'PROFILE_FAILURE'

// Fetches a currently logged in  user from API unless it is cached.
// Relies on Redux Thunk middleware.
export const loadProfile = (requiredFields = []) => (dispatch, getState) => {
  return dispatch({
    [CALL_API]: {
      types: [ PROFILE_REQUEST, PROFILE_SUCCESS, PROFILE_FAILURE ],
      endpoint: '/auth/users/me/',
      schema: false
    }
  })
}

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST'
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS'
export const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE'

// Fetches a currently logged in  user from API unless it is cached.
// Relies on Redux Thunk middleware.
export const submitResetPassword = ({uid, token, new_password, re_new_password }) => (dispatch, getState) => {
  // data = user submitted email form
  return dispatch({
    [CALL_API]: {
      types: [ 
        RESET_PASSWORD_REQUEST, 
        RESET_PASSWORD_SUCCESS, 
        RESET_PASSWORD_FAILURE 
      ],
      endpoint: '/auth/password/reset/confirm/',
      options: {
        method: "POST",
        data: {
          uid,
          token,
          new_password,
          re_new_password
        }
      },
      schema: false
    }
  })
}
export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST'
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS'
export const FORGOT_PASSWORD_FAILURE = 'FORGOT_PASSWORD_FAILURE'

// Fetches a currently logged in  user from API unless it is cached.
// Relies on Redux Thunk middleware.
export const submitForgotPassword = ({email}) => (dispatch, getState) => {
  // data = user submitted email form
  return dispatch({
    [CALL_API]: {
      types: [ 
        FORGOT_PASSWORD_REQUEST, 
        FORGOT_PASSWORD_SUCCESS, 
        FORGOT_PASSWORD_FAILURE 
      ],
      endpoint: '/auth/password/reset/',
      options: {
        method: "POST",
        data: {email}
      },
      schema: false
    }
  })
}
export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'

// Resets the currently visible error message.
export const resetErrorMessage = () => ({
    type: RESET_ERROR_MESSAGE
})
