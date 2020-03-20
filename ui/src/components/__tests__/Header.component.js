import React from 'react'
import { shallow } from 'enzyme'
import Header from '../Header'

function setup(propConfig){
  // propConfig argument, if exists, overwrites the default constructor props
    const defaultProps = {
      common: {
        loggedIn: false
      },
      profile: {
        username: 'bob'
      },
      handleLogin: jest.fn(),
      handleLogout: jest.fn(),

    }
    
    // explode props
    const props = {...defaultProps, ...propConfig}

    const enzymeWrapper = shallow(<Header {...props} />)

  return {
    props,
    enzymeWrapper
  }
}

describe("Header Compoenent", ()=>{
    it('should render properly', ()=>{
      let { enzymeWrapper } = setup()    

      expect(enzymeWrapper.find('header').is('#header-full-top')).toBe(true) 
      expect(enzymeWrapper.find('#header-profile').length).toBe(0)
      expect(enzymeWrapper.find('.btn-logout').length).toBe(0)
    })

    it('should render user stuff when logged in', ()=>{
      let { enzymeWrapper } = setup({
                                common:{ loggedIn:true }
                            })

      expect(enzymeWrapper.find('#header-profile').length).toBe(1)
      expect(enzymeWrapper.find('.btn-logout').length).toBe(1)
    })

    it('should handle log out', ()=>{
      let 
        {
          enzymeWrapper, 
          props
        } = setup({
          common: {loggedIn: true}
        }),
        logoutBtn = enzymeWrapper.find('a.btn-logout')
      ;

      logoutBtn.props().onClick()

      expect(props.handleLogout.mock.calls.length).toBe(1)
    })
})
