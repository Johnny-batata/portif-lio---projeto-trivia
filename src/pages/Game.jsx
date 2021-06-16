import React, { Component } from 'react';
import FetchImageGravatar from '../services/fetchImageGravatar';
import Question from '../components/Questions';

export default class Game extends Component {
  constructor() {
    super();
    this.state = {
      url: '',
      score: 0,
      name: '',
    };
    this.updateState = this.updateState.bind(this);
    this.header = this.header.bind(this);
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
        {this.header()}
        <Question />
      </div>
    );
  }
}

// export default game;
