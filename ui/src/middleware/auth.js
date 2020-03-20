import {
  //SOCIAL_TOKEN_SUCCESS,
  PROFILE_FAILURE,
  LOGOUT,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  postLogin
} from '../actions';

import {CALL_API} from './api'

export const jwtTokenMiddleware = store => next => (action, dispatch) => {
    switch(action.type){
      case REGISTER_SUCCESS:
        store.dispatch(postLogin(action.formData))
        break;
        case LOGIN_SUCCESS:
          if (!action.error) {
            window.localStorage.setItem('jwt', action.response.access);
            window.localStorage.setItem('jwt-refresh', action.response.refresh);
            //@TODO - this should be refactored to be a redux action
            window.location.href=`//${window.location.host}/`;
          }
        break;
        case LOGOUT:
        case PROFILE_FAILURE:
          window.localStorage.removeItem('jwt');
          window.localStorage.removeItem('jwt-refresh')
          window.location.href=`//${window.location.host}/`;
          break;
        default:
    }

  next(action);
};

/*export const jwtRefreshMiddleware = store => next => (action, dispatch) => {
  if (action.error && action.error === "Unauthorized") {
    const refreshToken = window.localStorage.getItem('jwt-refresh')
    api.Auth.refreshToken(refreshToken).then(response=>{

        window.localStorage.setItem('jwt', response.body.access);
        api.setToken(response.body.access)
          // Only retry once
          if (action.authRetry) {
              // next if its already been retried
              // delete the tokens and move on down the chain
              window.localStorage.removeItem('jwt') 
              window.localStorage.removeItem('jwt-refresh') 
          } else {
              action.authRetry = true
              // Replace the auth token
              delete action[CALL_API].apiPromise.header.authorization
              action[CALL_API].apiPromise.header = {Authorization: "Bearer " + response.body.access}
              
              // interuptions action chain & re-dispatchs
              store.dispatch(action)
          }
      },error=>{
            window.localStorage.removeItem('jwt') 
            window.localStorage.removeItem('jwt-refresh') 
            api.setToken(null)
            //@TODO - this should be refactored to be a redux action
            window.location.href=`//${window.location.host}/`;
    })
  }
  next(action)
};*/
