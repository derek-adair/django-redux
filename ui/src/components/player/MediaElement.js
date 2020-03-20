import React, { Component } from 'react';
import flvjs from 'flv.js';
import hlsjs from 'hls.js';
import 'mediaelement';
import { isEqual, isNull } from 'lodash';

// Import stylesheet and shims
import 'mediaelement/build/mediaelementplayer.min.css';
import 'mediaelement/build/mediaelement-flash-video.swf';

export default class MediaElement extends Component {

	state = {}

	success(media, node, instance) {
		// Your action when media was successfully loaded
	}

	error(media) {
		// Your action when media had an error loading
	}

	render() {
		const
			props = this.props,
			sourceTags = [],
			tracksTags = []
		;


		const
			mediaBody = `${sourceTags.join("\n")}
				${tracksTags.join("\n")}`,
			mediaHtml = `<audio autoplay id="${props.id}" width="${props.width}" controls> ${mediaBody} </audio>`

		return (<div dangerouslySetInnerHTML={{__html: mediaHtml}}></div>);

	}

  componentDidUpdate(prevProps){
    if(!isNull(this.props.source.mp3File) && !isEqual(prevProps.source, this.props.source)){
      this.state.player.setSrc(this.props.source.mp3File)
    }
  }

  componentDidMount() {

		const {MediaElementPlayer} = global;
		if (!MediaElementPlayer) {
			return;
		}

		const options = Object.assign({}, JSON.parse(this.props.options), {
			// Read the Notes below for more explanation about how to set up the path for shims
			pluginPath: './static/media/',
			success: (media, node, instance) => this.success(media, node, instance),
			error: (media, node) => this.error(media, node)
		});
		window.flvjs = flvjs;
		window.Hls = hlsjs;
		this.setState({player: new MediaElementPlayer(this.props.id, options)});
	}

	componentWillUnmount() {
		if (this.state.player) {
			this.state.player.remove();
			this.setState({player: null});
		}
	}
}
