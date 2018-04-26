import React, { Component } from 'react';
import randomstring from 'randomstring';
import axios from 'axios';

import Button from '../globals/Button';
import Logo from '../globals/Logo';

import './LandingPage.css';

let slingId;

class Home extends Component {
  state = {
    allChallenges: [],
    selectedChallenge: {}
  }
  
  async componentDidMount() {
    const { data } = await axios.get(`http://localhost:3396/api/challenges`)
    this.setState({ allChallenges: data }); // expecting this to be object with key being challenge id and value being number of
  }

  handleDuelClick = () => {
    let appThis = this;
    this.props.history.push({
      pathname: `/${JSON.parse(appThis.state.selectedChallenge).id}`,
      state: {
        challenge: this.state.selectedChallenge
      }
    });
  }
  
  handleAddChallengeClick = () => {
    this.props.history.push('/addChallenge');
  }

  handleChallengeSelect = (e) => {
    e.preventDefault();
    const { value } = e.target;
    this.setState({ selectedChallenge: value });
  }

  render() {
    return (
      
      <div className="landing-page-container">
        <Logo
          className="landing-page-logo"
        />
        <br />
        <select onChange={(e) => this.handleChallengeSelect(e)}>
          {this.state.allChallenges.map(challenge => {
            return (
            <option
              value={JSON.stringify(challenge)}
              disabled={challenge.difficulty < 2 ? false : 'disabled'}
            >
              {challenge.title}
              {challenge.difficulty < 2 ? ' (available)' : ' (full)'}
            </option>)
          }
          )}
        </select>
        <br />
        <br />
        <Button
          backgroundColor="red"
          color="white"
          text="Create Challenge"
          onClick={() => this.handleAddChallengeClick()}
        />
        <br />
        <Button
          backgroundColor="red"
          color="white"
          text="Duel"
          onClick={() => this.handleDuelClick()}
        />
      </div>
    );
  }
}

export default Home;