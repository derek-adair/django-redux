import { normalize, schema } from 'normalizr'
import { camelizeKeys } from 'humps'
import axios from 'axios'

const API_ROOT = ( process.env.NODE_ENV === 'production')? process.env.REACT_APP_API_URI: '';
// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
const callApi = (endpoint, schema, options={}) => {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint
  const jwt = window.localStorage.getItem('jwt');

  options.headers = { 'Content-Type': 'application/json'}
  if ( jwt ){
    options.headers['Authorization'] = `Bearer ${jwt}`
  }

  return axios(fullUrl, options)
    .then(response => {
      console.log(response)
        let results = response.data.results || response.data;
        if(results !== ""){
        results = camelizeKeys(results)
        results = (schema)? normalize(results, schema) : results;
        }

        let nextPageUrl = (response.data.hasOwnProperty('next') && response.data.next !== null)? new URL(response.data.next) : ""
        // workaround for local dev- need to chop off the proxy and let node handle it
        // Dirty AF
        if(nextPageUrl !== ""){
            nextPageUrl = `${nextPageUrl.pathname}${nextPageUrl.search}`
        }

        return Object.assign({},
          results,
          { nextPageUrl }
        )
      })
}

// We use this Normalizr schemas to transform API responses from a nested form
// to a flat form where repos and users are placed in `entities`, and nested
// JSON objects are replaced with their IDs. This is very convenient for
// consumption by reducers, because we can easily build a normalized tree
// and keep it updated as we fetch more data.

// Read more about Normalizr: https://github.com/paularmstrong/normalizr

// GitHub's API may return results with uppercase letters while the query
// doesn't contain any. For example, "someuser" could result in "SomeUser"
// leading to a frozen UI as it wouldn't find "someuser" in the entities.
// That's why we're forcing lower cases down there.

const userSchema = new schema.Entity('users', {}, {
    idAttribute: user => user.username
})

const clipSchema = new schema.Entity('clips', {}, {
    idAttribute: clip => `${clip.user}/${clip.name}`
})

const librarySchema = new schema.Entity('library', {
    clips: [clipSchema]
},{
    idAttribute: library => library.user
})

export const Schemas = {
  USER: userSchema,
  USER_ARRAY: [userSchema],
  CLIP: clipSchema,
  CLIP_ARRAY: [clipSchema],
  LIBRARY: librarySchema
}
// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = 'Call API'

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const callAPI = action[CALL_API]
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { endpoint, options: options = {headers: { 'Content-Type': 'application/json'}} } = callAPI
  const { schema, types } = callAPI

  if(options.hasOwnProperty('body')){
    options.body = JSON.stringify(options.body)
  }
  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }

  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data)
    return finalAction
  }

  const [ requestType, successType, failureType ] = types
  next(actionWith({ type: requestType }))
  return callApi(endpoint, schema, options).then(
    response => next(actionWith({
      response,
      type: successType
    })),
    error => {
      console.log("ERRRRRRRRT")
      return next(actionWith({
          type: failureType,
          error: error
        }))
      }
  )
}
