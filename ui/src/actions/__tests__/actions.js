import * as actions from '../index'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Actions', ()=>{
  it('should create an action to add to player', () => {
    const source = 'path/to/clip.mp3',
          expectedAction = {
            type: actions.ADD_TO_PLAYER,
            src: source
          }
    const store = mockStore({ player: {source:{}}})
    
    store.dispatch(actions.playerAdd(source))
    expect(store.getActions()[0]).toEqual(expectedAction)
  })
})


