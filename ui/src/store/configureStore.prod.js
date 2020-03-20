import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import api from '../middleware/api'
import { jwtTokenMiddleware, jwtRefreshMiddleware } from '../middleware/auth'
import rootReducer from '../reducers'

const configureStore = preloadedState => createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(
    thunk, 
    api,
    jwtTokenMiddleware,
    //jwtRefreshMiddleware,
  )
)

export default configureStore
