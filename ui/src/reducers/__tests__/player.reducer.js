import { player } from '../index.js'
import * as ActionTypes from '../../actions'

describe('player reducer', () =>{
    it('should return the initial state', ()=>{
        expect(player(undefined, {})).toEqual({
            source:{},
            isPlaying: false
        })
    })

    it('should handle ADD_TO_PLAYER', ()=>{
        expect(
            player([], {
              type: ActionTypes['ADD_TO_PLAYER'],
              src: {
                name: 'something'
              }
            })
        ).toEqual({
          source: {name:'something'},
        })
    })
})
