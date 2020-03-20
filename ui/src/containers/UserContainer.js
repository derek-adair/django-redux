/* eslint-disable no-undef */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { reduce } from 'lodash'

import { 
  loadUser, loadUserClips, playerAdd, 
  addToLibrary, removeFromLibrary, removeClip
} from '../actions'
import User from '../components/User'
import List from '../components/List'

const loadData = ({ username, loadUser, loadUserClips}) => {
  loadUser(username)
  loadUserClips(username)
}

class UserContainer extends Component {
  static propTypes = {
    username: PropTypes.string.isRequired,
    user: PropTypes.object,
    loadUser: PropTypes.func.isRequired,
    loadUserClips: PropTypes.func.isRequired,
  }

  constructor(props){
    super(props)
    this.renderClip = this.renderClip.bind(this)
    this.handleLoadMoreClick = this.handleLoadMoreClick.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }
  componentDidMount() {
    loadData(this.props)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.username !== this.props.username) {
      loadData(this.props)
    }
  }

  handleDelete(clip){
    if(window.confirm(`Are you sure you want to delete ${clip.name}`)){
      this.props.removeClip(clip)
    }
  }

  handleLoadMoreClick = () => {
    this.props.loadUserClips(this.props.username, true)
  }

  render() {
    const 
        username        = this.props.username,
        userClipsPagination = this.props.userClipsPagination          
    ;

    if (!clips) {
      return <h1><i>Loading clips...</i></h1>
    }

    const sources = Object.values(clips)

    return (
      <div>
        <h1>{username}'s Clips</h1>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const username = ownProps.match.params.username

  const {
    profile,
    common,
    entities: { users, },
    pagination: { clipsByUser }

  } = state

  const userClipsPagination = clipsByUser[username] || { ids: []}
    // filter the array to only include those that start with the username
  let userClips = Object.keys(clips)
                        .filter(clip => userClipsPagination.ids.includes(clip))
                        // reduces the original object key array using object explode syntax
                        .reduce((obj, key)=>{
                          return {
                            // obj is exploded, its the accumulation of the reduce
                            ...obj,
                            // snags the 
                            [key]:clips[key]
                          }
                        }, {})

  let moddedClips;
    if(library !== undefined && profile.username !== null) {
      // Build new clip-list w/ addedToLibrary Boolean
      moddedClips = reduce(userClips, function(result, value, key){
          return { ...result,
            [key]: {
              ...value,
              addedToLibrary: library[profile.username].clips.includes(key)
            }
          }
      },{})
    }
  return {
    username,
    profile,
    common,
    user: users[username],
    clips: moddedClips || userClips,
    userClipsPagination
  }
}

export default withRouter(connect(mapStateToProps, {
  addToLibrary,
  removeFromLibrary,
  loadUser,
  loadUserClips,
  playerAdd,
  removeClip
})(UserContainer))
