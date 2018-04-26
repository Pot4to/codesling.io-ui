import React, { Component } from 'react';
import io from 'socket.io-client/dist/socket.io.js';

import Sling from './Sling.jsx';

class SlingIndex extends Component {
  state = { 
    socket: null,
   }

  componentWillMount() {
    this.socket = io('http://localhost:4155', {
      query: {
        roomId: this.props.location.pathname.slice(1),
        // (JSON.parse(this.props.location.state.challenge.content) === 1) ? 2 :
        player: JSON.parse(this.props.location.state.challenge).difficulty === 1 ? 2 : 1
      }
    });
    this.setState({ socket: this.socket });
  }

  render() {
    console.log('location state', this.props.location.state)
    if (this.props.location.state) {
      return (
        <Sling socket={this.state.socket} player={this.socket.query.player} challenge={this.props.location.state.challenge}/>
      );
    } else {
      return (
        <Sling socket={this.state.socket} challenge={{}}/>
      );
    }
  }
}

export default SlingIndex;
