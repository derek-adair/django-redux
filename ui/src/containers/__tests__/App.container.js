import React from 'react'
import { shallow } from 'enzyme'

import { App } from '../App';

function setup(){
    const props = {
        common: {
            loggedIn: false
        },
        resetErrorMessage: jest.fn(),
        loadProfile: jest.fn(),
        handleLogout: jest.fn()
    }


    const enzymeWrapper = shallow(<App {...props} />)

    return {
      props,
      enzymeWrapper
    }
}

describe("App ", () =>{
  it('renders self and children without crashing', () => {
    let { enzymeWrapper } = setup()
  });
  
})
