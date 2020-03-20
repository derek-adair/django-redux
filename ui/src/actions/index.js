import { CALL_API, Schemas } from '../middleware/api'

export const GET_LIBRARY_REQUEST = 'GET_LIBRARY_REQUEST' 
export const GET_LIBRARY_SUCCESS = 'GET_LIBRARY_SUCCESS' 
export const GET_LIBRARY_FAILURE = 'GET_LIBRARY_FAILURE' 

const fetchLibrary = ( ) => ({
  [CALL_API]: {
    types: [
      GET_LIBRARY_REQUEST,
      GET_LIBRARY_SUCCESS,
      GET_LIBRARY_FAILURE,
    ],
    endpoint: `/library/`,
    schema: Schemas.LIBRARY
  }
})

export const loadLibrary = (nextPage) => (dispatch, getState) => {
  return dispatch(fetchLibrary())
}

export const ADD_TO_LIBRARY_REQUEST = 'ADD_TO_LIBRARY_REQUEST' 
export const ADD_TO_LIBRARY_SUCCESS = 'ADD_TO_LIBRARY_SUCCESS' 
export const ADD_TO_LIBRARY_FAILURE = 'ADD_TO_LIBRARY_FAILURE' 

const postToLibrary = (username, clip) => ({
  library_owner: username,
  clip,
    [CALL_API]: {
      types: [
        ADD_TO_LIBRARY_REQUEST,
        ADD_TO_LIBRARY_SUCCESS,
        ADD_TO_LIBRARY_FAILURE,
      ],
      endpoint: `/library/add/`,
      options: {
        method: 'POST',
        data: {clip_id:clip.id}
      },
      schema: Schemas.LIBRARY
    }
})

export const addToLibrary = ( username, clip ) => (dispatch, getState) => {
  // shortcircuit if its already added
  if(getState().entities.library[username].clips.indexOf(`${clip.user}/${clip.name}`) !== -1){
    return null
  }
  return dispatch(postToLibrary(username, clip)) 
}

export const REMOVE_FROM_LIBRARY_REQUEST = 'REMOVE_FROM_LIBRARY_REQUEST' 
export const REMOVE_FROM_LIBRARY_SUCCESS = 'REMOVE_FROM_LIBRARY_SUCCESS' 
export const REMOVE_FROM_LIBRARY_FAILURE = 'REMOVE_FROM_LIBRARY_FAILURE' 

const deleteFromLibrary = ( username, clip ) => ({
  library_owner: username,
  clip, 
    [CALL_API]: {
      types: [
        REMOVE_FROM_LIBRARY_REQUEST,
        REMOVE_FROM_LIBRARY_SUCCESS,
        REMOVE_FROM_LIBRARY_FAILURE,
      ],
      endpoint: `/library/remove/`,
      options: {
        method:"POST",
        data: {clip_id:clip.id}
      },
      schema: Schemas.LIBRARY
    }
})
export const removeFromLibrary = ( username, clip) => (dispatch, getState) => {
  // shortcircuit if its already been deleted or isn't there
  if(getState().entities.library[username].clips.indexOf(`${clip.user}/${clip.name}`) === -1){
    return null
  }
  return dispatch(deleteFromLibrary(username, clip))
}

export const ADD_TO_PLAYER = 'ADD_TO_PLAYER'

export const playerAdd = ( _src ) => (dispatch) => {
    return dispatch({
        type: ADD_TO_PLAYER,
        src: _src
    })
}

export const POST_CLIP_REQUEST = 'POST_CLIP_REQUEST' 
export const POST_CLIP_SUCCESS = 'POST_CLIP_SUCCESS' 
export const POST_CLIP_FAILURE = 'POST_CLIP_FAILURE' 

const postClip = ( formData ) => ({
  [CALL_API]: {
    types: [ 
      POST_CLIP_REQUEST, 
      POST_CLIP_SUCCESS, 
      POST_CLIP_FAILURE
    ],
    endpoint: '/clips/',
    options: {
        method: 'POST',
        data: formData,
        'Content-Type': 'multipart/form-data'
    },
    schema: Schemas.CLIP
  }
})

export const submitClip = (clipData) => (dispatch, getState) => {

  // converts clip into binary so axios can parse it
  let formData = new FormData()
  formData.append('name', clipData.name)
  if(clipData.hasOwnProperty('source_file')){
    formData.append('source_file', clipData.source_file)
  }

  return dispatch(postClip(formData))
}

export const DELETE_CLIP_REQUEST = 'DELETE_CLIP_REQUEST' 
export const DELETE_CLIP_SUCCESS = 'DELETE_CLIP_SUCCESS' 
export const DELETE_CLIP_FAILURE = 'DELETE_CLIP_FAILURE' 

export const removeClip = (clip) => (dispatch, getState) => {
  return dispatch({
    clip,
    [CALL_API]: {
      types: [ 
        DELETE_CLIP_REQUEST, 
        DELETE_CLIP_SUCCESS, 
        DELETE_CLIP_FAILURE
      ],
      endpoint: `/clips/${clip.id}/`,
      options: {
        method: 'DELETE',
      },
      schema: Schemas.CLIP
    }
  })
}

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

export const GET_USER_CLIPS_REQUEST = 'GET_USER_CLIPS_REQUEST' 
export const GET_USER_CLIPS_SUCCESS = 'GET_USER_CLIPS_SUCCESS' 
export const GET_USER_CLIPS_FAILURE = 'GET_USER_CLIPS_FAILURE' 

const fetchUserClips = ( user, nextPageUrl ) => ({
  user: user,
  [CALL_API]: {
    types: [ GET_USER_CLIPS_REQUEST, GET_USER_CLIPS_SUCCESS, GET_USER_CLIPS_FAILURE ],
    endpoint: nextPageUrl,
    schema: Schemas.CLIP_ARRAY
  }
})

export const loadUserClips = (user, nextPage) => (dispatch, getState) => {
  const {
    nextPageUrl = `/users/${user}/clips/`,
    pageCount = 0
  } = getState().pagination.clipsByUser[user] || {}

  // shortcircuits if the nextPage wasn't explicitly requested
  if (pageCount > 0 && !nextPage){
    return null
  }

  return dispatch(fetchUserClips(user, nextPageUrl))
}

export const GET_CLIP_REQUEST = 'GET_CLIP_REQUEST' 
export const GET_CLIP_SUCCESS = 'GET_CLIP_SUCCESS' 
export const GET_CLIP_FAILURE = 'GET_CLIP_FAILURE' 

//Fetches a single clip
// thunk/api middleware dependent
const fetchClip = ( username, clipname ) => ({
  [CALL_API]: {
    types: [ 
      GET_CLIP_REQUEST, 
      GET_CLIP_SUCCESS, 
      GET_CLIP_FAILURE 
    ],
    endpoint: `/users/${username}/clips/${clipname}/`,
    schema: Schemas.CLIP
  }
})

export const loadClip = (username, clipname, requiredFields=[]) => (dispatch, getState) => {
  const clip = getState().entities.clips[`${username}/${clipname}`]

  if(clip && requiredFields.every(key=>clip.hasOwnProperty(key))){
    return null  
  }

  return dispatch(fetchClip(username, clipname))
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
