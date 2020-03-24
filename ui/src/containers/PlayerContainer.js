import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import MediaElement from '../components/player/MediaElement'

class PlayerContainer extends Component {

  static propTypes = {
  }

  render() {
		const { config={}, player={source:{}} }= this.props

    return (
      <div id="PlayerContainer">
        <div className="container">
                    <MediaElement
                       id="player1"
                       preload="none"
                       controls
                       width="100%"
                       poster=""
                       options={JSON.stringify(config)}
                       source={player.source}
                    />

        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    profile: state.profile,
    clips: state.entities.clips,
    player: state.player
  }
}

export default withRouter(connect(mapStateToProps, {
})(PlayerContainer))
