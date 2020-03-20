import React from 'react'
import { shallow } from 'enzyme'

import { HomeContainer } from '../HomeContainer';

function setup(){
    const props = {
        clips: {
            "bob/rocks": {
                name: 'rocks',
                user: 'bob',
                sourceFile: 'link/to/source/'
            },
            "billy/music": {
                name: 'music',
                user: 'billy',
                sourceFile: 'link/to/source/'
            }
        },
        loadClips: jest.fn(),
        playerAdd: jest.fn(),
    };

    const enzymeWrapper = shallow(<HomeContainer {...props} />)

    return {
      props,
      enzymeWrapper
    }
}

describe("HomeContainer ", () =>{
  it('renders self and children without crashing', () => {
    let { enzymeWrapper } = setup()

    expect(enzymeWrapper.find('h1').text()).toBe('Welcome to Schmusi.cc')

    expect(enzymeWrapper.find('.clips-table').length).toBe(1)

    expect(enzymeWrapper.find('.clips-table tbody tr').length).toBe(2) 
  });
})
