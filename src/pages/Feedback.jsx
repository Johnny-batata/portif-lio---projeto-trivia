import React, { Component } from 'react';
import FetchImageGravatar from '../services/fetchImageGravatar';
import Question from '../components/Questions';

class Feedback extends Component {
  constructor() {
    super();
    this.state = {
      url: '',
      score: 0,
      name: '',
      assertions: 0,
    };
    this.updateState = this.updateState.bind(this);
    this.header = this.header.bind(this);
    this.scoreFeedback = this.scoreFeedback.bind(this);
  }

  componentDidMount() {
    const name = JSON.parse(localStorage.getItem('state'));
    // console.log(name);
    this.updateState(name);
  }

  async updateState(name) {
    await FetchImageGravatar(name.player.gravatarEmail)
      .then((data) => this.setState({ url: data }));
    this.setState({ score: name.player.score });
    this.setState({ name: name.player.name });
    this.setState({ assertions: name.player.assertions });
  }

  scoreFeedback() {
    const { assertions } = this.state;
    const THREE = 3;
    if (assertions < THREE) {
      return (
        <p data-testid="feedback-text">
          Podia ser melhor...
        </p>
      );
    }
    return (
      <p data-testid="feedback-text">
        Mandou bem!
      </p>
    );
  }

  header() {
    const { url, score, name } = this.state;
    return (
      <header>
        <img
          src={ url }
          alt="player.jpeg"
          data-testid="header-profile-picture"
        />
        <p
          data-testid="header-player-name"
        >
          {name}

        </p>
        <p
          data-testid="header-score"

        >
          {score}

        </p>
      </header>
    );
  }

  render() {
    return (
      <div>
        { this.header() }
        { this.scoreFeedback() }
      </div>
    );
  }
}

export default Feedback;